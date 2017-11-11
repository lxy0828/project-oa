<template>
  <div>
    <Modal v-model="showmodal" @on-ok="clickOK" @on-cancel="clickCancel" :closable="false" :mask-closable="false" title="查询人员信息" width="1100">
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
      <list-view @tableitem="getTable" :data="staffdata"></list-view>
    </Modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import listView from '../../page/listview/listview.vue'
  export default {
    props: {
      data: {
        type: Boolean
      }
    },
    data () {
      return {
        showmodal: this.data,
        hideMask: {
          staffFlag: false,
          staffmodal: false
        },
        staffdata: {
          process: [],
          pagesize: 4,
          column: [
            {
              title: '编号',
              key: 'apanum'
            },
            {
              title: '姓名',
              key: 'apaname'
            },
            {
              title: '部门代号',
              key: 'bmnum'
            },
            {
              title: '部门名称',
              key: 'bmname'
            },
            {
              title: '公司代号',
              key: 'gsnum'
            },
            {
              title: '公司名称',
              key: 'gsname'
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
        axios.get('api/staff').then((res) => {
          this.staffdata.process = res.data.data.alldata
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
