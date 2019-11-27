<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">购买激活码</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="购买" name="first">
          <el-row :gutter="20">
            <el-col :span="12">
              <add-amount></add-amount>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="购买记录" name="second">
              <list></list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import AddAmount from "./components/AddAmount";
  import Preference from "./components/Preference";
  import List from "./components/List"
  export default {
    components: {Preference, AddAmount,List},
    data() {
      return {
        activeName: 'first'
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
