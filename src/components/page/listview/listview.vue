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
  import axios from 'axios'
  import Loading from '../../base/loading/loading.vue'
  import qs from 'qs'
  export default {
    props: {
      data: {}
    },
    data () {
      return {
        danhao: {
          flowId: ''
        },
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
        console.log(this.historyData)
      },
      clickRow (item, index) {
        console.log(item.flowId)
        this.danhao.flowId = item.flowId
        let flownum = this.danhao.flowId
        axios.post('http://172.30.9.45:8080/ZHYOASystem_test/purchaseOrdersTask/selectByFlowId', qs.stringify(flownum)).then((res) => {
          if (res.success) {
            window.sessionStorage.setItem('formdata', JSON.stringfy(res.purchaseOrders))
            this.$emit('tableitem', item)
          }
        })
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
