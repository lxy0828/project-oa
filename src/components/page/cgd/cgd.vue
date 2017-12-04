<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>采购单</h1>
    <div class="processtietle">
       <div class="hk">单号：<span>{{alldata.flowId}}</span></div>
       <div class="hk">日期：<span>{{alldata.submissionDate}}</span></div>
      </div>
    <div class="main-cgd">
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
            <Button type="text">部门审核</Button>
            <Input readonly v-model="alldata.deptAuditor1Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor1" placeholder="请输入..."></Input>
            <Button type="info" @click="check" :disabled='isDisabled'>查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">部门审核</Button>
            <Input readonly v-model="alldata.deptAuditor2Id" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.deptAuditor2" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext" :disabled='isDisabled'>查询</Button>
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
        <Col span="10">
          <div class="un-input">
            <Button type="text">总金额</Button>
            <Input readonly v-model='alldata.totalAmount' placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">大写</Button>
            <Input readonly v-model='alldata.upperAmount' placeholder="请输入..."></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
            <Button type="text">品名</Button>
            <Input v-model='alldata.productName' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">预估单价</Button>
            <Input v-model='alldata.estimatedPrice' placeholder="请输入..." @on-blur="addmoney" :disabled='isDisabled'></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">单位</Button>
            <Input  v-model='alldata.unit' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
            <Button type="text">数量</Button>
            <Input  v-model='alldata.number' placeholder="请输入..." @on-blur="addmoney" :disabled='isDisabled'></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">金额</Button>
            <Input readonly  v-model='alldata.amount' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
        <!-- <Col span="8">
          <Button type="text">是否为办公用品</Button>
          <RadioGroup v-model="animal">
            <Radio label="是" :disabled='isDisabled'></Radio>
            <Radio label="否" :disabled='isDisabled'></Radio>
          </RadioGroup>
        </Col> -->
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">用途：</Button>
            <Input  v-model='alldata.use'  placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">产品要求：</Button>
            <Input type="textarea" v-model='alldata.productRequirement' placeholder="请输入..." :rows="4" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class="rpw-line">
        <div style="margin-top:30px">
          <i-button type="success" @click="addInput" :disabled='isDisabled'>添加</i-button>
          <Button type="error" @click="Tabledelete" :disabled='isDisabled'>删除</Button>
        </div>
        <i-table @on-row-click="Onsleect" height="250" highlight-row ref="currentRowTable" border :columns="columns1" :data="alldata.orderslist" ></i-table>
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
  import {DX} from '../../../common/js/dx.js'
  export default {
    data () {
      return {
        isDisabled: '',
        showSend: true,
        animal: '是',
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
        // productName: '',
        // estimatedPrice: '',
        // unit: '',
        // number: '',
        // amount: '',
        // use: '',
        // productRequirement: '',
        // flowId: '',
        alldata: {
          processName: '采购单',
          proposerId: '',
          proposer: '',
          propDeptId: '',
          propDeptName: '',
          deptAuditor1Id: '',
          deptAuditor1: '',
          deptAuditor2Id: '',
          deptAuditor2: '',
          deptHeadId: '',
          deptHead: '',
          propCompId: '',
          submissionDate: '',
          propCompName: '',
          noticePerson: '',
          totalAmount: 0,
          upperAmount: '',
          productName: '',
          estimatedPrice: '',
          unit: '',
          number: '',
          amount: '',
          use: '',
          productRequirement: '',
          flowId: '',
          orderslist: []
        },
        // orderslist: [],
        // commodity: '',
        // danjia: '',
        // unit: '',
        // number: '',
        // price: '',
        // yongtu: '',
        // demand: '',
        apadata: {},
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '品名',
            key: 'productName'
          },
          {
            title: '预估单价',
            key: 'estimatedPrice'
          },
          {
            title: '单位',
            key: 'unit'
          },
          {
            title: '数量',
            key: 'number'
          },
          {
            title: '金额',
            key: 'amount'
          },
          {
            title: '用途',
            key: 'use'
          },
          {
            title: '产品要求',
            key: 'productRequirement'
          }
        ]
      }
    },
    created () {
      console.log(sessionStorage.getItem('processId'))
      this.sendState.sponsor = sessionStorage.getItem('eSend')
      // console.log(this.sendState.sponsor)
      this.sendState.initiate = sessionStorage.getItem('aSend')
      this.alldata.upperAmount = DX(this.alldata.totalAmount)
      this.control()
    },
    methods: {
      getDate () {
        var myDate = new Date()
        this.alldata.flowId = getRandomNum('CGD')
        this.alldata.submissionDate = myDate.toLocaleDateString()
      },
      getSend (item) {
        console.log(item)
        if (item) {
          this.$Loading.start()
          let formcontroler = {}
          formcontroler = this.alldata
          // formcontroler.list = this.orderslist
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
      selectdepartment () {
        alert('部门为自动获取')
      },
      addmoney () {
        this.alldata.amount = Number(this.alldata.estimatedPrice) * Number(this.alldata.number)
      },
      addInput () {
        let item = {}
        // item.productName = '测试'
        item.productName = this.alldata.productName
        item.estimatedPrice = this.alldata.estimatedPrice
        item.unit = this.alldata.unit
        item.number = this.alldata.number
        item.amount = this.alldata.amount.toString()
        item.use = this.alldata.use
        item.productRequirement = this.alldata.productRequirement
        item.flowId = this.alldata.flowId
        // console.log(item)
        // console.log(this.alldata.orderslist)
        this.alldata.orderslist.push(item)
        // let sum = 0
        // let je = 0
        // this.alldata.orderslist.forEach(function (money) {
        //   je = Number(money.amount)
        //   sum += je
        //   return sum
        // })
        // this.alldata.totalAmount = sum
        // this.alldata.daxielMoney = DX(this.alldata.totalAmount)
        this._scaleMoney()
        console.log(qs.parse(this.alldata))
      },
      // 每次添加删除操作后金额异动计算
      _scaleMoney () {
        let sum = 0
        let je = 0
        this.alldata.orderslist.forEach(function (money) {
          je = Number(money.amount)
          sum += je
          return sum
        })
        this.alldata.totalAmount = sum
        this.alldata.upperAmount = DX(this.alldata.totalAmount)
      },
      remove (index) {
        this.alldata.orderslist.splice(index, 1)
        var sum = 0
        var je = 0
        this.alldata.orderslist.forEach(function (money) {
          je = Number(money.amount)
          sum += je
          return sum
        })
        this.alldata.totalAmount = sum
        this.alldata.daxielMoney = DX(this.alldata.totalAmount)
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
      },
      Onsleect (a, b) {
        console.log(b)
        this.selectIndex = b
      },
      Tabledelete () {
        this.alldata.orderslist.splice(this.selectIndex, 1)
        this._scaleMoney()
        console.log(this.alldata.orderslist)
      }
    },
    components: {
      Staff,
      Originate
    }
  }
</script>

<style>
.main-cgd{
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

</style>
