<template>
  <div class="content">
    <div id="printMe">
      <h1 class="h1"><center>{{title}}</center></h1>
      <h2 class="h2"><center>检查报告单</center></h2>
      <hr>
      <div>
        <el-row>
          <el-col :span="8">
            <span class="item">姓名：{{item.patientName}}</span>
          </el-col>
          <el-col :span="8">
            <span class="item">性别：{{item.patientSex | sexFilter}}</span>
          </el-col>
          <el-col :span="8">
            <span class="item">年龄：{{item.patientBirthday | ageFilter}}</span>
          </el-col>
        </el-row>
        <br>
        <el-row class="row">
          <el-col :span="8">
            <span class="item">检查部位：{{item.orderCheckpointName}}</span>
          </el-col>
          <el-col :span="8">
            <span class="item">手机号：{{item.patientMobile}}</span>
          </el-col>
          <el-col :span="8">
            <span class="item">业务号：{{item.orderNo}}</span>
          </el-col>
        </el-row>
        <br>
        <el-row class="row">
          <el-col :span="12">
            <span class="item">上传日期：{{item.addTime}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item">报告日期：{{item.verifyTime}}</span>
          </el-col>

        </el-row>
      </div>

      <hr>
      <div>
        <h4 class="h3">影像所见</h4>
        <p class="remark">
          {{item.imagingView}}
        </p>
      </div>
      <div>
        <h4 class="h3">诊断意见</h4>
        <p class="remark">
          {{item.imagingVonclusion}}
        </p>
      </div>
      <br>
      <br>
      <div>
        <el-row>
          <el-col :span="12">
            报告医生：{{item.serviceUserName | fiterName}}
          </el-col>
          <el-col :span="12">
            审核医生：{{item.verifyUserName | fiterName}}
          </el-col>
        </el-row>

      </div>
      <hr>
    </div>
    <el-row>
      <el-button type="primary" size="small" v-print="'#printMe'">打印</el-button>
      <el-button size="small" @click="handleCance">取消</el-button>
    </el-row>
  </div>
</template>

<script>
  import Tools from '@/utils/tools'

  export default {
    name: "PrintTemplete",
    props:{
      parent:Object,
      item:Object
    },
    filters:{
      sexFilter(status) {
        const statusMap = {
          1: '男',
          2: '女',
          3: '未知'
        }
        return statusMap[status]
      },
      ageFilter(value){
        value = Tools.getAge(value)
        return value
      },
      fiterName(name){
        if(name && name!=''){
          name = name.substr(0,1)+'***'
        }
        return name
      }
    },
    data(){
      return{
        title:document.title
      }
    },
    methods:{
      handlePrint(){

      },
      handleCance(){
        this.parent.$refs['showPrintBox'].closeDrawer()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    padding: 20px;
    font-size: 14px;
    .item{
      padding: 0;
      display: inline-block;
    }
    .h1{
      text-align: center;
      font-size: 24px;
    }
    .h2{
      text-align: center;
      font-size: 18px;
    }
    .h3{
      font-size: 14px;
    }
    .remark{
      min-height: 100px;
      font-size: 16px;
    }
  }
</style>
