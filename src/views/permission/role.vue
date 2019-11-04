<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新建角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色标识" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.roleDesc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          <el-button type="info" size="small" @click="handleAuthorize(scope)">权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增、编辑角色 -->
    <el-dialog v-loading="dialogLoading" :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新建角色'" show-close>
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.roleDesc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancelRole">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>

    <!-- 权限设置 -->
    <el-dialog v-loading="dialogLoading" :visible.sync="authorizeVisible" title="分配权限" show-close>
      <el-tree
        ref="tree"
        :check-strictly="checkStrictly"
        :data="menusList"
        :props="defaultProps"
        :default-checked-keys="defaultCheckedKeys"
        show-checkbox
        node-key="id"
        class="permission-tree"
        highlight-current
      />
      <div style="text-align:right;">
        <el-button type="danger" @click="cancelAuthorize">取消</el-button>
        <el-button type="primary" @click="confirmAuthorize">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
// import { deepClone } from '@/utils'
import { getRoutes, getRoles, deleteRole, updateRole, updateRoleAuthority } from '@/api/role'
import { getMenus, getMenuIdsByRoles } from '@/api/menu'
import { getCommonData } from '@/utils/commonData.js'
import store from '@/store'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      // role: Object.assign({}, defaultRole),
      role: {},
      routes: [],
      rolesList: [],
      dialogVisible: false,
      authorizeVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menusList: [],
      defaultCheckedKeys: [],
      dialogLoading: false
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.getRoles()
    this.getMenus()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      console.log('getRoutes:', res)
      this.routes = this.generateRoutes(res.data)
    },
    // 查询所有角色
    async getRoles() {
      const sysRole = {}
      const singleBody = sysRole
      const reqParams = {
        singleBody: singleBody
      }
      const params = getCommonData(reqParams)
      const res = await getRoles(params)
      console.log('getRoles...res:', res)
      if (res.body) {
        this.rolesList = res.body.listBody
      }
    },
    // 查询所有菜单
    async getMenus() {
      const roles = store.getters.roles
      console.log('roles:', roles)
      const singleBody = {}
      const reqParams = {
        singleBody: singleBody
      }
      const params = getCommonData(reqParams)
      const res = await getMenus(params)
      this.menusList = res.body.listBody
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async handleEdit(scope) {
      this.dialogLoading = true
      this.dialogType = 'edit'
      this.dialogVisible = true
      // this.checkStrictly = true
      this.defaultCheckedKeys = []
      this.role = scope.row

      const roles = [scope.row.roleCode]
      console.log('roles:', roles)
      const singleBody = {
        roles: roles
      }
      const reqParams = {
        singleBody: singleBody
      }
      const params = getCommonData(reqParams)
      const res = await getMenuIdsByRoles(params)
      this.defaultCheckedKeys = res.body.listBody
      console.log('this.defaultCheckedKeys:', this.defaultCheckedKeys)
      this.dialogLoading = false
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      this.dialogLoading = true
      const isEdit = this.dialogType === 'edit'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      console.log('checkedKeys:', checkedKeys)
      if (isEdit) {
        const singleBody = this.role
        const reqParams = {
          singleBody: singleBody,
          userId: localStorage.getItem('userId')
        }
        const params = getCommonData(reqParams)
        await updateRole(params)
        this.dialogVisible = false
      }
      this.dialogLoading = false
      this.$message({
        message: '更新成功！',
        type: 'success'
      })
      return

      // const checkedKeys = this.$refs.tree.getCheckedKeys()
      // this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      // if (isEdit) {
      //   await updateRole(this.role.key, this.role)
      //   for (let index = 0; index < this.rolesList.length; index++) {
      //     if (this.rolesList[index].key === this.role.key) {
      //       this.rolesList.splice(index, 1, Object.assign({}, this.role))
      //       break
      //     }
      //   }
      // } else {
      //   const { data } = await addRole(this.role)
      //   this.role.key = data.key
      //   this.rolesList.push(this.role)
      // }

      // const { description, key, name } = this.role
      // this.dialogVisible = false
      // this.$notify({
      //   title: 'Success',
      //   dangerouslyUseHTMLString: true,
      //   message: `
      //       <div>Role Key: ${key}</div>
      //       <div>Role Name: ${name}</div>
      //       <div>Description: ${description}</div>
      //     `,
      //   type: 'success'
      // })
    },
    cancelRole() {
      this.role = {}
      this.defaultCheckedKeys = []
      this.dialogVisible = false
      // this.$refs.tree.setCheckedNodes([])
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },
    // 权限
    async handleAuthorize(scope) {
      this.dialogLoading = true
      this.role = scope.row

      const roles = [scope.row.roleCode]
      console.log('roles:', roles)
      const singleBody = {
        roles: roles
      }
      const reqParams = {
        singleBody: singleBody
      }
      const params = getCommonData(reqParams)
      const res = await getMenuIdsByRoles(params)
      this.defaultCheckedKeys = res.body.listBody
      this.authorizeVisible = true
      this.dialogLoading = false
    },
    cancelAuthorize() {
      this.authorizeVisible = false
      this.defaultCheckedKeys = []
      this.$refs.tree.setCheckedNodes([])
    },
    async confirmAuthorize() {
      this.dialogLoading = true
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      console.log('checkedKeys:', checkedKeys)
      const singleBody = {
        roleId: this.role.roleId
      }
      const reqParams = {
        singleBody: singleBody,
        listBody: checkedKeys,
        userId: localStorage.getItem('userId')
      }
      const params = getCommonData(reqParams)
      await updateRoleAuthority(params)
      this.$refs.tree.setCheckedNodes([])
      this.authorizeVisible = false
      this.dialogLoading = false
      this.$message({
        message: '更新成功！',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
