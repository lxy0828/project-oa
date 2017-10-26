<template>
  <div>
    <h1>联络函</h1>
    <div class="main-llh">
      <Row class="row-line">
        <Col span="10">
          <div class="un-input" style="display: flex;">
            <Button type="text">发起人</Button>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Button type="info">查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input" style="display: flex;">
            <Button type="text">发起人部门</Button>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Button type="info">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input" style="display: flex;">
            <Button type="text">部门审核</Button>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Button type="info">查询</Button>
  	      </div>
  	    </Col>
  	    <Col span="10" offset="4">
          <div class="un-input" style="display: flex;">
            <Button type="text">部门审核</Button>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Input readonly value="1321312" placeholder="请输入..."></Input>
            <Button type="info">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <Row class="row-line">
        <Col span="10">
          <div class="un-input" style="display: flex;">
            <Button type="text">部门负责人</Button>
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
    </div>
  </div>
</template>

<script>
  export default {}
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
