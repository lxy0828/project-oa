<template>
  <div>
    <div>
      <Button  icon="ios-search" type="primary" @click="demand = true">点击查询</Button>
      <Modal title="进阶查询" v-model="demand" @on-ok="sureSle" class-name="vertical-center-modal">
        <!-- <span>选择流程(选填)</span>
        <Cascader v-model='processtotal' :data="casdata" change-on-select  ></Cascader>
        <span>选择日期</span>
        <Col span="24">
          <date-picker v-model="searchdata.startDate" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></date-picker>
          <date-picker v-model="searchdata.endDate" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></date-picker>
        </Col> -->
        <p>输入单号</p>
        <Input v-model='searchdata.flowId'  placeholder="请输入..."></Input>
        <p>输入发起人</p>
        <Input v-model='searchdata.proposer'  placeholder="请输入..."></Input>
        <!-- <Button type="info" @click="queding">查询</Button> -->
      </Modal>
      <!-- <div class="un-input">
        <Button type="text">查询条件</Button>
        <Input  placeholder="请输入..." ></Input>
        <Input   placeholder="请输入..." ></Input>
        <Button type="info" @click="sureSle">查询</Button>
      </div> -->
    </div>
    <list-view v-if="showList" @tableitem="getTable" :data="prodata"></list-view>
  </div>
</template>

<script>
  import ip from '../../common/js/const.js'
  import qs from 'qs'
  import axios from 'axios'
  import listView from '../page/listview/listview.vue'
  import connect from '../../common/js/connect.js'
  import bus from '../store/store.js'
  export default {
    data () {
      return {
        ip: ip,
        processtotal: [],
        casdata: connect,
        showList: false,
        searchdata: {
          flowId: '',
          // processName: '',
          proposer: ''
          // startDate: '',
          // endDate: ''
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
              key: 'flowName',
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
              key: 'taskName'
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
        // 重table列表中点进去，设置标记
        sessionStorage.setItem('rejectL', item.state)
        sessionStorage.setItem('eSend', this.eSend)
        sessionStorage.setItem('processId', item.taskId)
        sessionStorage.setItem('flowId', item.flowId)
        sessionStorage.setItem('processInstanceId', item.processInstanceId)
        // if(item.flowName)
        this.$router.push(item.typeId)
      },
      _getProcess () {
        this.$Loading.start()
        console.log(this.indexState)
        console.log(sessionStorage.getItem('backwait'))
        this.showList = false
        if (sessionStorage.getItem('backwait') === 'backwait') {
          axios.post(this.ip + 'task/pendingTask.do').then((res) => {
            this.prodata.process = res.data.rows
            this.showList = true
            this.$Loading.finish()
          })
          // setTimeout(() => {
          //   axios.get('api/proce').then((res) => {
          //     this.$Loading.finish()
          //     this.$Loading.error()
          //     console.log(res.data.data.alldata)
          //     this.prodata.process = res.data.data.alldata
          //     this.showList = true
          //   })
          // }, 2000)
        } else if (sessionStorage.getItem('backwait') === 'notice') {
          axios.post(this.ip + 'task/unFinishedTask.do').then((res) => {
            console.log(res)
            this.prodata.process = res.data.rows
            this.showList = true
            this.$Loading.finish()
          })
          // setTimeout(() => {
          //   axios.get('api/proce').then((res) => {
          //     console.log(res.data.data.alldata2)
          //     this.prodata.process = res.data.data.alldata2
          //     this.showList = true
          //   })
          // }, 2000)
        } else if (sessionStorage.getItem('backwait') === 'end') {
          axios.post(this.ip + 'task/finishedTask.do').then((res) => {
            console.log(res.data)
            this.prodata.process = res.data.rows
            this.showList = true
            this.$Loading.finish()
          })
          // setTimeout(() => {
          //   axios.get('api/proce').then((res) => {
          //     console.log(res.data.data.alldata1)
          //     this.prodata.process = res.data.data.alldata1
          //     this.showList = true
          //   })
          // }, 2000)
        } else if (sessionStorage.getItem('backwait') === 'over') {
          // alert('查询已终止')
          axios.post(this.ip + 'task/terminatedTask.do').then((res) => {
            console.log(res.data)
            this.prodata.process = res.data.rows
            this.showList = true
            this.$Loading.finish()
          })
          // setTimeout(() => {
          //   axios.get('api/proce').then((res) => {
          //     console.log(res.data.data.alldata1)
          //     this.prodata.process = res.data.data.alldata1
          //     this.showList = true
          //   })
          // }, 2000)
        } else if (sessionStorage.getItem('backwait') === null || sessionStorage.getItem('backwait') === '') {
          axios.post(this.ip + 'task/pendingTask.do').then((res) => {
            this.prodata.process = res.data.rows
            this.showList = true
            this.$Loading.finish()
          })
          // axios.get('api/proce').then((res) => {
          //   console.log(res)
          //   this.prodata.process = res.data.data.alldata
          //   this.showList = true
          // })
        }
      },
      sureSle () {
        // this.searchdata.processName = this.processtotal[1]
        // console.log(this.searchdata)
        this.$Loading.start()
        // let formcontroler = this.searchdata
        let url
        this.showList = false
        if (sessionStorage.getItem('backwait') === 'backwait') {
          url = this.ip + 'task/pendingTask.do'
        } else if (sessionStorage.getItem('backwait') === 'notice') {
          url = this.ip + 'task/unFinishedTask.do'
        } else if (sessionStorage.getItem('backwait') === 'end') {
          url = this.ip + 'task/finishedTask.do'
        } else if (sessionStorage.getItem('backwait') === 'over') {
          url = this.ip + 'task/terminatedTask.do'
        } else {
          url = this.ip + 'task/pendingTask.do'
        }
        console.log(url)
        console.log(qs.stringify(this.searchdata))
        axios.post(url, qs.stringify(this.searchdata)).then((res) => {
          this.prodata.process = res.data.rows
          this.showList = true
          this.$Loading.finish()
        })
        this.demand = false
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
.un-input{
  display: flex;
}
/*.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
}*/
</style>
