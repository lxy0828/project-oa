<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>报告审批单</h1>
    <div class="processtietle">
       <div class="hk">单号：<span>{{alldata.flowId}}</span></div>
       <div class="hk">日期：<span>{{alldata.submissionDate}}</span></div>
    </div>
    <div class="main-bgspd">
      <Row class="row-line">
        <Col span='10'>
          <div class="un-input">
            <Button type="text">发起人</Button>
            <Input readonly v-model="alldata.proposerid" placeholder="请输入..." ></Input>
            <Input readonly v-model="alldata.proposer" placeholder="请输入..." ></Input>
            <Button type="info" @click="selectStaff" :disabled='isDisabled' >查询</Button>
          </div>
        </Col>
         <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人部门</Button>
            <Input readonly v-model="alldata.propdeptid" placeholder="请输入..." ></Input>
            <Input readonly v-model="alldata.propdeptname" placeholder="请输入..." ></Input>
            <Button type="info" @click="selectdepartment" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">部门审核</Button>
            <Input readonly v-model="alldata.deptauditor1id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptauditor1" placeholder="请输入..."></Input>
            <Button type="info" @click="check" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">部门审核</Button>
            <Input readonly v-model="alldata.deptauditor2id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptauditor2" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class='row-line'>
        <Col span="10">
          <div class="un-input">
            <Button type="text">报告所属公司</Button>
            <Input readonly v-model="alldata.reportofcompanyid"  placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.reportofcompanyname"  placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">部门负责人</Button>
            <Input readonly v-model="alldata.depprincipalid"  placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.depprincipalname"  placeholder="请输入..."></Input>
  	      </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <Button type="text">是否为总部报告</Button>
          <RadioGroup v-model="alldata.sendheadquarters">
            <Radio label="是" :disabled='isDisabled'></Radio>
            <Radio label="否" :disabled='isDisabled'></Radio>
          </RadioGroup>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">主送:</Button>
            <div class="copy">
              <ul>
                <li v-for='names in alldata.sendother' class="in-li">{{names.sendername}}</li>
              </ul>
            </div>
            <Button type="info" @click="copy">查询</Button>
          </div>
        </Col>
      </Row>
      <Row class='row-line'>
        <Col span="20">
          <div class="un-input">
            <Button type="text">标题：</Button>
            <Input v-model='alldata.title' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">报告内容：</Button>
            <Input type="textarea" v-model='alldata.content' placeholder="请输入..." :rows="6" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
       <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
    </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  export default {
    data () {
      return {
        sDisabled: '',
        showSend: true,
        processNumber: '',
        selectIndex: '',
        // processDate: '',
        modal: false,
        flag: false,
        flagNum: 0,
        sendState: {
          sponsor: '',
          initiate: ''
        },
        copyid: '',
        copyname: '',
        alldata: {
          flowId: '',
          submissionDate: '',
          proposer: '',
          proposerid: '',
          propdeptid: '',
          propdeptname: '',
          deptauditor1id: '',
          deptauditor1: '',
          deptauditor2id: '',
          deptauditor2: '',
          reportofcompanyid: '',
          reportofcompanyname: '',
          sendheadquarters: '是',
          depprincipalid: '',
          depprincipalname: '',
          sendother: [],
          content: '',
          title: ''
        }
      }
    },

    created () {
      console.log(sessionStorage.getItem('processId'))
      this.sendState.sponsor = sessionStorage.getItem('eSend')
      this.sendState.initiate = sessionStorage.getItem('aSend')
      this.control()
    },
    methods: {
      getDate () {
        var myDate = new Date()
        this.alldata.flowId = getRandomNum('BGSPD')
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
          this.alldata.deptHeadId = item.deptHeadId
          this.alldata.deptHead = item.deptHead
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
          axios.post('http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrders/startApply.do', qs.parse(formcontroler)).then((res) => {
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
          axios.post('http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrders/restartApply.do', qs.stringify(formcontroler)).then((res) => {
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
          axios.post('http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrders/getPurchaseByTaskId.do', qs.stringify(flownum)).then((res) => {
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
    components: {
      Staff,
      Originate
    }
  }
</script>

<style>
.main-bgspd{
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
