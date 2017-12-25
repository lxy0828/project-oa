<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>派车申请单</h1>
    <div class="processtietle">
       <div class="hk">单号：<span>{{alldata.flowId}}</span></div>
       <div class="hk">日期：<span>{{alldata.submissionDate}}</span></div>
    </div>
    <div class="main-bgspd">
      <Row class="row-line">
        <Col span='10'>
          <div class="un-input">
            <Button type="text">发起人</Button>
            <Input readonly v-model="alldata.proposerId" placeholder="请输入..." ></Input>
            <Input readonly v-model="alldata.proposer" placeholder="请输入..." ></Input>
            <Button type="info" @click="selectStaff" :disabled='isDisabled' >查询</Button>
          </div>
        </Col>
         <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人部门</Button>
            <Input readonly v-model="alldata.propDeptId" placeholder="请输入..." ></Input>
            <Input readonly v-model="alldata.propDeptName" placeholder="请输入..." ></Input>
            <Button type="info" @click="selectdepartment" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">一级审核</Button>
            <Input readonly v-model="alldata.deptAuditor1Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor1" placeholder="请输入..."></Input>
            <Button type="info" @click="check" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">二级审核</Button>
            <Input readonly v-model="alldata.deptAuditor2Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor2" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class='row-line'>
        <Col span="10">
          <div class="un-input">
            <Button type="text">报告所属公司</Button>
            <Input readonly v-model="alldata.reportOfCompanyId"  placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.reportOfCompanyName"   placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">部门负责人</Button>
            <Input readonly v-model="alldata.depPrincipalId"  placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.depPrincipalName"  placeholder="请输入..."></Input>
  	      </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <Button type="text">派车类型</Button>
          <RadioGroup v-model="alldata.carType">
            <Radio label="火车托运" :disabled='isDisabled'></Radio>
            <Radio label="商务接待" :disabled='isDisabled'></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
          <Button type="text">出厂日期日期</Button>
          <DatePicker type="date" v-model='alldata.dateOfProduction' placeholder="Select date" style="width: 200px"></DatePicker>
          </div>
  	    </Col>
  	    <Col span="10" offset="4">

          <div class="un-input">
  	      <Button type="text">返厂日期日期</Button>
          <DatePicker type="date" v-model='alldata.dateOfReturn' placeholder="Select date" style="width: 200px"></DatePicker>
          </div>
  	    </Col>
      </Row>

      <Row class='row-line'>
        <Col span="20">
          <div class="un-input">
            <Button type="text">目的地：</Button>
            <Input v-model='alldata.destination' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">申请事由：</Button>
            <Input type="textarea" v-model='alldata.ApplyForReason' placeholder="请输入..." :rows="6" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <Col span='10'>
          <div class="un-input">
            <Button type="text">车号：</Button>
            <Input v-model='alldata.CarNumber' placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">负责司机</Button>
            <Input v-model='alldata.driver' placeholder="请输入..."></Input>
  	      </div>
        </Col>
      </Row>
       <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  import ip from '../../../common/js/const.js'
  export default {
    data () {
      return {
        ip: ip,
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
        alldata: {
          flowId: '',
          submissionDate: '',
          proposer: '',
          proposerId: '',
          propDeptId: '',
          propDeptName: '',
          deptAuditor1Id: '',
          deptAuditor1: '',
          deptAuditor2Id: '',
          deptAuditor2: '',
          depPrincipalId: '',
          depPrincipalName: '',
          reportOfCompanyId: '',
          reportOfCompanyName: '',
          carType: '货车托运',
          dateOfProduction: '',
          dateOfReturn: '',
          destination: '',
          ApplyForReason: '',
          CarNumber: '',
          driver: ''
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
        this.alldata.flowId = getRandomNum('PCSQD')
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
          this.alldata.depPrincipalId = item.deptHeadId
          this.alldata.depPrincipalName = item.deptHead
          this.alldata.reportOfCompanyId = item.cid
          this.alldata.reportOfCompanyName = item.cname
        } else if (this.flagNum === 2) {
          this.alldata.deptAuditor1Id = item.eid
          this.alldata.deptAuditor1 = item.ename
        } else if (this.flagNum === 3) {
          this.alldata.deptAuditor2Id = item.eid
          this.alldata.deptAuditor2 = item.ename
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
          axios.post(this.ip + 'TDispatchCarController/addTDispatchCar.do ', qs.parse(formcontroler)).then((res) => {
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
          axios.post(this.ip + 'TDispatchCarController/selectTDispatchCarInfo.do', qs.stringify(formcontroler)).then((res) => {
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
</style>
