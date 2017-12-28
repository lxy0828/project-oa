<template>
  <div>
    <div v-show="data.initiate">
      <Button type="info" class="faqi" @click='sendProcess'>发起流程</Button>
    </div>
    <div v-show="data.sponsor">
      <!-- <Button v-show="wait" type="info" class="faqi" @click='sendProcess'>发起流程</Button> -->
      <Button v-show="wait" type="success" @click="comment = true">继续派送</Button>
      <Button v-show="wait1" type="warning"  @click="back = true">退回</Button>
      <Button v-show="wait2" type="error"  @click="commen = true">终止</Button>
    </div>
    <div v-show="data.sponsor" style="margin-top: 5px">
      <Button type="info" size="small" @click="getcourse">审批历程</Button>
      <Modal
          title="审批版本"
          v-model="spbb"
          class-name="vertical-center-modal">
          <Table stripe :columns="columns1" :data="spData"></Table>
      </Modal>
    </div>
    <!-- <processSP v-show="data.sponsor" class="sp"></processSP> -->
   <Modal
        title="审批意见"
        v-model="comment"
        @on-ok="sucessprocess"
        class-name="vertical-center-modal">
        <Input type="textarea" v-model='content' :rows="4"></Input>
    </Modal>
    <Modal
        title="审批意见"
        v-model="commen"
        @on-ok="faileprocess"
        class-name="vertical-center-modal">
        <Input type="textarea" v-model='failcontent' :rows="4"></Input>
    </Modal>
    <Modal
        title="退回到发起人关卡"
        v-model="back"
        @on-ok="backprocess"
        class-name="vertical-center-modal">
        <!-- <i-table  highlight-row ref="currentRowTable" border :columns="columns2" :data="data2" on-row-click></i-table> -->
        <Input type="textarea" v-model='yaoqiu' :rows="4" class="textera"></Input>
    </Modal>
  </div>
</template>
<script>
  // import processSP from '../infor/processSP.vue'
  import ip from '../../../common/js/const.js'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    props: {
      data: {}
    },
    data () {
      return {
        ip: ip,
        alldata: this.data,
        showBtn: {
          type: Boolean,
          default: false
        },
        comment: false,
        commen: false,
        back: false,
        send: true,
        wait: false,
        wait1: false,
        wait2: false,
        // wait3: false,
        yaoqiu: '退回修改',
        columns2: [
          {
            type: 'index',
            align: 'center'
          },
          {
            title: '关卡名称',
            key: 'gqmc'
          },
          {
            title: '具体人员',
            key: 'name'
          }
        ],
        data2: [],
        content: '同意',
        failcontent: '不同意',
        spbb: false,
        columns1: [
          {
            title: '审批人',
            key: 'userId'
          },
          {
            title: '审批意见',
            key: 'message'
          },
          {
            title: '审批时间',
            key: 'time'
          }
        ],
        spData: [],
        test: true
      }
    },
    created () {
      this.showBtn = this.data
      if (this.showBtn.sponsor === 'true') {
        sessionStorage.removeItem('eSend')
      } else if (this.showBtn.initiate === 'true') {
        sessionStorage.removeItem('aSend')
      }
      if (sessionStorage.getItem('backwait') === 'notice') {
        this.wait = false
        this.wait1 = false
        this.wait2 = false
      } else if (sessionStorage.getItem('backwait') === 'end') {
        this.wait = false
        this.wait1 = false
        this.wait2 = false
      } else if (sessionStorage.getItem('backwait') === 'over') {
        this.wait = false
        this.wait1 = false
        this.wait2 = false
      } else {
        this.wait = true
        this.wait1 = true
        this.wait2 = true
      }
      // console.log(sessionStorage.getItem('wait'))
      // if (sessionStorage.getItem('wait') === 'false') {
      //   this.wait = false
      // } else {
      //   this.wait = true
      // }
      // console.log(this.wait)
    },
    methods: {
      sendProcess () {
        this.$emit('getSend', this.send)
      },
      sucessprocess () {
        this.$Loading.start()
        let rsmsg = {
          taskId: sessionStorage.getItem('processId'),
          flowId: sessionStorage.getItem('flowId'),
          state: 1,
          comment: this.content
        }
        if (sessionStorage.getItem('rejectL') === '审核被驳回') {
          this.wait1 = true
          this.$emit('backSend', this.test)
          // alert('进入审核被驳回接口')
          // this.data.initiate = true
          // this.$emit('getSend', this.send)
        } else {
          console.log(123)
          // axios.post('http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrdersTask/audit_bz.do', qs.stringify(rsmsg)).then((res) => {
          //   console.log(res)
          //   if (res.data.success) {
          //     this.$router.push('/index')
          //     this.$Loading.finish()
          //   } else {
          //     alert('审批失败')
          //   }
          // })
        }
        axios.post(this.ip + 'task/processApproval.do', qs.stringify(rsmsg)).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$router.push('/index')
            this.$Loading.finish()
          } else {
            alert('审批失败')
          }
        })
      },
      backprocess () {
        this.$Loading.start()
        let rsmsg = {
          taskId: sessionStorage.getItem('processId'),
          flowId: sessionStorage.getItem('flowId'),
          state: 2,
          comment: this.yaoqiu
        }
        axios.post(this.ip + 'task/processApproval.do', qs.stringify(rsmsg)).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$router.push('/index')
            this.$Loading.finish()
          } else {
            alert('审批失败')
          }
        })
      },
      faileprocess () {
        this.$Loading.start()
        let rsmsg = {
          taskId: sessionStorage.getItem('processId'),
          flowId: sessionStorage.getItem('flowId'),
          state: 3,
          comment: this.failcontent
        }
        axios.post(this.ip + 'task/processApproval.do', qs.stringify(rsmsg)).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$router.push('/index')
            this.$Loading.finish()
          } else {
            alert('审批失败')
          }
        })
      },
      getcourse () {
        this.$Loading.start()
        let resmsg = {
          taskId: sessionStorage.getItem('processId'),
          processInstanceId: sessionStorage.getItem('processInstanceId')
        }
        axios.post(this.ip + 'task/listHistoryComment.do', qs.stringify(resmsg)).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.spData = res.data.rows
            this.spbb = true
            // this.$router.push('/index')
            this.$Loading.finish()
          } else {
            alert('查询失败')
          }
        }).catch(function (error) {
          alert(error)
        })
      }
    }
  }
</script>
<style>
.faqi{
  margin-bottom: 10px;
}
.textera{
  margin-top: 10px
}
.sp{
  margin-top: 10px
}
</style>