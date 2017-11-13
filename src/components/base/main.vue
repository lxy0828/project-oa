<template>
  <div>
    <div>
      <Button type="primary" @click="demand = true">点击查询</Button>
      <Modal
        title="进阶查询"
        v-model="demand"
        class-name="vertical-center-modal">
        <span>选择流程(选填)</span>
        <Cascader :data="casdata" change-on-select  ></Cascader>
        <span>选择日期</span>
        <Col span="24">
          <DatePicker type="daterange" confirm placement="bottom-end" placeholder="选择日期" style="width: 100%"></DatePicker>
        </Col>
        <p>输入单号</p>
        <Input  placeholder="请输入..."></Input>
        <p>输入发起人</p>
        <Input  placeholder="请输入..."></Input>
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
  export default {
    data () {
      return {
        casdata: connect,
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
              key: 'lcname',
              sortable: true
            },
            {
              title: '流程单号',
              key: 'lcseat'
            },
            {
              title: '发起者',
              key: 'name'
            },
            {
              title: '日期',
              key: 'time',
              sortable: true
            },
            {
              title: '执行中的活动',
              key: 'active'
            }
          ]
        },
        demand: false,
        indexState: ''
      }
    },
    beforeDestory () {
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
        sessionStorage.setItem('eSend', 'false')
        this.$router.push('llh')
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
            this.prodata.process = res.data.data.alldata
          })
        }
      },
      remove (index) {
        console.log(index)
        this.prodata.process.splice(index, 1)
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
