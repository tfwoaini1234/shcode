<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.userRealName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input v-model="form.userMobile" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱">
        <el-input v-model="form.userEmail"></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="身份证正面">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="SFZZMFileList"
              :on-success="handleSFZZM"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeSFZZM">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证背面">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="SFZBMFileList"
              :on-success="handleSFZBM"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeSFZBM">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="10">

        <el-col :span="12">
          <el-form-item label="标准正脸照">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="ZNZFileList"
              :on-success="handleZNZ"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeZNZ">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历证">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="XLZFileList"
              :on-success="handleXLZ"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeXLZ">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
        </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="执业资格证">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="ZGZFileList"
              :on-success="handleZGZ"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeZGZ">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职称证">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="ZCZFileList"
              :on-success="handleZCZ"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeZCZ">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="专业技术资格证">
            <el-upload
              :limit="1"
              :headers="uploadHeaders"
              :action="postImgUrl"
              list-type="picture-card"
              :file-list="ZYJSZGZFileList"
              :on-success="handleZYJSZGZ"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeZYJSZGZ">

              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row :gutter="10">
      <el-form-item label="工作年限">
        <el-input-number
          v-model="form.workingSeniority"
          >
        </el-input-number>
      </el-form-item>
      <el-form-item label="技能范围">
        <el-checkbox-group @change="checkChange" v-model="checkList">
          <el-checkbox label="DR"></el-checkbox>
          <el-checkbox label="CT"></el-checkbox>
          <el-checkbox label="MIR"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      </el-row>
      <el-form-item label="个人擅长">
        <el-input type="textarea" :rows="5" v-model="form.skilled"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { getToken } from '@/utils/auth'
  import { getInfo,saveStep } from '@/api/user'
  import Tools from '@/utils/tools'

  export default {
    name: "StepInfo",
    props:{
      parent:Object
    },
    data(){
      return {
        postImgUrl:process.env.VUE_APP_BASE_API+"/doctor/upload/secure",
        showImgUrl:process.env.VUE_APP_BASE_API,
        showSecureImgUrl:process.env.VUE_APP_SECURE_URL,
        Loading:false,
        form:{},
        dialogImageUrl: '',
        dialogVisible: false,
        uploadHeaders:{
          Authentication:getToken(),
        platform: 'DOCTOR'
        },
        checkList:[],
        user:{},
        SFZZMFileList:[],
        SFZBMFileList:[],
        ZNZFileList:[],
        XLZFileList:[],
        ZGZFileList:[],
        ZCZFileList:[],
        ZYJSZGZFileList:[],
      }
    },
    mounted(){
      this.fetchData();
    },
    methods:{
      fetchData() {
        //let loadingObj = Loading.service({ fullscreen: true });
        getInfo().then(response => {
          const { user,detail } = response
          this.user = user
          this.detail = detail == null?{}:detail;
          this.form = {
            ...this.user,
            ...this.detail
          }
          let list = this.detail.skillRange.split(',').sort();
          for(var k in list){
            this.checkList.push(list[k]);
          }
          let img1 = this.detail.idCardFront.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.idCardFront+'?'+Tools.generateSecurePathHash("/"+this.detail.idCardFront):this.showImgUrl+'/'+this.detail.idCardFront;
          let img2 = this.detail.idCardBack.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.idCardBack+'?'+Tools.generateSecurePathHash("/"+this.detail.idCardBack):this.showImgUrl+'/'+this.detail.idCardBack;
          let img3 = this.detail.education.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.education+'?'+Tools.generateSecurePathHash("/"+this.detail.education):this.showImgUrl+'/'+this.detail.education;
          let img4 = this.detail.practicingQualificationCertificate.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.practicingQualificationCertificate+'?'+Tools.generateSecurePathHash("/"+this.detail.practicingQualificationCertificate):this.showImgUrl+'/'+this.detail.practicingQualificationCertificate;
          let img5 = this.detail.professionalCertificate.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.professionalCertificate+'?'+Tools.generateSecurePathHash("/"+this.detail.professionalCertificate):this.showImgUrl+'/'+this.detail.professionalCertificate;
          let img6 = this.detail.technicalQualificationCertificate.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.technicalQualificationCertificate+'?'+Tools.generateSecurePathHash("/"+this.detail.technicalQualificationCertificate):this.showImgUrl+'/'+this.detail.technicalQualificationCertificate;
          let img7 = this.detail.facePhoto.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.facePhoto+'?'+Tools.generateSecurePathHash("/"+this.detail.facePhoto):this.showImgUrl+'/'+this.detail.facePhoto;
          this.SFZZMFileList.push({name:'img1',path:img1})
          this.SFZBMFileList.push({name:'img2',path:img2})
          this.XLZFileList.push({name:'img3',path:img3})
          this.ZGZFileList.push({name:'img4',path:img4})
          this.ZCZFileList.push({name:'img5',path:img5})
          this.ZYJSZGZFileList.push({name:'img6',path:img6})
          this.ZNZFileList.push({name:'img7',path:img7})
          console.log(this.checkList)
          //loadingObj.close()
        })
      },
      handleSFZBM(response, file, fileList){
        this.form.idCardBack = response.path;
      },
      handleSFZZM(response, file, fileList){
        this.form.idCardFront = response.path;
      },
      handleZNZ(response, file, fileList){
        this.form.facePhoto = response.path;
      },
      handleXLZ(response, file, fileList){
        this.form.education = response.path;
      },
      handleZGZ(response, file, fileList){
        this.form.practicingQualificationCertificate = response.path;
      },
      handleZCZ(response, file, fileList){
        this.form.professionalCertificate = response.path;
      },
      handleZYJSZGZ(response, file, fileList){
        this.form.technicalQualificationCertificate = response.path;
      },
      removeSFZBM(response, file, fileList){
        this.form.idCardBack = "";
      },
      removeSFZZM(response, file, fileList){
        this.form.idCardFront = "";
      },
      removeZNZ(response, file, fileList){
        this.form.facePhoto = "";
      },
      removeXLZ(response, file, fileList){
        this.form.education = "";
      },
      removeZGZ(response, file, fileList){
        this.form.practicingQualificationCertificate = "";
      },
      removeZCZ(response, file, fileList){
        this.form.professionalCertificate = "";
      },
      removeZYJSZGZ(response, file, fileList){
        this.form.technicalQualificationCertificate = "";
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      checkChange(res){
        this.form.skillRange = res.join(',');
      },
      onSubmit(){
        console.log('asdasdasdas')
        //this.parent.openStep(1)
        this.form.isCheck = 0;
        saveStep(this.form).then(response => {
            console.log(response)
          this.parent.openStep(1)
        })
      }
    }
  }
</script>

<style scoped>

</style>
