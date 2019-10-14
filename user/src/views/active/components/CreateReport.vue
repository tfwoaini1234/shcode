<template>
  <div class="content">
    <div>
      <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="100px">
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
        <el-form-item label="影像所见" prop="imagingView">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="form.imagingView"></el-input>
        </el-form-item>
        <el-form-item label="诊断意见" prop="imagingVonclusion">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="form.imagingVonclusion"></el-input>
        </el-form-item>
        <el-form-item>
          <label style="font-size: 12px;font-weight: normal;color: #666666">{{timeStep}}秒自动缓存填写内容,上次保存时间：{{saveTime}}</label>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button type="primary" size="small" @click="handleSubmit">提交报告</el-button>
      <el-button size="small" v-if="false" @click="handleCance">取消</el-button>
    </el-row>
  </div>
</template>

<script>
  import {submitReport} from '@/api/dicom'
  import Tools from '@/utils/tools'
  import Cookies from 'js-cookie'

  export default {
    name: "CreateReport",
    props:{
      parent:Object,
      orderId:Number
    },
    data() {
      return {
        timeStep:5,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        submitLoading:false,
        saveTime:Tools.dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss'),
        form: {
          imagingVonclusion:'',
          imagingView:''
        },
        rules: {
          imagingVonclusion: [
            { required: true, message: '请输入诊断意见', trigger: 'blur' }
          ],
          imagingView: [
            { required: true, message: '请输入影像所见', trigger: 'blur' }
          ]
        },
        imagingVonclusionCacheKey:'',
        imagingViewCacheKey:''
      }
    },
    mounted(){
      this.imagingVonclusionCacheKey='medical_client_imaging_vonclusion_'+this.orderId
      this.imagingViewCacheKey='medical_client_imaging_view_'+this.orderId
      this.init()
    },
    methods:{
      init(){
        let imagingVonclusion =  Cookies.get(this.imagingVonclusionCacheKey)
        let imagingView = Cookies.get(this.imagingViewCacheKey)
        imagingVonclusion = imagingVonclusion!='undefined'?imagingVonclusion:''
        imagingView = imagingView!='undefined'?imagingView:''

        this.form.imagingVonclusion = imagingVonclusion
        this.form.imagingView =  imagingView

        setInterval(()=>{
          if(this.timeStep>0){
            this.timeStep--
          }else {
            //5秒自动保存
            Cookies.set(this.imagingVonclusionCacheKey, this.form.imagingVonclusion)
            Cookies.set(this.imagingViewCacheKey, this.form.imagingView)
            this.saveTime = Tools.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss')
            this.timeStep=5
          }
        },1000)
      },
      clearCache(){
        Cookies.set(this.imagingVonclusionCacheKey, '')
        Cookies.set(this.imagingViewCacheKey, '')
      },
      handleCance(){
        this.parent.$refs.reportBox.closeDrawer()
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
      },
      handleSubmit(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            let parmas = Object.assign({}, this.form)
            parmas.orderId = this.orderId
            submitReport(parmas).then((res) => {
              this.$message('报告已提交')
              this.clearCache()
              this.parent.fetchData()
            }).catch(() => {
              this.submitLoading = false
            })
          }else{
            this.$message.warning('请填写内容')
            return false
          }
        })
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
  }
</style>
