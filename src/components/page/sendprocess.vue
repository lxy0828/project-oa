<template>
  <div>
    <Row>
      <Col span="8">
        <Menu :open-names="['in']" accordion  @on-select="routeTo">
          <Submenu name="in">
            <template slot="title">
              <Icon type="pin"></Icon>
              行政
            </template>
            <MenuItem name="llh">联络函</MenuItem>
            <MenuItem name="ccsqd">出差申请</MenuItem>
            <MenuItem name="bgspd">报告审批单</MenuItem>
            <MenuItem name="pcsqd">派车申请单</MenuItem>
            <MenuItem name="dwxczl">对外宣传资料审批单</MenuItem>
            <MenuItem name="kcd">客餐单</MenuItem>
            <MenuItem name="xccpsq">小吃产品申请单</MenuItem>
          </Submenu>
           <Submenu name="in">
            <template slot="title">
              <Icon type="pin"></Icon>
              采购
            </template>
            <MenuItem name="cgd">采购单</MenuItem>
            <MenuItem name="2-2"></MenuItem>
            <MenuItem name="4-3"></MenuItem>
          </Submenu>
        </Menu>
      </Col>
    </Row>
  </div>
</template>

<script>
  // import bus from '../store/store.js'
  export default {
    // beforeDestory () {
    //   bus.$off('eventSend')
    // },
    methods: {
      routeTo (e) {
        // bus.$emit('eventSend', '32')
        sessionStorage.setItem('processId', '')
        sessionStorage.setItem('flowId', '')
        sessionStorage.setItem('aSend', 'true')
        sessionStorage.setItem('wait', 'false')
        this.$router.push(e)
      }
    }
  }
</script>

<style>

</style>
