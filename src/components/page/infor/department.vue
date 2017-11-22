<template>
  <div>
  	<Modal v-model="showModal" @on-ok="okdept" @on-cancel="canceldept" title="部门信息查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">部门名称</Button>
              <Input  placeholder="请输入..."></Input>
              <Button type="text">部门编号</Button>
              <Input placeholder="请输入..."></Input>
  	        </div>
  	      </Col>
  	      <Col span="5" offset="1">
            <div class="un-input">
              <Button type="info">查询</Button>
  	        </div>
  	      </Col>
        </Row>
        <list-view @tableitem="getTable" :data="deptdata"></list-view>
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
        },
        deptdata: {
          process: [],
          pagesize: 4,
          column: [
            {
              title: '部门代号',
              key: 'deptnum'
            },
            {
              title: '部门名称',
              key: 'depatname'
            }
          ]
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
          this.deptdata.process = res.data.data.alldata
        })
      },
      okdept () {
        this.$emit('deptStatus', this.hideDept)
      },
      getTable (item) {
        console.log(item)
        this.$emit('deptitem', item)
        this.$emit('deptStatus', this.hideDept)
        if (item != null) {
          this.showModal = false
        }
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
