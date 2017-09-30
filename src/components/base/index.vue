<template>
  <div class="layout">
    <Row type="flex">
      <i-col class="layout-menu-left">
        <Menu theme="dark" width="auto">
          <div class="layout-logo-left">
            <h3>OA系统</h3>
          </div>
          <Menu-item name="begin">
            <Icon type="ios-navigate"></Icon>
            <span class="layout-text">发起流程</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col>
      	<div class="layout-header">
          <i-button type="text">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.layout
  border: 1px solid #d7dde4
  background: #f5f7f9
  position: relative
  border-radius: 4px
  overflow: hidden
  .layout-logo-left
    width: 90%
    height: 30px
    background: #5b6270
    margin: 15px auto
    line-height: 30px
    color: white
    text-align: center
    vertical-align: middle
    overflow: hidden
</style>
