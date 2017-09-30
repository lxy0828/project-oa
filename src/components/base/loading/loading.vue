<template>
  <div class="loading">
  	<img src="./loading.gif" height="50" width="50">
  	<p class="desc">正在载入....</p>
  </div>
</template>

<script>
  export default {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loading
  width: 100%
  text-align: center
  .desc
    line-height: 20px
    font-size: 14px
    color: blue
</style>
