<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>联络函</h1>
    <div class="processtietle">
      <div class="hk">单号：<span>{{alldata.flowId}}</span></div>
      <div class="hk">日期：<span>{{alldata.submissionDate}}</span></div>
    </div>
    <div class="main-llh">
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">发起人</Button>
            <Input readonly v-model="alldata.proposerId" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.proposer" placeholder="请输入..."></Input>
            <Button type="info" @click="selectStaff" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人部门</Button>
            <Input readonly v-model="alldata.propDeptId" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.propDeptName" placeholder="请输入..."></Input>
            <Button type="info" @click="selectdepartment" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">发起方审核人</Button>
            <Input readonly v-model="alldata.deptAuditor1Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor1" placeholder="请输入..."></Input>
            <Button type="info" @click="check" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">回应方审核人</Button>
            <Input readonly v-model="alldata.deptAuditor2Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor2" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext" :disabled='isDisabled'>查询</Button>
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
                <li v-for='names in alldata.sendOther' class="in-li">{{names.senderName}}</li>
              </ul>
            </div>
            <Button type="info" @click="copy" :disabled='isDisabled'>查询</Button>
          </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人公司</Button>
            <Input readonly  placeholder="请输入..." v-model="alldata.propCompId"></Input>
            <Input readonly  placeholder="请输入..." v-model="alldata.propCompName"></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
      	<Col span="24">
      	  <Button type="text">事由:</Button>
          <Input type="textarea" :rows="4" placeholder="请输入..." v-model="alldata.reason" :disabled='isDisabled'></Input>
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
  import ip from '../../../common/js/const.js'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import Department from '../../page/infor/department.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  // import bus from '../../store/store.js'
  export default {
    data () {
      return {
        ip: ip,
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
          flowId: '',
          proposerId: '',
          proposer: '',
          propDeptId: '',
          propDeptName: '',
          deptAuditor1Id: '',
          deptAuditor1: '',
          deptAuditor2Id: '',
          deptAuditor2: '',
          sendOther: [],
          propCompId: '',
          propCompName: '',
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
        this.alldata.flowId = getRandomNum('LLH')
        this.alldata.submissionDate = myDate.toLocaleDateString()
      },
      getTable (item) {
        console.log(item)
        this.apadata = item
        if (this.flagNum === 1) {
          this.alldata.proposerId = item.eid
          this.alldata.proposer = item.ename
          this.alldata.propDeptId = item.did
          this.alldata.propDeptName = item.dname
          this.alldata.propCompId = item.cid
          this.alldata.propCompName = item.cname
        } else if (this.flagNum === 2) {
          this.alldata.deptAuditor1Id = item.eid
          this.alldata.deptAuditor1 = item.ename
        } else if (this.flagNum === 3) {
          this.alldata.deptAuditor2Id = item.eid
          this.alldata.deptAuditor2 = item.ename
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
        ite.senderId = this.copyid
        ite.senderName = this.copyname
        this.alldata.sendOther.push(ite)
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
          axios.post(this.ip + 'contact/addTContact.do ', qs.parse(formcontroler)).then((res) => {
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
          axios.post(this.ip + 'contact/findTContactInfo.do', qs.stringify(flownum)).then((res) => {
            console.log(res)
            this.alldata = res.data.tContacts
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
  overflow:auto;
}
.in-li{
  margin-right:5px;
}
</style>
