<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>联络函</h1>
    <div class="processtietle">
      <div class="hk">单号：<span>{{alldata.flowid}}</span></div>
      <div class="hk">日期：<span>{{alldata.submissionDate}}</span></div>
    </div>
    <div class="main-llh">
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">发起人</Button>
            <Input readonly v-model="alldata.proposerid" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.proposer" placeholder="请输入..."></Input>
            <Button type="info" @click="selectStaff">查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人部门</Button>
            <Input readonly v-model="alldata.propdeptid" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.propdeptname" placeholder="请输入..."></Input>
            <Button type="info" @click="selectdepartment">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">发起方审核人</Button>
            <Input readonly v-model="alldata.deptauditor1id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptauditor1" placeholder="请输入..."></Input>
            <Button type="info" @click="check">查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">回应方审核人</Button>
            <Input readonly v-model="alldata.deptauditor2id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptauditor2" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">抄送：</Button>
<!--             <Input readonly v-model="alldata.sendother" placeholder="请输入..."></Input>
<Input readonly v-model="alldata.sendothername" placeholder="请输入..."></Input> -->
            <div class="copy">
              <ul>
                <li v-for='names in alldata.sendother' class="in-li">{{names.sendername}}</li>
              </ul>
            </div>
            <Button type="info" @click="copy">查询</Button>
          </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人公司</Button>
            <Input readonly  placeholder="请输入..." v-model="alldata.propcompid"></Input>
            <Input readonly  placeholder="请输入..." v-model="alldata.propcompname"></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
      	<Col span="24">
      	  <Button type="text">事由:</Button>
          <Input type="textarea" :rows="4" placeholder="请输入..." v-model="alldata.reason"></Input>
  	    </Col>
      </Row>
      <!-- 需要使用v-if，在条件切换的时候合适的销毁与重建 -->
      <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
      <department @deptStatus="getDept" @deptitem="deptSt" :data="bmmodal" v-if="bmflag"></department>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import Department from '../../page/infor/department.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  // import bus from '../../store/store.js'
  export default {
    data () {
      return {
        isDisabled: '',
        showSend: true,
        processNumber: '',
        selectIndex: '',
        // processDate: '',
        modal: false,
        flag: false,
        flagNum: 0,
        showcopy: [],
        sendState: {
          sponsor: '',
          initiate: ''
        },
        sendothershow: '',
        copyid: '',
        copyname: '',
        alldata: {
          flowid: '',
          proposerid: '',
          proposer: '',
          propdeptid: '',
          propdeptname: '',
          deptauditor1id: '',
          deptauditor1: '',
          deptauditor2id: '',
          deptauditor2: '',
          sendother: [],
          propcompid: '',
          propcompname: '',
          reason: '',
          submissionDate: ''
        }
      }
    },
    // beforeDestory () {
    //   bus.$off('eventSend')
    // },
    created () {
      console.log(sessionStorage.getItem('processId'))
      this.sendState.sponsor = sessionStorage.getItem('eSend')
      this.sendState.initiate = sessionStorage.getItem('aSend')
      this.control()
    },
    methods: {
      getDate () {
        var myDate = new Date()
        this.alldata.flowid = getRandomNum('LLH')
        this.alldata.submissionDate = myDate.toLocaleDateString()
      },
      getTable (item) {
        console.log(item)
        this.apadata = item
        if (this.flagNum === 1) {
          this.alldata.proposerid = item.eid
          this.alldata.proposer = item.ename
          this.alldata.propdeptid = item.did
          this.alldata.propdeptname = item.dname
          this.alldata.propcompid = item.cid
          this.alldata.propcompname = item.cname
        } else if (this.flagNum === 2) {
          this.alldata.deptauditor1id = item.eid
          this.alldata.deptauditor1 = item.ename
        } else if (this.flagNum === 3) {
          this.alldata.deptauditor2id = item.eid
          this.alldata.deptauditor2 = item.ename
        } else if (this.flagNum === 4) {
          this.copyid = item.eid
          this.copyname = item.ename
          this.add()
        }
      },
      getSt (item) {
        this.flag = item.staffFlag
        this.modal = item.staffmodal
      },
      selectStaff () {
        this.flagNum = 1
        this.flag = true
        this.modal = true
      },
      check () {
        this.flagNum = 2
        this.flag = true
        this.modal = true
      },
      checknext () {
        this.flagNum = 3
        this.flag = true
        this.modal = true
      },
      copy () {
        this.flagNum = 4
        this.flag = true
        this.modal = true
      },
      add () {
        let ite = {}
        ite.senderid = this.copyid
        ite.sendername = this.copyname
        this.alldata.sendother.push(ite)
      },
      selectdepartment () {
        alert('部门为自动获取')
      },
      getSend (item) {
        console.log(item)
        if (item) {
          this.$Loading.start()
          let formcontroler = {}
          formcontroler = this.alldata
          console.log(qs.stringify(formcontroler))
          console.log(qs.parse(formcontroler))
          axios.post('http://172.30.41.170:8080/ZHYOASystem/contact/addTContact.do ', qs.parse(formcontroler)).then((res) => {
            console.log(res)
            if (res.data.success) {
              this.$router.push('/index')
              this.$Loading.finish()
            } else {
              alert('发送失败')
            }
          })
        }
      },
      backSend (item) {
      // 如果是点击被驳回的单子，从子组件获取信息，重新调用发起接口
        if (item) {
          this.$Loading.start()
          let formcontroler = this.alldata
          // console.log(qs.stringify(formcontroler))
          axios.post('http://172.30.41.170:8080/ZHYOASystem/purchaseOrders/restartApply.do', qs.stringify(formcontroler)).then((res) => {
            console.log(res)
            if (res.data.success) {
              this.$router.push('/index')
              this.$Loading.finish()
            } else {
              alert('发送失败')
            }
          })
        }
      },
      control () {
        if (this.sendState.sponsor) {
        // 每个表单都要做是否是驳回的判断
          if (sessionStorage.getItem('rejectL') === '审核被驳回') {
            this.isDisabled = false
          } else {
            this.isDisabled = true
          }
          this.$Loading.start()
          let flownum = {
            fId: sessionStorage.getItem('processId'),
            flowId: sessionStorage.getItem('flowId')
          }
          axios.post('http://172.30.41.170:8080/ZHYOASystem/purchaseOrders/getPurchaseByTaskId.do', qs.stringify(flownum)).then((res) => {
            console.log(res)
            this.alldata = res.data.purchaseOrders
            this.alldata.orderslist = res.data.list
            this.$Loading.finish()
          })
        }
        if (this.sendState.initiate) {
          this.getDate()
          this.isDisabled = false
        }
      }
    },
    watch: {
      isShowSend () {
        console.log(this.isShowSend)
      }
    },
    components: {
      Staff,
      Department,
      Originate
    }
  }
</script>

<style langed>
.main-llh{
	width: 80%;
	margin-left: 10%;
	margin-top: 30px;
}
h1{
	text-align: center;
}
.row-line{
	margin-bottom: 15px;
}
.un-input{
	display: flex;
}
.processtietle{
  float: right;
  margin-right: 10%;
}
.hk{
  display: inline-block;
}
.copy{
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
}
.in-li{
  margin-right:5px;
  overflow:auto;
}
</style>
