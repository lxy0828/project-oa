<template>
  <div>
  	<Modal v-model="showModal" @on-ok="okdept" @on-cancel="canceldept" title="公司信息查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">公司名称</Button>
              <Input value="1321312" placeholder="请输入..."></Input>
              <Button type="text">公司编号</Button>
              <Input value="1321312" placeholder="请输入..."></Input>
  	        </div>
  	      </Col>
  	      <Col span="5" offset="1">
            <div class="un-input">
              <Button type="info">查询</Button>
  	        </div>
  	      </Col>
        </Row>
        <list-view :data="deptdata"></list-view>
    </Modal>
  </div>
</template>

<script>
  export default {}
</script>

<style>

</style>
