<template>
  <div style="padding: 20px">
    <el-form ref="form" :model="form" :rules="rules"  label-width="80px" :size="this.GLOBAL.formSize()">
      <el-form-item label="常用标签">
        <div class="tag" v-for="item in reasonList" @click="handleSelect(item)"><el-tag>{{item}}</el-tag></div>
      </el-form-item>
      <el-form-item label="退回原因" prop="backReason">
        <el-input type="textarea" :rows="5" placeholder="请输入退回原因" v-model="form.backReason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="handleCance">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {submitBackVerifyReport} from '@/api/dicom'
  export default {
    name: "BackOrder",
    props:{
      parent:Object,
      orderId:Number
    },
    data(){
      return {
        submitLoading:false,
        reasonList:[],
        form:{
          backReason:''
        },
        rules: {
          backReason: [
            { required: true, message: '请填写退回原因', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.reasonList = this.GLOBAL.backOrderReason()
    },
    methods:{
      handleSelect(str){
        this.form.backReason+=str+' '
      },
      handleCance(){
        this.parent.$refs['backOrderBox'].closeDrawer()
      },
      onSubmit(){
        this.$confirm('确定要退回该报告?', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.submitLoading = true
              let parmas = Object.assign({}, this.form)
              parmas.orderId = this.orderId
              submitBackVerifyReport(parmas).then((res) => {
                this.submitLoading = false
                this.$message('业务单已取消')
                this.handleCance()
                this.parent.fetchData()
              }).catch(() => {
                this.submitLoading = false
              })
            }else{
              return false;
            }
          })
        })

      }
    }
  }
</script>

<style scoped>
  .tag{
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }
</style>
