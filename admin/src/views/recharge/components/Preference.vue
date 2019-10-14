<template>
  <el-form :model="ruleForm" :size="formSize" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="分页数量" prop="region">
      <el-select v-model="ruleForm.pageType" placeholder="请选择默认分页数量">
        <el-option v-for="item in pages" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="列表大小" prop="region">
      <el-select v-model="ruleForm.listSize" placeholder="请选择表格显示大小">
        <el-option label="大" value="medium"></el-option>
        <el-option label="中" value="small"></el-option>
        <el-option label="小" value="mini"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="分页模板" prop="region">
      <el-radio v-model="ruleForm.pageTmpType" label="0" border>简介样式</el-radio>
      <el-radio v-model="ruleForm.pageTmpType" label="1" border>普通样式</el-radio>
      <el-radio v-model="ruleForm.pageTmpType" label="2" border>详细样式</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveClick">保存</el-button>
      <el-button @click="setDefaultClick">默认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Preference",
    data() {
      return {
        formSize:this.GLOBAL.formSize(),
        pages:this.GLOBAL.pageSizesList,
        ruleForm: {
          pageType: '16',
          listSize: 'mini',
          formSize: 'mini',
          pageTmpType:'1'
        }
      }
    },
    methods:{
      saveClick(){
        this.formSize = this.ruleForm.formSize;
        this.GLOBAL.saveSetting(JSON.stringify(this.ruleForm));
      },
      setDefaultClick(){
        this.ruleForm= {
          pageType: '16',
          listSize: 'mini',
          formSize: 'mini',
          pageTmpType:'1'
        }
        this.GLOBAL.saveSetting(JSON.stringify(this.ruleForm));
      }
    }
  }
</script>

<style scoped>

</style>
