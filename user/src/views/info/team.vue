<template>
  <div class="main-box bg">

    <div class="info-box">
      <el-row :gutter="20">
        <el-col :span="16">
          <content-title title="医院信息"></content-title>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form  label-width="120px" size="mini">
            <el-form-item label="ID">
              <label>{{item.organizationId}}</label>
            </el-form-item>
            <el-form-item label="医院名字">
              <label>{{item.organizationName}}</label>
            </el-form-item>
            <el-form-item label="联系电话">
              <label>{{item.organizationPhone}}</label>
            </el-form-item>
            <el-form-item label="联系地址">
              <label>{{item.organizationAddress}}</label>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-width="120px" size="mini">
            <el-form-item label="注册时间">
              <label>{{item.createTime}}</label>
            </el-form-item>
            <el-form-item label="联系人">
              <label>{{item.organizationContacts}}</label>
            </el-form-item>
            <el-form-item label="状态">
              <label>{{item.organizationStatus==1?'正常':'锁定'}}</label>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  import { getInfo } from '@/api/hospital'
  import ContentTitle from '@/components/ContentTitle'
  export default {
    components:{
      ContentTitle
    },
    data() {
      return {
        defaultAvatar:this.GLOBAL.defaultAvatar,
        item: {

        }
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        let loadingObj = Loading.service({ fullscreen: true });
        getInfo().then(response => {
          this.item = response
          loadingObj.close()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg{
    background-color: #F6F8FC;
  }
  .base{
    background-color: #ffffff;
    overflow: hidden;
    padding-bottom: 20px;
    .avatar {
      float: left;
      width: 100px;
      height: 100px;
    }
    .info{
      word-break: break-all;
      margin: 0 0 0 120px;
      padding: 0;
      border: 0;
      outline: 0;
      font-size: 100%;
      dt{
        color: #5e7be4;
        font-size: 14px;
        margin-bottom: 10px;
        margin: 0;
      }
      dd{
        line-height: 150%;
        margin: 0;
        color: #666666;
        .item_label{
          display: inline-block;
          text-align: right;
          color: grey;
          font-size: 14px;
        }
      }
    }
  }
  .info-box{
    margin-top: 10px;
    padding-top: 10px;
    background-color: #ffffff;
  }
</style>

