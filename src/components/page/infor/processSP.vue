<template>
  <div>
  	<Button type="info" size="small" @click="spbb=true">审批历程</Button>
  	<Modal
        title="审批版本"
        v-model="spbb"
        class-name="vertical-center-modal">
        <Table stripe :columns="columns1" :data="spData"></Table>
    </Modal>
  </div>
</template>
<script type="text/javascript">
  import ip from '../../../common/js/const.js'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data () {
      return {
        ip: ip,
        spbb: false,
        columns1: [
          {
            title: '审批人',
            key: 'userId'
          },
          {
            title: '审批意见',
            key: 'message'
          },
          {
            title: '审批时间',
            key: 'time'
          }
        ],
        spData: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.getcourse()
      })
    },
    methods: {
      getcourse () {
        let resmsg = {
          fId: sessionStorage.getItem('processId'),
          processInstanceId: sessionStorage.getItem('processInstanceId')
        }
        axios.post(this.ip+'ZHYOASystem_test2.0/purchaseOrdersTask/listHistoryCommentWithProcessInstanceId.do', qs.stringify(resmsg)).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.spData = res.data.rows
            this.$router.push('/index')
          } else {
            alert('审批失败')
          }
        }).catch(function (error) {
          alert(error)
          this.$router.push('/error')
        })
      }
    }
  }
</script>
<style type="text/css"></style>