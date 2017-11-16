<template>
  <div>
    <Tabs value="name1" @on-click="clickTab">
      <TabPane label="人员信息维护" name="name1">
      	<Button type="success" @click="peomodal = true">新增</Button>
      	<Modal v-model="peomodal" title="填入新增人员信息" @on-ok="increasePeo">
          <p>输入工号</p>
          <Input  placeholder="请输入..."></Input>
          <p>输入姓名</p>
          <Input  placeholder="请输入..."></Input>
          <p>输入部门代号</p>
          <Input  placeholder="请输入..."></Input>
          <p>输入部门名称</p>
          <Input  placeholder="请输入..."></Input>
          <p>输入公司代号</p>
          <Input  placeholder="请输入..."></Input>
          <p>输入公司名称</p>
          <Input  placeholder="请输入..."></Input>
        </Modal>
        <list-view :data="peodata"></list-view>
      </TabPane>
      <TabPane label="部门信息维护" name="name2">
        <Button type="success" @click="bmmodal = true">新增</Button>
        <Modal v-model="bmmodal" title="填入新增人员信息" @on-ok="increaseBm">
          <p>After you click ok, the dialog box will close in 2 seconds.</p>
        </Modal>
        <list-view :data="bmdata"></list-view>
      </TabPane>
      <TabPane label="公司信息维护" name="name3">
        <Button type="success" @click="gsmodal = true">新增</Button>
        <Modal v-model="gsmodal" title="填入新增人员信息" @on-ok="increaseGs">
          <p>After you click ok, the dialog box will close in 2 seconds.</p>
        </Modal>
        <list-view :data="gsdata"></list-view>
      </TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  import listView from '../listview/listview.vue'
  export default {
    data () {
      return {
        peomodal: false,
        bmmodal: false,
        gsmodal: false,
        peodata: {
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
              title: '主管',
              key: 'charge'
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
        },
        bmdata: {
          process: [],
          pagesize: 4,
          column: [
            {
              title: '编号',
              key: 'apanum'
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
        },
        gsdata: {
          process: [],
          pagesize: 4,
          column: [
            {
              title: '编号',
              key: 'apanum'
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
      // 初始化组件的时候，查询人员信息
    },
    methods: {
      clickTab (item) {
        // 通过获取name返回值，查询tab数据
        if (item === 'name1') {
          // 查询人员
        } else if (item === 'name2') {
          // 查询部门
        } else {
          // 查询公司
        }
      },
      increasePeo () {
        console.log(1)
      },
      increaseBm () {
        console.log(2)
      },
      increaseGs () {
        console.log(3)
      }
    },
    components: {
      listView
    }
  }
</script>

<style>

</style>
