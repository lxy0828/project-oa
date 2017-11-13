<template>
  <div>
    <h1>采购单</h1>
    <div class="processtietle">
       <div class="hk">单号：<span>{{processNumber}}</span></div>
       <div class="hk">日期：<span>{{processDate}}</span></div>
      </div>
    <div class="main-cgd">
      <Row class="row-line">
        <Col span='10'>
          <div class="un-input">
            <Button type="text">发起人</Button>
            <Input readonly v-model="alldata.apanum" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.apaname" placeholder="请输入..."></Input>
            <Button type="info" @click="selectStaff">查询</Button>
          </div>
        </Col>
         <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人部门</Button>
            <Input readonly v-model="alldata.bmnum" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.bmname" placeholder="请输入..."></Input>
            <Button type="info" @click="selectdepartment">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">部门审核</Button>
            <Input readonly v-model="alldata.checknum" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.checkname" placeholder="请输入..."></Input>
            <Button type="info" @click="check">查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">部门审核</Button>
            <Input readonly v-model="alldata.checknextnum" placeholder="请输入..."></Input>
            <Input readonly v-model="alldata.checknextname" placeholder="请输入..."></Input>
            <Button type="info" @click="checknext">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">部门负责人</Button>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人公司</Button>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input">
            <Button type="text">总金额</Button>
            <Input readonly disabled v-model='totalMoney' placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">大写</Button>
            <Input readonly disabled v-model='daxielMoney' placeholder="请输入..."></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
            <Button type="text">品名</Button>
            <Input v-model='commodity' placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">预估单价</Button>
            <Input v-model='danjia' placeholder="请输入..." @on-blur="addmoney"></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">单位</Button>
            <Input  v-model='unit' placeholder="请输入..."></Input>
          </div>
        </Col>
      </Row>
      <Row class="row-line">
        <Col span="8">
          <div class="un-input">
            <Button type="text">数量</Button>
            <Input  v-model='number' placeholder="请输入..." @on-blur="addmoney"></Input>
          </div>
        </Col>
        <Col span="8">
          <div class="un-input">
            <Button type="text">金额</Button>
            <Input disabled  v-model='price' placeholder="请输入..."></Input>
          </div>
        </Col>
        <Col span="8">
          <Button type="text">是否为办公用品</Button>
          <Radio-group :model.sync="disabledGroup">
            <Radio value="金斑蝶"></Radio>
            <Radio value="爪哇犀牛"></Radio>
            <Radio value="印度黑羚"></Radio>
          </Radio-group>
        </Col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">用途：</Button>
            <Input  v-model='yongtu' placeholder="请输入..."></Input>
          </div>
        </col>
      </Row>
      <Row class='row-line'>
        <col span="20">
          <div class="un-input">
            <Button type="text">产品要求：</Button>
            <Input type="textarea" v-model='yaoqiu' placeholder="请输入..." :rows="4"></Input>
          </div>
        </col>
      </Row>
      <Row class="rpw-line">
        <div style="margin-top:30px">
          <i-button type="success" @click="addInput">添加</i-button>
        </div>
          <i-table height="250" highlight-row ref="currentRowTable" border :columns="columns1" :data="data1" on-row-click></i-table>
      </Row>
      <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
    </div>
  </div>
</template>
<script>
  import Staff from '../../page/infor/staff.vue'
  export default {
    data () {
      return {
        value: '',
        disabledGroup: '爪哇犀牛',
        processNumber: '666',
        processDate: '',
        modal: false,
        flag: false,
        flagNum: 0,
        alldata: {
          apanum: '',
          apaname: '',
          bmnum: '',
          bmname: '',
          checknum: '',
          checkname: '',
          checknextnum: '',
          checknextname: ''
        },
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
          },
          {
            title: '删除',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: [],
        totalMoney: 0,
        commodity: '',
        daxielMoney: '',
        danjia: '',
        unit: '',
        number: '',
        price: '',
        yongtu: '',
        yaoqiu: ''
      }
    },
    created () {
      this.getDate()
      this.daxielMoney = this.DX(this.totalMoney)
    },
    methods: {
      getDate () {
        var myDate = new Date()
        console.log(myDate.toLocaleDateString())
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
        this.price = Number(this.danjia) * Number(this.number)
      },
      DX (money) {
        var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        var cnIntRadice = ['', '拾', '佰', '仟']
        var cnIntUnits = ['', '万', '亿', '兆']
        var cnDecUnits = ['角', '分', '毫', '厘']
        var cnInteger = '整'
        var cnIntLast = '元'
        var maxNum = 999999999999999.9999
        var integerNum
        var decimalNum
        var chineseStr = ''
        var parts
        if (money === '') { return '' }
        money = parseFloat(money)
        if (money >= maxNum) {
          return ''
        }
        if (money === 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger
          return chineseStr
        }
        money = money.toString()
        if (money.indexOf('.') === -1) {
          integerNum = money
          decimalNum = ''
        } else {
          parts = money.split('.')
          integerNum = parts[0]
          decimalNum = parts[1].substr(0, 4)
        }
        if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0
          var IntLen = integerNum.length
          for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1)
            var p = IntLen - i - 1
            var q = p / 4
            var m = p % 4
            if (n === '0') {
              zeroCount++
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0]
              }
              zeroCount = 0
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
            }
            if (m === 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q]
            }
          }
          chineseStr += cnIntLast
        }
        if (decimalNum !== '') {
          var decLen = decimalNum.length
          for (var l = 0; l < decLen; l++) {
            var v = decimalNum.substr(l, 1)
            if (v !== '0') {
              chineseStr += cnNums[Number(v)] + cnDecUnits[l]
            }
          }
        }
        if (chineseStr === '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger
        } else if (decimalNum === '') {
          chineseStr += cnInteger
        }
        return chineseStr
      },
      addInput () {
        var item = {
          name: '',
          danwei: '',
          shuliang: '',
          jine: '',
          yt: '',
          cpyq: ''
        }
        item.name = this.commodity
        item.danwei = this.unit
        item.shuliang = this.number
        item.jine = this.price
        item.yt = this.yongtu
        item.cpyq = this.yaoqiu
        console.log(item)
        this.data1.push(item)
        var sum = 0
        var je = 0
        this.data1.forEach(function (money) {
          je = Number(money.jine)
          sum += je
          return sum
        })
        this.totalMoney = sum
        this.daxielMoney = this.DX(this.totalMoney)
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
        this.totalMoney = sum
        this.daxielMoney = this.DX(this.totalMoney)
      }
    },
    components: {
      Staff
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


</style>
