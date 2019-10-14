<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">消息中心</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">

          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card"  @tab-click="handleClick">
        <el-tab-pane label="全部消息" name="first">
          <all-list ref="msgAll" :msg-type="0"></all-list>
        </el-tab-pane>
        <el-tab-pane label="业务消息" name="second">
          <all-list ref="msgBusiness" :msg-type="2"></all-list>
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="last">
          <all-list ref="msgSystem" :msg-type="1"></all-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>


  import AllList from "./components/AllList"
  export default {
    components: {AllList},
    data() {
      return {
        activeName: 'first',
        list: null,
        listLoading: true
      }
    },
    created() {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name)
        switch(tab.name){
          case 'first':
            this.$refs.msgAll.fetchData()
            break;
          case 'second':
            this.$refs.msgBusiness.fetchData()
            break;
          case 'last':
            this.$refs.msgSystem.fetchData()
            break;
        }
      }
    }
  }
</script>
