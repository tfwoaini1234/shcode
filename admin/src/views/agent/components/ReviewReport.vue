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
          <el-input v-if="fiterReviewReport(item.verifyUserId)" type="textarea" :rows="5" v-model="form.imagingView"></el-input>
          <p class="txt" v-else>{{form.imagingView}}</p>
        </el-form-item>
        <el-form-item label="诊断意见" prop="imagingVonclusion">
          <el-input v-if="fiterReviewReport(item.verifyUserId)" type="textarea" :rows="5" v-model="form.imagingVonclusion"></el-input>
          <p class="txt" v-else>{{form.imagingVonclusion}}</p>
        </el-form-item>
        <el-form-item>
          <label class="label">报告医生</label>
          <span class="name">{{item.serviceUserName | fiterName}}</span>
        </el-form-item>
        <el-form-item v-if="fiterReviewReport(item.verifyUserId)" >
          <label style="font-size: 12px;font-weight: normal;color: #666666">{{timeStep}}秒自动缓存填写内容,上次保存时间：{{saveTime}}</label>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button v-if="fiterReviewReport(item.verifyUserId)" type="primary" size="small" @click="handleSubmit">确认审核</el-button>
      <el-button v-if="false" size="small" @click="handleCance">取消</el-button>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {submitVerifyReport} from '@/api/dicom'
  import Tools from '@/utils/tools'
  import Cookies from 'js-cookie'

  export default {
    name: "ReviewReport",
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
        initState:true,
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
            { required: true, message: '请输入影像所见', trigger: 'blur' }
          ],
          imagingView: [
            { required: true, message: '请输入诊断意见', trigger: 'blur' }
          ]
        },
        imagingVonclusionCacheKey:'',
        imagingViewCacheKey:''
      }
    },
    mounted(){
      this.imagingVonclusionCacheKey='medical_client_review_imaging_vonclusion_'+this.orderId
      this.imagingViewCacheKey='medical_client_review_imaging_view_'+this.orderId

      this.init()
    },
    methods:{
      init(){
        let item = Object.assign({},this.item)
        let imagingVonclusion = this.initState? item.imagingVonclusion:Cookies.get(this.imagingVonclusionCacheKey)
        let imagingView = this.initState?item.imagingView:Cookies.get(this.imagingViewCacheKey)
        imagingVonclusion = imagingVonclusion!='undefined'?imagingVonclusion:''
        imagingView = imagingView!='undefined'?imagingView:''

        this.form.imagingVonclusion = imagingVonclusion
        this.form.imagingView =  imagingView
        this.initState = false
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
        this.parent.$refs.reviewBox.closeDrawer()
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
        this.$confirm('确定要提交审核报告吗，提交成功后则不能再修改?', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.submitLoading = true
              let parmas = Object.assign({}, this.form)
              parmas.orderId = this.item.orderId
              submitVerifyReport(parmas).then((res) => {
                this.$message('报告已提交')
                this.clearCache()
                this.parent.fetchData()
              }).catch(() => {
                this.submitLoading = false
              })
            }else{
              return false
            }
          })
        })
      },
      fiterReviewReport(verifyUserId){
        if(verifyUserId && this.userInfo.userId==verifyUserId) {
          return true
        }else{
          return false
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
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
  .label{
    font-size: 14px;
    color: #606266;
  }
  .name{
    margin-left: 10px;
  }
  .txt{
    line-height: 20px;
  }
</style>
