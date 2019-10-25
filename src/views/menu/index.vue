<style lang="scss" scoped>
.app-container {
//   .roles-table {
//     margin-top: 30px;
//   }
//   .permission-tree {
//     margin-bottom: 30px;
//   }
}
</style>
<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddMenu">新建菜单</el-button>

    <div class="menu-tree">
      <el-tree :data="menuTree" node-key="id">
        <span slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => addMenu(data)">新增</el-button>
            <el-button type="text" size="mini" @click="() => deleteMenu(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getMenus } from '@/api/menu'
import { getCommonData } from '@/utils/commonData.js'
export default {
  name: "Menu",
  data() {
      return {
          menuTree: []
      }
  },
  created() {
    this.queryAllMenus()
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
      async queryAllMenus(){
        const singleBody = {}
        const reqParams = {
            singleBody: singleBody
        }
        const params = getCommonData(reqParams)
        const res = await getMenus(params)
        this.menuTree = res.body.listBody
      },
      // 新增菜单
      handleAddMenu(){

      },
      // addMenu
      addMenu(data){
          console.log('data:', data)
      },
      // deleteMenu
      deleteMenu(node, data){
        console.log('node, data:', node, data)
      }
  }
};
</script>