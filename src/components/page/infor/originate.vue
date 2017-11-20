<template>
  <div>
    <div v-show="data.initiate">
      <Button type="info" class="faqi" @click='sendProcess'>发起流程</Button>
    </div>
    <div v-show="data.sponsor">
      <Button type="success" size="small" @click="comment = true">继续派送</Button>
      <Button type="warning" size="small" @click="back = true">退回</Button>
      <Button type="error" size="small" @click="comment = true">终止</Button>
    </div>
    <processSP v-show="data.sponsor" class="sp"></processSP>
   <Modal
        title="审批意见"
        v-model="comment"
        @on-ok="sucessprocess"
        class-name="vertical-center-modal">
        <Input type="textarea" v-model='rsmsg.msg' placeholder="请输入..." :rows="4"></Input>
    </Modal>
    <Modal
        title="退回到指定关卡"
        v-model="back"
        class-name="vertical-center-modal">
        <i-table  highlight-row ref="currentRowTable" border :columns="columns2" :data="data2" on-row-click></i-table>
        <Input type="textarea" v-model='yaoqiu' placeholder="请输入审批意见..." :rows="4" class="textera"></Input>
    </Modal>
  </div>
</template>
<script>
  import processSP from '../infor/processSP.vue'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    props: {
      data: {}
    },
    data () {
      return {
        alldata: this.data,
        showBtn: {
          type: Boolean,
          default: false
        },
        comment: false,
        back: false,
        yaoqiu: '',
        columns2: [
          {
            type: 'index',
            align: 'center'
          },
          {
            title: '关卡名称',
            key: 'gqmc'
          },
          {
            title: '具体人员',
            key: 'name'
          }
        ],
        data2: [],
        rsmsg: {
          msg: '',
          ZK: ''
        }
      }
    },
    created () {
      this.showBtn = this.data
      if (this.showBtn.sponsor === 'true') {
        sessionStorage.removeItem('eSend')
      } else if (this.showBtn.initiate === 'true') {
        sessionStorage.removeItem('aSend')
      }
    },
    methods: {
      sendProcess () {
        let formcontroler = this.alldata
        axios.post('http://172.30.9.66:8080/ZHYOASystem_test/purchaseOrders/startApply.do', qs.stringify(formcontroler)).then((res) => {
          console.log(res)
          if (res.success) {
            this.$router.push('/index')
          } else {
            alert('发送失败')
          }
        })
      },
      sucessprocess () {
        let formcontroler = this.rsmsg
        axios.post('url', qs.stringify(formcontroler)).then((res) => {
          if (res.success) {
            this.$router.push('/index')
          } else {
            alert('审批失败')
          }
        })
      }
    },
    components: {
      processSP
    }
  }
</script>
<style>
.faqi{
  margin-bottom: 10px
}
.textera{
  margin-top: 10px
}
.sp{
  margin-top: 10px
}
</style>