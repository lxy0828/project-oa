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
            <MenuItem name="gzsqd">公章申请单</MenuItem>
            <MenuItem name="zjsysq">证件使用申请单</MenuItem>
            <MenuItem name="jdsqd">接待申请单</MenuItem>
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
      <Col span="8">
        <Menu :open-names="['in']" accordion  @on-select="routeTo">
           <Submenu name="in">
            <template slot="title">
              <Icon type="pin"></Icon>
              品牌中心
            </template>
            <MenuItem name="zmtsx">自媒体上线审批单</MenuItem>
            <MenuItem name="sjrws">计划任务书</MenuItem>
            <MenuItem name="4-3"></MenuItem>
          </Submenu>
          <Submenu name="in">
            <template slot="title">
              <Icon type="pin"></Icon>
              营销中心
            </template>
            <MenuItem name="cxspd">促销审批单</MenuItem>
            <MenuItem name="sjrws">新店开业审批单</MenuItem>
            <MenuItem name="4-3"></MenuItem>
          </Submenu>
          <Submenu name="in">
            <template slot="title">
              <Icon type="pin"></Icon>
              信息部
            </template>
            <MenuItem name="ERPwlsq">ERP物料申请表</MenuItem>
            <MenuItem name="ERPzhsq">ERP账号权限申请表</MenuItem>
            <MenuItem name="swzhsq">上网账号申请表</MenuItem>
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
