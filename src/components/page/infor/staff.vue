<template>
  <div>
    <Modal v-model="showmodal" @on-ok="clickOK" @on-cancel="clickCancel" :closable="false" :mask-closable="false" title="查询人员信息" width="1100">
      <Row class="row-line">
        <Col span="18">
          <div class="un-input">
            <Button type="text">姓名</Button>
            <Input v-model="selectData.ename" placeholder="请输入..."></Input>
            <Button type="text">编号</Button>
            <Input v-model="selectData.eid" placeholder="请输入..."></Input>
  	      </div>
  	    </Col>
  	    <Col span="5" offset="1">
          <div class="un-input">
            <Button type="info" @click="staffSelect">查询</Button>
  	      </div>
  	    </Col>
      </Row>
      <list-view v-if="showList" @tableitem="getTable" :data="staffdata"></list-view>
    </Modal>
  </div>
</template>

<script>
  import ip from '../../../common/js/const.js'
  import axios from 'axios'
  import qs from 'qs'
  import listView from '../../page/listview/listview.vue'
  export default {
    props: {
      data: {
        type: Boolean
      }
    },
    data () {
      return {
        ip: ip,
        showmodal: this.data,
        showList: false,
        hideMask: {
          staffFlag: false,
          staffmodal: false
        },
        selectData: {
          ename: '',
          eid: ''
        },
        staffdata: {
          process: [],
          pagesize: 4,
          column: [
            {
              title: '编号',
              key: 'eid'
            },
            {
              title: '姓名',
              key: 'ename'
            },
            {
              title: '部门代号',
              key: 'did'
            },
            {
              title: '部门名称',
              key: 'dname'
            },
            {
              title: '公司代号',
              key: 'cid'
            },
            {
              title: '公司名称',
              key: 'cname'
            }
          ]
        }
      }
    },
    created () {
      this._getStaff()
    },
    methods: {
      _getStaff () {
        this.showList = false
        this.$Loading.start()
        axios.post('http://172.30.43.211:8080/ZHYOASystem_test3.0/purchaseOrders/listUCD.do').then((res) => {
          console.log(res)
          this.staffdata.process = res.data.rows
          this.showList = true
          this.$Loading.finish()
        })
      },
      getTable (item) {
        this.$emit('tableitem', item)
        this.$emit('getstatus', this.hideMask)
        if (item != null) {
          this.showmodal = false
        }
      },
      clickOK () {
        this.$emit('getstatus', this.hideMask)
      },
      clickCancel () {
        this.$emit('getstatus', this.hideMask)
      },
      staffSelect () {
        this.showList = false
        this.$Loading.start()
        let selectData = this.selectData
        axios.post('http://172.30.43.211:8080/ZHYOASystem_test3.0/purchaseOrders/listUCD.do', qs.stringify(selectData)).then((res) => {
          console.log(res)
          this.staffdata.process = res.data.rows
          this.showList = true
          this.$Loading.finish()
        })
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
