<template>
  <div>
  	<Modal v-model="showCom" @on-ok="okcom" @on-cancel="cancelcom" title="公司信息查询">
        <Row class="row-line">
          <Col span="18">
            <div class="un-input">
              <Button type="text">公司名称</Button>
              <Input  placeholder="请输入..."></Input>
              <Button type="text">公司编号</Button>
              <Input  placeholder="请输入..."></Input>
  	        </div>
  	      </Col>
  	      <Col span="5" offset="1">
            <div class="un-input">
              <Button type="info">查询</Button>
  	        </div>
  	      </Col>
        </Row>
        <list-view @tableitem="getTable" :data="comdata"></list-view>
    </Modal>
  </div>
</template>

<script>
  import listView from '../listview/listview.vue'
  export default {
  	props: {
      data: {
        type: Boolean
      }
    },
    data () {
      return {
        showCom: this.data,
        hideCom: {
          comFlag: false,
          commodal: false
        },
        comdata: {
          process: [],
          pagesize: 4,
          column: [
            {
              title: '公司代号',
              key: 'deptnum'
            },
            {
              title: '公司名称',
              key: 'depatname'
            }
          ]
        }
      }
    },
    created: {
      console.log(this.data)
    },
    methods: {
      okcom () {
        this.$emit('comStatus', this.hideCom)
      },
      cancelcom () {
        this.$emit('comStatus', this.hideCom)
      },
      // 获取listview组件中的值
      getTable (item) {
        if (item != null) {
          this.showCom = false
        }
      }
    }
    compinents: {
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
