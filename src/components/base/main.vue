<template>
  <div>
    <div>
      <Button type="primary" @click="demand = true">点击查询</Button>
      <Modal
        title="进阶查询"
        v-model="demand"
        class-name="vertical-center-modal">
        <span>选择流程(选填)</span>
        <Cascader :data="casdata" change-on-select  v-model="value1"></Cascader>
        <span>选择日期</span>
        <Col span="24">
          <DatePicker type="daterange" confirm placement="bottom-end" placeholder="选择日期" style="width: 100%"></DatePicker>
        </Col>
        <p>输入单号</p>
        <Input v-model="value" placeholder="请输入..."></Input>
        <p>输入发起人</p>
        <Input v-model="value" placeholder="请输入..."></Input>
      </Modal>
    </div>
    <list-view :data="process"></list-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import listView from '../page/listview/listview.vue'
  import connect from '../../common/js/connect.js'
  export default {
    data () {
      return {
        casdata: connect,
        process: [],
        demand: false
      }
    },
    created () {
      console.log(connect)
      this._getProcess()
    },
    methods: {
      _getProcess () {
        axios.get('api/proce').then((res) => {
          this.process = res.data.data.alldata
        })
      }
    },
    components: {
      listView
    }
  }
</script>

<style>
/*.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
}*/
</style>
