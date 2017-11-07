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
            <MenuItem name="2-2"></MenuItem>
            <MenuItem name="4-3"></MenuItem>
          </Submenu>
           <Submenu name="in">
            <template slot="title">
              <Icon type="pin"></Icon>
              采购
            </template>
            <MenuItem name="llh">采购单</MenuItem>
            <MenuItem name="2-2"></MenuItem>
            <MenuItem name="4-3"></MenuItem>
          </Submenu>
        </Menu>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    methods: {
      routeTo (e) {
        this.$router.push(e)
      }
    }
  }
</script>

<style>

</style>
