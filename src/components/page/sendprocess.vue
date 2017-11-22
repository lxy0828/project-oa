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
            <MenuItem name="2-2">1</MenuItem>
            <MenuItem name="4-3">2</MenuItem>
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
        sessionStorage.setItem('aSend', 'true')
        this.$router.push(e)
      }
    }
  }
</script>

<style>

</style>
