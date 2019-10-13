<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">系统设置</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="账户密码" name="first">
          <el-row :gutter="20">
            <el-col :span="12">
              <change-pass></change-pass>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="偏好设置" name="second">
          <el-row :gutter="20">
            <el-col :span="12">
              <preference></preference>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import ChangePass from "./components/ChangePass";
  import Preference from "./components/Preference";
  export default {
    components: {Preference, ChangePass},
    data() {
      return {
        activeName: 'first',
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
