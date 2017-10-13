<template>
  <div>
    <Table border :columns="columns5" :data="historyData"></Table>
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
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        columns5: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '流程状态',
            key: 'state'
          },
          {
            title: '流程名称',
            key: 'lcname',
            sortable: true
          },
          {
            title: '流程单号',
            key: 'lcseat'
          },
          {
            title: '发起者',
            key: 'name'
          },
          {
            title: '日期',
            key: 'time',
            sortable: true
          },
          {
            title: '执行中的活动',
            key: 'active'
          }
        ],
        ajaxHistoryData: [],
        dataCount: 0,
        pageSize: 3,
        historyData: []
      }
    },
    created () {
      // console.log(this.data)
      setTimeout(() => {
        this.handleListApproveHistory()
      }, 1000)
    },
    methods: {
      handleListApproveHistory () {
        this.ajaxHistoryData = this.data
        this.dataCount = this.data.length
        if (this.data.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize)
        }
      },
      changePage (page) {
        let _start = (page - 1) * this.pageSize
        let _end = page * this.pageSize
        this.historyData = this.ajaxHistoryData.slice(_start, _end)
        console.log(this.pageData)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style>

</style>
