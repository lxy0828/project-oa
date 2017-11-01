<template>
  <div>
    <h1>联络函</h1>
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
      	<Col span="24">
      	  <Button type="text">事由:</Button>
          <Input type="textarea" :rows="4" placeholder="请输入..."></Input>
  	    </Col>
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
        apadata: {}
      }
    },
    methods: {
      getTable (item) {
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
      }
    },
    components: {
      Staff
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
</style>
