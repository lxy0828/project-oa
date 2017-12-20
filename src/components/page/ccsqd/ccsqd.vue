<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>出差申请单</h1>
      <div class="processtietle">
       <div class="hk">单号：<span>{{alldata.flowId}}</span></div>
       <div class="hk">日期：<span>{{alldata.submissionDate}}</span></div>
      </div>
      <div class="main-ccsqd">
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
            <Button type="text">一级审核人</Button>
            <Input readonly v-model="alldata.deptAuditor1Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor1" placeholder="请输入..."></Input>
            <Button type="info" @click="check" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">二级审核人</Button>
            <Input readonly v-model="alldata.deptAuditor2Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor2" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">三级审核人</Button>
            <Input readonly v-model="alldata.deptAuditor3Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor3" placeholder="请输入..."></Input>
            <Button type="info" @click="copy" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">职位</Button>
            <Input readonly v-model="alldata.EPOSITIONID" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">部门负责人</Button>
            <Input readonly v-model="alldata.deptHeadId" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptHead" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人公司</Button>
            <Input readonly v-model="alldata.propCompId" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.propCompName" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
          <Button type="text">起始日期</Button>
          <DatePicker type="date" placeholder="Select date" v-model="alldata.startDate" style="width: 200px"></DatePicker>
          </div>
  	    </Col>
  	    <Col span="8">
          <div class="un-input">
  	      <Button type="text">截止日期</Button>
          <DatePicker type="date" placeholder="Select date" v-model="alldata.endDate" style="width: 200px"></DatePicker>
          </div>
  	    </Col>
  	    <Col span="8">
  	    <div class="un-input">
  	      <Button type="text">合计天数：</Button>
  	      <Input v-model="alldata.totalDays" placeholder="请输入..."></Input>
  	    </div>
  	    </Col>
      </Row>
      <Row class='row-line'>
        <Col span="20">
          <div class="un-input">
            <Button type="text">出差省市地区：</Button>
            <Input v-model='alldata.travelAddress' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type='text'>启程交通工具</Button>
            <Select v-model="alldata.startVehicle" style="width:200px">
              <Option v-for="item in  trafficList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="14" >
          <div class="un-input">
            <Button type="text">其他或航班备注信息</Button>
            <Input  v-model="alldata.startRemarks" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type='text'>返程交通工具</Button>
            <Select v-model="alldata.endVehicle" style="width:200px">
              <Option v-for="item in  trafficList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="14" >
          <div class="un-input">
            <Button type="text">其他或航班备注信息</Button>
            <Input  v-model="alldata.endRemarks" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">出差事由：</Button>
            <Input type="textarea" v-model='alldata.travelReason' placeholder="请输入..." :rows="4" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
      </div>
  </div>
</template>

<script>
  import ip from '../../../common/js/const.js'
  import axios from 'axios'
  import qs from 'qs'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  export default {
    data () {
      return {
        ip: ip,
        isDisabled: '',
        showSend: true,
        modal: false,
        flag: false,
        flagNum: 0,
        sendState: {
          sponsor: '',
          initiate: ''
        },
        trafficList: [
          {
            value: '火车',
            label: '火车'
          },
          {
            value: '动车',
            label: '动车'
          },
          {
            value: '飞机',
            label: '飞机'
          },
          {
            value: '高铁',
            label: '高铁'
          },
          {
            value: '其他',
            label: '其他'
          }
        ],
        alldata: {
          processName: '出差申请单',
          proposerId: '',
          proposer: '',
          propDeptId: '',
          propDeptName: '',
          deptAuditor1Id: '',
          deptAuditor1: '',
          deptAuditor2Id: '',
          deptAuditor2: '',
          deptAuditor3Id: '',
          deptAuditor3: '',
          deptHeadId: '',
          deptHead: '',
          propCompId: '',
          submissionDate: '',
          propCompName: '',
          startDate: '',
          endDate: '',
          totalDays: '',
          travelAddress: '',
          startVehicle: '',
          startRemarks: '',
          endVehicle: '',
          endRemarks: '',
          travelReason: '',
          EPOSITIONID: ''
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
        this.alldata.flowId = getRandomNum('CCSQD')
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
          this.alldata.EPOSITIONID = item.pname
        } else if (this.flagNum === 2) {
          this.alldata.deptAuditor1Id = item.eid
          this.alldata.deptAuditor1 = item.ename
        } else if (this.flagNum === 3) {
          this.alldata.deptAuditor2Id = item.eid
          this.alldata.deptAuditor2 = item.ename
        } else if (this.flagNum === 4) {
          this.alldata.deptAuditor3Id = item.eid
          this.alldata.deptAuditor3 = item.ename
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
      selectdepartment () {
        alert('部门为自动获取')
      },
      getSend (item) {
        console.log(item)
        if (item) {
          this.$Loading.start()
          let formcontroler = {}
          console.log(new Date())
          this.alldata.startDate = this.alldata.startDate.getFullYear() + '-' + this.alldata.startDate.getMonth() + '-' + this.alldata.startDate.getDate()
          this.alldata.endDate = this.alldata.endDate.getFullYear() + '-' + this.alldata.endDate.getMonth() + '-' + this.alldata.endDate.getDate()
          formcontroler = this.alldata
          console.log(qs.stringify(formcontroler))
          console.log(qs.parse(formcontroler))
          axios.post(this.ip + 'travelApply/startApply.do', qs.parse(formcontroler)).then((res) => {
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
        // if (item) {
        //   this.$Loading.start()
        //   let formcontroler = this.alldata
        //   // console.log(qs.stringify(formcontroler))
        //   axios.post('http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrders/restartApply.do', qs.stringify(formcontroler)).then((res) => {
        //     console.log(res)
        //     if (res.data.success) {
        //       this.$router.push('/index')
        //       this.$Loading.finish()
        //     } else {
        //       alert('发送失败')
        //     }
        //   })
        // }
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
            taskId: sessionStorage.getItem('processId'),
            flowId: sessionStorage.getItem('flowId')
          }
          axios.post(this.ip + 'travelApply/getPurchaseByTaskId.do', qs.parse(flownum)).then((res) => {
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
.main-ccsqd{
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
