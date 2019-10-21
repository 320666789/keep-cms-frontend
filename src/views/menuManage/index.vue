<style lang="scss">
  @import "./style.scss";
</style>
<template>
  <div class="menu-manage-container">
    <el-button type="primary" @click="addMenu">新增</el-button>

    <el-table :data="menuList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增、编辑、详情弹出框 -->
    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="menuDict" label-width="80px" label-position="left">
        <el-form-item label="菜单名称">
          <el-input v-model="menuDict.menuName" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-select v-model="menuDict.menuType" placeholder="请选择菜单类型">
            <el-option
              v-for="item in menuTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input v-model="menuDict.sort" placeholder="排序值" />
        </el-form-item>
        <el-form-item label="权限级别">
          <el-select v-model="menuDict.accredit" placeholder="请选择权限级别">
            <el-option
              v-for="item in accreditList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限标识">
          <el-input v-model="menuDict.permission" placeholder="菜单权限标识" />
        </el-form-item>
        <el-form-item label="前端URL">
          <el-input v-model="menuDict.frontendUrl" placeholder="前端URL" />
        </el-form-item>
        <el-form-item label="请求链接">
          <el-input v-model="menuDict.requestUrl" placeholder="请求链接" />
        </el-form-item>
        <el-form-item label="请求方法">
          <el-select v-model="menuDict.requestMethod" placeholder="请选择请求方法">
            <el-option
              v-for="item in requestMethodList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menuDict.icon" placeholder="图标" />
        </el-form-item>
        <el-form-item label="有效">
          <el-radio-group v-model="menuDict.validFlag">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCommonData } from '@/utils/commonData.js'
import { addMenu } from '@/api/menuManage'
export default {
  name: 'MenuManage',
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: '',
      menuDict: {
        validFlag: '1'
      },
      menuTypeList: [
        {
          value: '0',
          label: '菜单'
        },
        {
          value: '1',
          label: '按钮'
        }
      ],
      accreditList: [
        {
          value: '0',
          label: '普通权限'
        },
        {
          value: '1',
          label: '超级权限'
        }
      ],
      requestMethodList: [
        {
          value: 'POST',
          label: 'POST'
        },
        {
          value: 'GET',
          label: 'GET'
        }
      ],
      menuList: []
    }
  },
  watch: {
  },
  created() {
    init()
  },
  mounted() {
  },
  destroyed() {},
  methods: {
    init() {

    },
    queryMenuList() {

    },
    addMenu() {
      this.menuDict = {
        validFlag: '1'
      }
      this.dialogVisible = true
    },
    confirm() {
      const _self = this
      const singleBody = _self.menuDict
      const params = {
        singleBody: singleBody
      }
      const commonData = getCommonData(params)
      addMenu(commonData).then(res => {
        console.log('1111111111111111')
      })
    }
  }
}
</script>
