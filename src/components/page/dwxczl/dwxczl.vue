<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>对外宣传资料审核表</h1>
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
          <div class="un-input">
            <Button type="text">加签人:</Button>
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
        <Col span="10">
          <div class="un-input">
            <Button type="text">公共事务中心审核：</Button>
            <Input readonly v-model='alldata.gxswId' placeholder="请输入..." :disabled='isDisabled'></Input>
            <Input readonly v-model='alldata.gxsw' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">总裁办审核：</Button>
            <Input readonly v-model='alldata.zcbId' placeholder="请输入..." :disabled='isDisabled'></Input>
            <Input readonly v-model='alldata.zcb' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class='un-input'>
            <Button type="text">发布时间：</Button>
            <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class='un-input'>
            <Button type="text">使用周期：</Button>
            <Input v-model='alldata.zcb' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <col span="20">
          <div class="un-input">
            <Button type="text">主题：</Button>
            <Input  v-model='alldata.content' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">用途：</Button>
            <Input type="textarea" v-model='alldata.content' placeholder="请输入..." :rows="3" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">使用范围：</Button>
            <Input type="textarea" v-model='alldata.content' placeholder="请输入..." :rows="4" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">备注：</Button>
            <Input type="textarea" v-model='alldata.content' placeholder="请输入..." :rows="3" :disabled='isDisabled'></Input>
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
  import ip from '../../../common/js/const.js'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import {getRandomNum} from '../../../common/js/random.js'
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
          depprincipalid: '',
          depprincipalname: '',
          gxswId: '004819',
          gxsw: '郑贝贝',
          zcb: '总裁办',
          zcbId: 'A0002',
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
        this.alldata.flowId = getRandomNum('DWXC')
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
          this.alldata.depprincipalid = item.deptHeadId
          this.alldata.depprincipalname = item.deptHead
          this.alldata.reportofcompanyid = item.cid
          this.alldata.reportofcompanyname = item.cname
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
          axios.post(this.ip + 'tReportCheck/addTReportCheck.do', qs.parse(formcontroler)).then((res) => {
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
          axios.post(this.ip + 'tReportCheck/addTReportCheck.do', qs.stringify(flownum)).then((res) => {
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
  height: 50px;
  border: 1px solid #ccc;
  overflow:auto;
}
.in-li{
  margin-right:5px;
}
</style>
