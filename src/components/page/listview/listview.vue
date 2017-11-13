<template>
  <div>
    <Table @on-row-click="clickRow" border :columns="data.column" :data="historyData"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount"  :page-size="pageSize" show-total @on-change="changePage"></Page>
      </div>
    </div>
    <div class="loading" v-show="!dataCount">
      <div class="loading-container">
        <loading></loading>
      </div>
    </div>  
  </div>
</template>

<script>
  import Loading from '../../base/loading/loading.vue'
  export default {
    props: {
      data: {}
    },
    data () {
      return {
        ajaxHistoryData: [],
        dataCount: 0,
        pageSize: 3,
        historyData: []
      }
    },
    created () {
      setTimeout(() => {
        this.handleListApproveHistory()
      }, 200)
    },
    methods: {
      handleListApproveHistory () {
        this.pageSize = this.data.pagesize
        this.ajaxHistoryData = this.data.process
        this.dataCount = this.data.process.length
        if (this.data.process.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
      },
      clickRow (item, index) {
        this.$emit('tableitem', item)
      },
      changePage (page) {
        let _start = (page - 1) * this.pageSize
        let _end = page * this.pageSize
        this.historyData = this.ajaxHistoryData.slice(_start, _end)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style>

</style>
