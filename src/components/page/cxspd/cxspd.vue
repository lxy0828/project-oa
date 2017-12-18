<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>促销审批单</h1>
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
            <Button type="text">申请人公司</Button>
            <Input readonly  placeholder="请输入..."></Input>
            <Input readonly  placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">部门负责人</Button>
            <Input readonly  placeholder="请输入..."></Input>
            <Input readonly  placeholder="请输入..."></Input>
  	      </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">申请人公司</Button>
            <Input readonly v-model="alldata.CompanyNumber" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.CompanyId" placeholder="请输入..."></Input>
            <Button type="info" @click="checkCompany" :disabled='isDisabled'>查询</Button>
  	      </div>
        </Col>
        <Col span="10" offset="4">
          <Button type="text">是否为会员活动</Button>
          <RadioGroup v-model="alldata.seal">
            <Radio label="是" :disabled='isDisabled'></Radio>
            <Radio label="否" :disabled='isDisabled'></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
          <Button type="text">开始日期</Button>
          <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </div>
  	    </Col>
  	    <Col span="8">
          <div class="un-input">
  	      <Button type="text">结束日期</Button>
          <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </div>
  	    </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">活动执行月份</Button>
            <Input v-model="alldata.mounth" placeholder="请输入纯数字"></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">活动标题</Button>
            <Input v-model="alldata.title" placeholder="请输入"></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">促销类型</Button>
            <Select v-model="alldata.model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
            <Button type="text">折扣率：</Button>
            <Input v-model="alldata.discount" placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">预计销售：</Button>
            <Input v-model="alldata.predict" placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">费效比：</Button>
            <Input v-model="alldata.cost" placeholder="请输入..."></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="20">
          <div class=un-input>
          <Button type="text">门店范围：</Button>
          <Input v-model="alldata.scope"></Input>
          </div>
        </Col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">申请事由：</Button>
            <Input type="textarea" v-model='alldata.cause' placeholder="请输入..." :rows="4" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class="row-line">
        <div style="margin-top:30px">
          <i-button type="success" @click="addInput" :disabled='isDisabled'>添加</i-button>
          <Button type="error" @click="Tabledelete" :disabled='isDisabled'>删除</Button>
        </div>
        <i-table @on-row-click="Onsleect" height="250" highlight-row ref="currentRowTable" border :columns="columns1" :data="alldata.orderslist" ></i-table>
      </Row>
       <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
       <Company @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="Flag"></Company>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  import Company from '../../page/infor/company.vue'
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
        Flag: false,
        flagNum: 0,
        sendState: {
          sponsor: '',
          initiate: ''
        },
        cityList: [
          {
            value: '新店开业活动',
            label: '新店开业活动'
          },
          {
            value: '月度常规活动',
            label: '月度常规活动'
          },
          {
            value: '临时促销活动',
            label: '临时促销活动'
          },
          {
            value: '区域地推活动',
            label: '区域地推活动'
          },
          {
            value: '外卖平台活动',
            label: '外卖平台活动'
          },
          {
            value: '异业合作活动',
            label: '异业合作活动'
          },
          {
            value: '会员活动',
            label: '会员活动'
          },
          {
            value: '第三方支付活动',
            label: '第三方支付活动'
          },
          {
            value: '全国性促销活动',
            label: '全国性促销活动'
          },
          {
            value: '短信推送',
            label: '短信推送'
          }
        ],
        disabledGroup: '是',
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
          company: '',
          companyNumber: '',
          seal: '是',
          price: '',
          cause: '',
          CompanyNumber: '',
          CompanyId: '',
          fsNumber: '',
          model1: '',
          discount: '',
          predict: '',
          cost: '',
          scope: '',
          orderslist: []
        },
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '公章所属公司',
            key: 'company'
          },
          {
            title: '使用类别',
            key: 'Sort'
          },
          {
            title: '公章类型',
            key: 'sealSort'
          },
          {
            title: '需盖份数',
            key: 'sealNumber'
          },
          {
            title: '使用原因',
            key: 'result'
          }
        ]
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
        this.alldata.flowId = getRandomNum('GZSYSQ')
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
      checkCompany () {
        this.Flag = true
        this.modal = true
      },
      selectdepartment () {
        alert('部门为自动获取')
      },
      addInput () {
        let item = {}
        item.company = this.alldata.CompanyId
        item.Sort = this.alldata.animal
        item.sealSort = this.alldata.seal
        item.sealNumber = this.alldata.fsNumber
        item.result = this.alldata.cause
        item.flowId = this.alldata.flowId
        // console.log(item)
        // console.log(this.alldata.orderslist)
        this.alldata.orderslist.push(item)
      },
      Tabledelete () {
        this.alldata.orderslist.splice(this.selectIndex, 1)
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
      Originate,
      Company
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
