<template>
  <div>
    <div class="header">
      <el-row>
        <el-col :span="12">
          <div style="text-align: left;width: 300px">
            <div class="sidebar-logo-container">
              <img src="@/assets/logo.png" class="sidebar-logo">
              <span class="sidebar-title">
                <img src="@/assets/title.png">
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="top-box-right align-right">
            <el-button type="primary" size="mini" @click="loginOut" plain>注销</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 0 100px;" v-if="user.userCheckStatus == 4 && step !=2">
      <el-alert
        center
        :title="mark"
        type="error"
        :closable="false">
      </el-alert>
    </div>

    <div class="content">

      <el-steps :active="step" align-center finish-status="success" process-status="finish">
        <el-step title="确认基本信息" description="请确定个人信息是否正确">
        </el-step>
        <el-step title="开户信息" description="请输入自己资质信息"></el-step>
        <el-step title="等待验证" description="等待团队机构管理员审核"></el-step>
      </el-steps>
      <div class="form-box">
      <el-row>
        <el-col>
          <step-info v-if="step==0" :parent="this"></step-info>
          <step-bank v-if="step==1" :parent="this"></step-bank>
          <step-check v-if="step==2"></step-check>
        </el-col>
      </el-row>
      </div>
    </div>

  </div>
</template>

<script>
  import SidebarLogo from "@/layout/components/Sidebar/Logo"
  import StepInfo from "./components/StepInfo"
  import StepBank from "./components/StepBank"
  import StepCheck from "./components/StepCheck";
  import { getInfo } from '@/api/user'

  export default {
    name: "doctor",
    components: {StepCheck, StepBank, StepInfo, SidebarLogo},
    data(){
      return {
        title:'',
        step:0,
        mark:'',
        user:{}
      }
    },
    mounted(){
      this.fetchData();
    },
    methods:{
      fetchData() {
        getInfo().then(response => {
          const { user } = response
          this.user = user
          console.log('11111111111111111111111111111111111')
          console.log(this.user)
          if(this.user.userCheckStatus == 1){
            this.openStep(0);
          }
          if(this.user.userCheckStatus == 2){
            this.openStep(2);
          }
          if(this.user.userCheckStatus == 4){
            this.openStep(0);
            this.mark = this.user.userCheckMark;
          }
        })
      },
      openStep(step){
        this.step = step
      },
      async loginOut(){
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid #e0e0e0;
    .sidebar-logo-container {
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #FFFFFF;
      text-align: left;
      overflow: hidden;
      padding-left: 20px;
      & .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right:0;
      }
      & .sidebar-title {
        display: inline-block;
        margin: 0 0 0 5px;
        font-weight: 500;
        line-height: 50px;
        img{
          height: 28px;
          vertical-align: middle;
        }
      }

    }
    .top-box-right{
      height: 50px;
      line-height: 50px;
      padding-right: 10px;
    }
  }
  .content{
    width: 1200px;
    margin: 0 auto;
    margin-top: 100px;
  }
  .form-box{
    width: 800px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 100px;
  }
</style>
