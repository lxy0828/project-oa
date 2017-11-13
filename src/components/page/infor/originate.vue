<template>
  <div>
    <div v-show="showBtn">
      <Button type="info" class="faqi">发起流程</Button>
    </div>
    <div v-show="!showBtn">
      <Button type="success" size="small" @click="comment = true">继续派送</Button>
      <Button type="warning" size="small" @click="back = true">退回</Button>
      <Button type="error" size="small" @click="comment = true">终止</Button>
    </div>
   <Modal
        title="审批意见"
        v-model="comment"
        class-name="vertical-center-modal">
        <Input type="textarea" v-model='yaoqiu' placeholder="请输入..." :rows="4"></Input>
    </Modal>
    <Modal
        title="退回到制定关卡"
        v-model="back"
        class-name="vertical-center-modal">
        <i-table  highlight-row ref="currentRowTable" border :columns="columns2" :data="data2" on-row-click></i-table>
        <Input type="textarea" v-model='yaoqiu' placeholder="请输入审批意见..." :rows="4" class="textera"></Input>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showBtn: false,
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
        data2: []
      }
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
</style>