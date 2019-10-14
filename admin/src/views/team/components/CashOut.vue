<template>
  <div class="main-box" id="editBox">
    <el-form ref="form" label-width="120px" :size="this.GLOBAL.formSize()">
      <el-form-item label="可提现金额">
        <label>{{form.userWallet == undefined?'0.00':form.userWallet.toFixed(2)}}元</label>
      </el-form-item>
      <el-form-item label="本次提现金额">
        <el-input-number v-model="form.amount" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="submitLoading">保存</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {cashOut } from '@/api/team'
  import { Loading } from 'element-ui'
  export default {
    name: "edit",
    props:{
      parent:Object,
      item:Object
    },
    data(){
      return{
        submitLoading: false,
        roleList:[],
        form:{
        }
      }
    },
    mounted(){
     this.fetchData()
    },
    methods:{
      fetchData(){
        let loadingInstance = Loading.service({target:'#editBox'});
        let formItem = {
          amount:''
          }
        this.form = Object.assign(formItem,this.item)
        loadingInstance.close()
      },
      onSubmit(){
        //this.submitLoading = true
        let param ={
          userId:this.form.userId,
          amount:this.form.amount
        }
        cashOut(param).then(()=>{
          this.submitLoading = false
          this.parent.fetchTree()
          this.$message('提现成功')
          let formItem = {
            amount:'',
            userWallet:this.form.userWallet - this.form.amount
          }
          this.form = formItem;
          setTimeout(()=>{
            this.parent.$refs.cashOutBox.closeDrawer()
          },500)
        })
      },
      onCancel(){
        this.parent.$refs.cashOutBox.closeDrawer()
      }
    }
  }
</script>

<style scoped>

</style>
