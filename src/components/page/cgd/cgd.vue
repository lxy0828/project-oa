<template>
  <div>
    <Originate :data="sendState" v-if="showSend"></Originate>
    <h1>采购单</h1>
    <div class="processtietle">
       <div class="hk">单号：<span>{{alldata.flowId}}</span></div>
       <div class="hk">日期：<span>{{processDate}}</span></div>
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
            <Input v-model='alldata.estimatedPrice ' placeholder="请输入..." @on-blur="addmoney" :disabled='isDisabled'></Input>
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
            <Input readonly  v-model='alldata.totalAmount' placeholder="请输入..." :disabled='isDisabled'></Input>
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
      <!-- <Row class="rpw-line">
        <div style="margin-top:30px">
          <i-button type="success" @click="addInput" :disabled='isDisabled'>添加</i-button>
        </div>
          <i-table height="250" highlight-row ref="currentRowTable" border :columns="columns1" :data="data1" on-row-click></i-table>
      </Row> -->
      <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
    </div>
  </div>
</template>
<script>
  import Originate from '../../page/infor/originate.vue'
  import Staff from '../../page/infor/staff.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  import {DX} from '../../../common/js/dx.js'
  export default {
    data () {
      return {
        isDisabled: '',
        showSend: true,
        value: '',
        animal: '是',
        processNumber: '',
        processDate: '',
        modal: false,
        flag: false,
        flagNum: 0,
        sendState: {
          sponsor: '',
          initiate: ''
        },
        alldata: {
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
          propCompName: '',
          noticePerson: '',
          productName: '',
          totalAmount: 0,
          upperAmount: '',
          estimatedPrice: '',
          unit: '',
          number: '',
          use: '',
          productRequirement: '',
          flowId: ''
        },
        data1: [],
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
            key: 'name'
          },
          {
            title: '单位',
            key: 'danwei'
          },
          {
            title: '数量',
            key: 'shuliang'
          },
          {
            title: '金额',
            key: 'jine'
          },
          {
            title: '用途',
            key: 'yt'
          },
          {
            title: '产品要求',
            key: 'cpyq'
          }
          // {
          //   title: '删除',
          //   key: 'action',
          //   width: 80,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'error',
          //           size: 'small'
          //         },
          //         on: {
          //           click: () => {
          //             this.remove(params.index)
          //           }
          //         }
          //       }, '删除')
          //     ])
          //   }
          // }
        ]
      }
    },
    created () {
      this.getDate()
      this.sendState.sponsor = sessionStorage.getItem('eSend')
      // console.log(this.sendState.sponsor)
      this.sendState.initiate = sessionStorage.getItem('aSend')
      this.alldata.daxielMoney = DX(this.alldata.totalMoney)
      this.control()
    },
    methods: {
      getDate () {
        var myDate = new Date()
        this.alldata.flowId = getRandomNum('CGD')
        this.processDate = myDate.toLocaleDateString()
      },
      getTable (item) {
        console.log(item)
        this.apadata = item
        if (this.flagNum === 1) {
          this.alldata.apanum = item.apanum
          this.alldata.apaname = item.apaname
          this.alldata.bmnum = item.bmnum
          this.alldata.bmname = item.bmname
        } else if (this.flagNum === 2) {
          this.alldata.checknum = item.apanum
          this.alldata.checkname = item.apaname
        } else if (this.flagNum === 3) {
          this.alldata.checknextnum = item.apanum
          this.alldata.checknextname = item.apaname
        }
        console.log(this.flagNum)
      },
      getSt (item) {
        this.flag = item.staffFlag
        this.modal = item.staffmodal
        console.log(item)
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
        alert(123)
      },
      addmoney () {
        this.alldata.price = Number(this.alldata.danjia) * Number(this.alldata.number)
        this.alldata.totalMoney = this.alldata.price
        this.alldata.daxielMoney = DX(this.alldata.totalMoney)
      },
      addInput () {
        let item = {}
        item.name = this.commodity
        item.danwei = this.unit
        item.shuliang = this.number
        item.jine = this.price
        item.yt = this.yongtu
        item.cpyq = this.demand
        console.log(item)
        this.data1.push(item)
        var sum = 0
        var je = 0
        this.data1.forEach(function (money) {
          je = Number(money.jine)
          sum += je
          return sum
        })
        this.alldata.totalMoney = sum
        this.alldata.daxielMoney = DX(this.alldata.totalMoney)
      },
      remove (index) {
        this.data1.splice(index, 1)
        var sum = 0
        var je = 0
        this.data1.forEach(function (money) {
          je = Number(money.jine)
          sum += je
          return sum
        })
        this.alldata.totalMoney = sum
        this.alldata.daxielMoney = DX(this.alldata.totalMoney)
      },
      control () {
        if (this.sendState.sponsor) {
          this.isDisabled = true
          // listview里面缓存的值替换alldata
          // this.alldata = sessionStorage.getItem('formdata')
        }
        if (this.sendState.initiate) {
          this.isDisabled = false
        }
        console.log(this.isDisabled)
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
