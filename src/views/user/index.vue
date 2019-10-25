<style lang="scss" scoped>
.app-container {
}
</style>
<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddUser">新增用户</el-button>

    <el-table :data="userList" border>
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">{{ scope.row.realName }}</template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">{{ scope.row.mobileNo }}</template>
      </el-table-column>
      <el-table-column align="center" label="微信号">
        <template slot-scope="scope">{{ scope.row.wechatNo }}</template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增、编辑用户 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'编辑':'新增'"
      show-close
      v-loading="dialogLoading"
    >
      <el-form :model="userInfo" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userInfo.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.mobileNo" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userRoleIdList" multiple placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancelUser">取消</el-button>
        <el-button type="primary" @click="confirmUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers } from "@/api/user";
import { getCommonData } from "@/utils/commonData.js";
import { getRoles, getRolesByUserId } from "@/api/role";
export default {
  name: "User",
  data() {
    return {
      userList: [],
      dialogVisible: false,
      dialogLoading: false,
      userInfo: {},
      dialogType: "",
      userRoleIdList: [],
      roleList: []
    };
  },
  created() {
    this.queryUsers();
    this.getRoles();
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    async queryUsers() {
      const singleBody = {};
      const reqParams = {
        singleBody: singleBody
      };
      const params = getCommonData(reqParams);
      const res = await getUsers(params);
      this.userList = res.body.listBody;
    },
    // 查询所有角色
    async getRoles() {
      const sysRole = {};
      const singleBody = sysRole;
      const reqParams = {
        singleBody: singleBody
      };
      const params = getCommonData(reqParams);
      const res = await getRoles(params);
      this.roleList = res.body.listBody;
    },
    handleAddUser() {},
    // 编辑
    async handleEdit(scope) {
      this.dialogLoading = true;
      //查询用户角色信息
      const sysUser = {
        userId: scope.row.userId
      };
      const singleBody = sysUser;
      const reqParams = {
        singleBody: singleBody
      };
      const params = getCommonData(reqParams);
      const res = await getRolesByUserId(params);
      let roles = res.body.listBody;

      for (let role of roles) {
        this.userRoleIdList.push(role.roleId);
      }

      console.log("this.userRoleIdList:", this.userRoleIdList);
      console.log("this.roleList:", this.roleList);
      this.userInfo = scope.row;
      this.dialogVisible = true;
      this.dialogLoading = false;
    },
    // 删除
    handleDelete(scope) {},
    // 取消
    cancelUser() {
      this.dialogVisible = false;
    },
    // 确定
    confirmUser() {
      this.dialogVisible = false;
    }
  }
};
</script>