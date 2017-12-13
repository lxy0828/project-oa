<template>
  <div>
    <Originate :data="sendState" v-if="showSend" @getSend="getSend" @backSend="backSend"></Originate>
    <h1>ERP物料申请表</h1>
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
            <Button type="text">品名：</Button>
            <Input v-model='alldata.productName' placeholder="请输入..." :disabled='isDisabled'></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">型号</Button>
            <Input v-model='alldata.estimatedPrice' placeholder="请输入..." @on-blur="addmoney" :disabled='isDisabled'></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">单位：</Button>
            <Input v-model='alldata.estimatedPrice' placeholder="请输入..." @on-blur="addmoney" :disabled='isDisabled'></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
            <Button type="text">所属公司分类：</Button>
            <Select v-model="alldata.model2" style="width:200px">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">品类名称：</Button>
            <Select v-model="alldata.model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="8">
        </Col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">模块及程序：</Button>
            <Input type="textarea"  v-model='alldata.use'  placeholder="请输入..." :rows="3" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">涉及账套：</Button>
            <Input type="textarea" v-model='alldata.productRequirement' placeholder="请输入..." :rows="3" :disabled='isDisabled'></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">备注：</Button>
            <Input type="textarea"  v-model='alldata.bz'  placeholder="请输入..." :rows="3" :disabled='isDisabled'></Input>
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
        cityList: [
          {
            value: '气调大盒',
            label: '气调小盒'
          },
          {
            value: '气调小盒',
            label: '气调小盒'
          },
          {
            value: '定量装大盒',
            label: '定量装大盒'
          },
          {
            value: '定量装标盒',
            label: '定量装标盒'
          },
          {
            value: '定量装小盒',
            label: '定量装小盒'
          },
          {
            value: '赠送',
            label: '赠送'
          },
          {
            value: '网购',
            label: '网购'
          },
          {
            value: '简包',
            label: '简包'
          },
          {
            value: '彩包',
            label: '彩包'
          },
          {
            value: 'Mini彩包',
            label: 'Mini彩包'
          },
          {
            value: '颗粒装',
            label: '颗粒装'
          },
          {
            value: '小吃',
            label: '小吃'
          },
          {
            value: '百货',
            label: '百货'
          },
          {
            value: '辅料',
            label: '辅料'
          },
          {
            value: '礼盒（有）',
            label: '礼盒（有）'
          },
          {
            value: '礼盒（空）',
            label: '礼盒（空）'
          },
          {
            value: '公用耗品',
            label: '公用耗品'
          },
          {
            value: '小吃耗品',
            label: '小吃耗品'
          },
          {
            value: '汽车耗品',
            label: '汽车耗品'
          },
          {
            value: '易耗品',
            label: '易耗品'
          },
          {
            value: '袋子耗品',
            label: '袋子耗品'
          },
          {
            value: '门店固定资产',
            label: '门店固定资产'
          },
          {
            value: '赠品（外购）',
            label: '赠品（外购）'
          },
          {
            value: '赠品（自产)',
            label: '赠品（自产）'
          },
          {
            value: '耗品',
            label: '耗品'
          },
          {
            value: '原料',
            label: '原料'
          },
          {
            value: '生食',
            label: '生食'
          },
          {
            value: '熟食',
            label: '熟食'
          }
        ],
        cityList2: [
          {
            value: '前台商贸系统',
            label: '前台商贸系统'
          },
          {
            value: '后台生产系统',
            label: '后台生产系统'
          }
        ],
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
          orderslist: [],
          model1: '',
          model2: '',
          bz: ''
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
            title: '用户姓名',
            key: 'productName'
          },
          {
            title: '岗位',
            key: 'estimatedPrice'
          },
          {
            title: '申请原因',
            key: 'unit'
          },
          {
            title: '涉及模块',
            key: 'number'
          },
          {
            title: '基本权限',
            key: 'amount'
          },
          {
            title: '模块及程序编码',
            key: 'use'
          },
          {
            title: '涉及账套',
            key: 'productRequirement'
          }
        ]
      }
    },
    created () {
      console.log(sessionStorage.getItem('processId'))
      this.sendState.sponsor = sessionStorage.getItem('eSend')
      this.sendState.initiate = sessionStorage.getItem('aSend')
      this.alldata.upperAmount = DX(this.alldata.totalAmount)
      this.control()
    },
    methods: {
      getDate () {
        var myDate = new Date()
        this.alldata.flowId = getRandomNum('WLSQ')
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
          // alert('即将进入驳回接口')
          // this.$Loading.start()
          // let formcontroler = {}
          // formcontroler = this.alldata
          // console.log(qs.stringify(formcontroler))
          // http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrders/restartApply.do
          // axios.post('http://172.30.40.7:8080/ZHYOASystem_test2.0/purchaseOrdersTask/audit_bz.do', qs.parse(formcontroler)).then((res) => {
          //   console.log(res)
          //   if (res.data.success) {
          //     this.$router.push('/index')
          //     this.$Loading.finish()
          //   } else {
          //     alert('发送失败')
          //   }
          // })
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

<style type="text/css">
.main-wlsq{
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