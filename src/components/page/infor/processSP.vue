<template>
  <div>
  	<Button type="info" @click="spbb=true">查看流程审批</Button>
  	<Modal
        title="审批版本"
        v-model="spbb"
        class-name="vertical-center-modal">
        <Table stripe :columns="columns1" :data="spData"></Table>
    </Modal>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        spbb: false,
        columns1: [
          {
            title: '关卡名称',
            key: 'gqmc'
          },
          {
            title: '审批人',
            key: 'spr'
          },
          {
            title: '审批意见',
            key: 'spyj'
          },
          {
            title: '审批时间',
            key: 'spsj'
          }
        ],
        spData: [
          {
            gqmc: '申请人',
            spr: '李兴亚',
            spyj: '同意',
            spsj: '2017/11/14'
          }
        ]
      }
    }
  }
</script>
<style type="text/css"></style>