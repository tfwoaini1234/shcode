<template>
  <div style="padding: 20px">
    <el-form ref="form" :model="form" :rules="rules"  label-width="80px" :size="this.GLOBAL.formSize()">
      <el-form-item label="常用标签">
        <div class="tag" v-for="item in reasonList" @click="handleSelect(item)"><el-tag>{{item}}</el-tag></div>
      </el-form-item>
      <el-form-item label="取消原因" prop="cancelReason">
        <el-input type="textarea" :rows="5" placeholder="请输入取消原因" v-model="form.cancelReason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="handleCance">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {canceDicom} from '@/api/dicom'
  export default {
    name: "CanceOrder",
    props:{
      parent:Object,
      orderId:Number
    },
    data(){
      return {
        submitLoading:false,
        reasonList:[],
        form:{
          cancelReason:''
        },
        rules: {
          cancelReason: [
            { required: true, message: '请填写取消原因', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.reasonList = this.GLOBAL.canceOrderReason()
    },
    methods:{
      handleSelect(str){
        this.form.cancelReason+=str+' '
      },
      handleCance(){
        this.parent.$refs.canceBox.closeDrawer()
      },
      onSubmit(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            let parmas = Object.assign({}, this.form)
            parmas.orderId = this.orderId
            canceDicom(parmas).then((res) => {
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
