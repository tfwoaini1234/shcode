<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-page-header title="返回" @back="goBack" content="消息详情">
          </el-page-header>

        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
            &nbsp;
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="detail-title">
        <h4>{{title}}</h4>
        <div class="data">{{datetime}}</div>
      </div>
      <div class="detail-value">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
  import {getItem,readItems } from '@/api/message'

  export default {
    name: "show",
    data() {
      return {
        message:'',
        title:'',
        datetime:'',
        drawer: false,
        direction: 'rtl',
      };
    },
    mounted(){
      this.featchData()
    },
    methods: {
      featchData(){
        let id = this.$route.params.id
        getItem(id).then((response)=>{
          const {message,title,createTime} = response
          this.title = title
          this.datetime = createTime.replace('T',' ')
          this.message = message
        })
      },
      goBack(){
        this.$router.push({ path:'/message/index'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    border: 1px solid #f4f4f4;
    padding: 20px;
    .detail-title{
      text-align: center;
    }
    .data{
      font-size: 14px;
      color: #666666;
    }
    .detail-value{
      margin-top: 20px;
      border-top:1px solid #d0d0d0;
      padding-top:20px;
    }
  }
</style>
