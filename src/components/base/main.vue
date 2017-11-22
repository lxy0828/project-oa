<template>
  <div>
    <div>
      <Button type="primary" @click="demand = true">点击查询</Button>
      <Modal
        title="进阶查询"
        v-model="demand"
        @on-ok="queding"
        class-name="vertical-center-modal">
        <span>选择流程(选填)</span>
        <Cascader v-model='processtotal' :data="casdata" change-on-select  ></Cascader>
        <span>选择日期</span>
        <Col span="24">
          <date-picker v-model="searchdata.startDate" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></date-picker>
          <date-picker v-model="searchdata.endDate" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></date-picker>
        </Col>
        <p>输入单号</p>
        <Input v-model='searchdata.flowId'  placeholder="请输入..."></Input>
        <p>输入发起人</p>
        <Input v-model='searchdata.proposer'  placeholder="请输入..."></Input>
      </Modal>
    </div>
    <list-view @tableitem="getTable" :data="prodata"></list-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import listView from '../page/listview/listview.vue'
  import connect from '../../common/js/connect.js'
  import bus from '../store/store.js'
  import qs from 'qs'
  export default {
    data () {
      return {
        processtotal: [],
        casdata: connect,
        searchdata: {
          flowId: '',
          processName: '',
          proposer: '',
          startDate: '',
          endDate: ''
        },
        prodata: {
          process: [],
          pagesize: 4,
          column: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '流程状态',
              key: 'state'
            },
            {
              title: '流程名称',
              key: 'processName',
              sortable: true
            },
            {
              title: '流程单号',
              key: 'flowId'
            },
            // {
            //   title: '流程版本号',
            //   key: 'fId'
            // },
            {
              title: '发起者',
              key: 'proposer'
            },
            {
              title: '日期',
              key: 'submissionDate',
              sortable: true
            },
            {
              title: '执行中的活动',
              key: 'taskNode'
            }
          ]
        },
        demand: false,
        indexState: '',
        eSend: true
      }
    },
    destoryed () {
      bus.$off('eventBusName')
    },
    created () {
      bus.$on('eventBusName', (item) => {
        this.indexState = item
      })
      this._getProcess()
    },
    methods: {
      // 获取点击table的内容
      getTable (item) {
        sessionStorage.setItem('eSend', this.eSend)
        sessionStorage.setItem('processId', item.flowId)
        console.log(item.flowId)
        this.$router.push('cgd')
      },
      _getProcess () {
        if (this.indexState === 'backlog') {
          alert('点击了待办')
        } else if (this.indexState === 'notice') {
          alert('点击了通知')
        } else if (this.indexState === 'end') {
          alert('点击了追踪')
        } else if (this.indexState === '') {
          console.log(4)
          axios.get('api/proce').then((res) => {
          // axios.get('http://172.30.9.66:8080/ZHYOASystem_test/purchaseOrdersTask/list.do').then((res) => {
          // console.log(res)
            this.prodata.process = res.data.data.alldata
            console.log(res.data.data.alldata)
            // this.prodata.process = JSON.stringfy(res).rows
          })
        }
      },
      queding () {
        this.searchdata.processName = this.processtotal[1]
        // console.log(this.searchdata)
        let formcontroler = this.searchdata
        axios.post('http://172.30.9.66:8080/ZHYOASystem_test/purchaseOrdersTask/list.do', qs.stringfy(formcontroler)).then((res) => {
          if (res.success) {
            window.location.reload()
          } else {
            alert('查询失败')
          }
        })
      }
    },
    watch: {
      indexState () {
        this._getProcess()
        this.indexState = 1
      }
    },
    components: {
      listView
    }
  }
</script>

<style>
/*.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
}*/
</style>
