<template>
  <div>
    <Button type="text">发起人</Button>
    <h1>联络函</h1>
    <div class="processtietle">
      <div class="hk">单号：<span>{{processNumber}}</span></div>
      <div class="hk">日期：<span>{{processDate}}</span></div>
    </div>
    <div class="main-llh">
      <Row class="row-line">
        <Col span="10">
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
            <Input readonly  placeholder="请输入..."></Input>
            <Input readonly  placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input">
            <Button type="text">发起人公司</Button>
            <Input readonly  placeholder="请输入..."></Input>
            <Input readonly  placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
      	<Col span="24">
      	  <Button type="text">事由:</Button>
          <Input type="textarea" :rows="4" placeholder="请输入..."></Input>
  	    </Col>
      </Row>
      <!-- 需要使用v-if，在条件切换的时候合适的销毁与重建 -->
      <staff @tableitem="getTable" @getstatus='getSt' :data="modal" v-if="flag"></staff>
      <department @deptStatus="getDept" @deptitem="deptSt" :data="bmmodal" v-if="bmflag"></department>
    </div>
  </div>
</template>

<script>
  import Staff from '../../page/infor/staff.vue'
  import Department from '../../page/infor/department.vue'
  import {getRandomNum} from '../../../common/js/random.js'
  // import bus from '../../store/store.js'
  export default {
    data () {
      return {
        modal: false,
        flag: false,
        bmmodal: false,
        bmflag: false,
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
        processNumber: '',
        processDate: '',
        isShowSend: '1'
      }
    },
    // beforeDestory () {
    //   bus.$off('eventSend')
    // },
    created () {
      // bus.$on('eventSend', (i) => {
      //   this.isShowSend = i
      // })
      console.log(sessionStorage.getItem('eSend'))
      this.getDate()
    },
    methods: {
      // 填充人员信息选择输入
      getTable (item) {
        this.apadata = item
        if (this.flagNum === 1) {
          this.alldata.apanum = item.apanum
          this.alldata.apaname = item.apaname
          // this.alldata.bmnum = item.bmnum
          // this.alldata.bmname = item.bmname
        } else if (this.flagNum === 2) {
          this.alldata.checknum = item.apanum
          this.alldata.checkname = item.apaname
        } else if (this.flagNum === 3) {
          this.alldata.checknextnum = item.apanum
          this.alldata.checknextname = item.apaname
        }
      },
      // 填充部门信息选择输入
      deptSt (item) {
        this.alldata.bmnum = item.deptnum
        this.alldata.bmname = item.depatname
      },
      // 改变人员信息弹出框状态
      getSt (item) {
        this.flag = item.staffFlag
        this.modal = item.staffmodal
      },
      // 改变部门信息弹出框状态
      getDept (item) {
        this.bmmodal = item.deptFlag
        this.bmflag = item.deptFlag
      },
      // 选择人员信息，对状态做出标记
      selectStaff () {
        this.flagNum = 1
        this.flag = true
        this.modal = true
      },
      // 选择人员信息，对状态做出标记
      check () {
        this.flagNum = 2
        this.flag = true
        this.modal = true
      },
      // 选择人员信息，对状态做出标记
      checknext () {
        this.flagNum = 3
        this.flag = true
        this.modal = true
      },
      // 部门查询弹出框状态
      selectdepartment () {
        this.bmmodal = true
        this.bmflag = true
      },
      getDate () {
        var myDate = new Date()
        this.processDate = myDate.toLocaleDateString()
        this.processNumber = getRandomNum('LLH')
      }
    },
    watch: {
      isShowSend () {
        console.log(this.isShowSend)
      }
    },
    components: {
      Staff,
      Department
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
</style>
