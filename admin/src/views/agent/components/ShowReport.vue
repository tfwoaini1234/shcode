<template>
  <div class="content">
    <div>
      <el-form  ref="form" label-position="top" label-width="100px">
        <el-form-item v-if="false" label="影像截图">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">

              <div class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </div>

            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="影像所见">
          <p class="text">{{item.imagingView}}</p>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="诊断意见" prop="imagingVonclusion">
          <p class="text">
            {{item.imagingVonclusion}}
          </p>
        </el-form-item>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label class="label">报告医生</label>
              <span class="name">{{item.serviceUserName | fiterName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label class="label">审核医生</label>
              <span class="name">{{item.verifyUserName | fiterName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label class="label">报告时间</label>
              <span class="name">{{item.serviceTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label class="label">审核时间</label>
              <span class="name">{{item.verifyTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-button v-if="false" size="small" @click="handleCance">取消</el-button>
    </el-row>
  </div>
</template>

<script>
  import {submitVerifyReport} from '@/api/dicom'
  import Tools from '@/utils/tools'
  import Cookies from 'js-cookie'

  export default {
    name: "ShowReport",
    props:{
      parent:Object,
      item:Object
    },
    filters:{
      fiterName(name){
        if(name && name!=''){
          name = name.substr(0,1)+'**'
        }
        return name
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        submitLoading:false
      }
    },
    mounted(){

    },
    methods:{
      handleCance(){
        this.parent.$refs['showOrderBox'].closeDrawer()
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    padding: 20px;
    font-size: 14px;
    overflow: auto;
    height: calc(100vh - 135px);
    .text{
      line-height: 20px;
      vertical-align: top;
      margin: 0;
      padding: 0;
    }
  }
  .label{
    font-size: 14px;
    color: #606266;
  }
  .name{
    margin-left: 10px;
  }
</style>
