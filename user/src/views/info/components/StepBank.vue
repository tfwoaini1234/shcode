<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" label-position="top">

      <el-form-item label="卡户名字">
        <el-input v-model="form.bankName"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号">
        <el-input v-model="form.bankNo"></el-input>
      </el-form-item>

      <el-form-item label="开户行">
        <el-input v-model="form.bankAddress"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getInfo,saveStep } from '@/api/user'
  export default {
    name: "StepBank",
    props:{
      parent:Object
    },
    data(){
      return {
        form:{}
      }
    },
    mounted(){
      this.fetchData();
    },
    methods:{
      fetchData(){
        getInfo().then(response => {
          const {user, detail} = response
          this.user = user
          this.detail = detail == null ? {} : detail;
          this.form = {
            ...this.user,
            ...this.detail
          }
        })
      },
      onSubmit(){
        this.form.isCheck = 1;
        saveStep(this.form).then(response => {
          console.log(response)
          this.parent.openStep(2)
        })
      }
    }
  }
</script>

<style scoped>

</style>
