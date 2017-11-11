<template>
  <div>
  	<Modal v-model="showModal" @on-ok="okdept" @on-cancel="canceldept" title="Common Modal dialog box title">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">姓名</Button>
              <Input value="1321312" placeholder="请输入..."></Input>
              <Button type="text">编号</Button>
              <Input value="1321312" placeholder="请输入..."></Input>
  	        </div>
  	      </Col>
  	      <Col span="5" offset="1">
            <div class="un-input">
              <Button type="info">查询</Button>
  	        </div>
  	      </Col>
        </Row>
    </Modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import listView from '../listview/listview.vue'
  export default {
    props: {
      data: {
        type: Boolean
      }
    },
    data () {
      return {
        showModal: this.data,
        hideDept: {
          deptFlag: false,
          deptmodal: false
        }
      }
    },
    created () {
      this._getDept()
    },
    methods: {
      _getDept () {
        axios.get('api/dept').then((res) => {
          console.log(res)
        })
      },
      okdept () {
        this.$emit('deptStatus', this.hideDept)
      },
      canceldept () {
        this.$emit('deptStatus', this.hideDept)
      }
    },
    components: {
      listView
    }
  }
</script>

<style>
.un-input{
	display: flex;
}
.row-line{
	margin-bottom: 15px;
}
</style>
