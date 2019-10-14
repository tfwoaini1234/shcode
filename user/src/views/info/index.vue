<template>
  <div class="main-box bg">
    <section  class="base">
      <div  class="avatar">
        <img v-if="user.avatar && user.avatar!=''" width="90" :src="user.avatar"/>
        <img v-else src="@/assets/face.png"  width="90" />
      </div>
      <dl class="info">
        <dt >
          {{user.userRealName}}
          <button @click="toSetting()"  type="button" class="el-button el-button--text el-button--mini">
            <i class="el-icon-edit-outline"></i>
            <span>修改密码</span>
          </button>
        </dt>
        <dd >
          <span  class="item_label">手机号：</span>{{user.userMobile}}
        </dd>
        <dd ><span  class="item_label">擅长：</span>{{detail.skillRange}}
        </dd>
        <dd ><span  class="item_label">简介：</span>
        </dd>
      </dl>
      <!--<div style="padding: 20px 10px">-->
        <!--<el-alert-->
          <!--type="warning"-->
          <!--show-icon>-->
          <!--<span solt="title">您还未办理多点执业，请尽快到 <a href="#" target="_blank" style="text-decoration: underline;font-weight: bold">此处</a> 提交信息</span>-->
        <!--</el-alert>-->
      <!--</div>-->
    </section>
    <div class="info-box">
      <el-row :gutter="20">
        <el-col :span="16">
          <content-title title="基本信息"></content-title>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form  label-width="120px" size="mini">
            <el-form-item label="ID">
              <label>{{user.userId}}</label>
            </el-form-item>
            <el-form-item label="姓名">
              <label>{{user.userRealName}}</label>
            </el-form-item>
            <el-form-item label="手机号">
              <label>{{user.userMobile}}</label>
            </el-form-item>
            <el-form-item label="邮箱">
              <label>{{user.userEmail}}</label>

            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-width="120px" size="mini">
            <el-form-item label="注册时间">
              <label>{{user.createTime}}</label>
            </el-form-item>
            <el-form-item label="上次登录时间">
              <label>{{user.loginTime}}</label>
            </el-form-item>
            <el-form-item label="登录次数">
              <label>{{user.loginCount}}</label>
            </el-form-item>
            <el-form-item label="上次登录地点">
              <label>({{user.loginIp}}) {{user.loginAddress}}</label>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <content-title title="专业信息"></content-title>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form  label-width="120px" size="mini">
            <el-form-item label="身份证">
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="znzurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>
            </el-form-item>
            <el-form-item label="身份证">
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="sfzzmurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="sfzbmurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>
            </el-form-item>
            <el-form-item label="执业资格证">
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="zgzurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>

            </el-form-item>
            <el-form-item label="专业技术资格证">
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="zyjszgzurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>

            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form  label-width="120px" size="mini">

            <el-form-item label="学历证">
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="xlzurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>

            </el-form-item>
            <el-form-item label="职称证">
              <div class="img-item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="zczurl"
                  :preview-src-list="srcList"
                  fit="contain"></el-image>
              </div>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col  :span="12">
          <el-form label-width="120px" size="mini">
            <el-form-item label="执业年限">
              <label>{{detail.workingSeniority}}</label>
            </el-form-item>
            <el-form-item label="个人擅长">
              <label>{{detail.skilled}}</label>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--开户信息-->
      <el-row :gutter="20">
        <el-col :span="16">
          <content-title title="开户信息"></content-title>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form  label-width="120px" size="mini">
            <el-form-item label="开户名字">
              <label>{{detail.bankName}}</label>
            </el-form-item>
            <el-form-item label="银行卡号">
              <label>{{detail.bankNo}}</label>
            </el-form-item>
            <el-form-item label="开户行">
              <label>{{detail.bankAddress}}</label>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  import { getInfo } from '@/api/user'
  import ContentTitle from '@/components/ContentTitle'
  import Tools from '@/utils/tools'
  export default {
    components:{
      ContentTitle
    },
    data() {
      return {
        showImgUrl:process.env.VUE_APP_BASE_API,
        showSecureImgUrl:process.env.VUE_APP_SECURE_URL,
        defaultAvatar:this.GLOBAL.defaultAvatar,
        //url: 'http://127.0.0.1:8888/files/4a731a90594a4af544c0c25941171jpeg.jpeg?'+Tools.generateSecurePathHash('/files/4a731a90594a4af544c0c25941171jpeg.jpeg'),
        sfzzmurl:'',
        sfzbmurl:'',
        znzurl:'',
        zgzurl:'',
        zyjszgzurl:'',
        xlzurl:'',
        zczurl:'',
        srcList: [
        ],
        user: {
          createTime: "",
          hospitalId: 1,
          hospitalName: "",
          userAvatar: "",
          userEmail: "",
          userId: 0,
          userMobile: "",
          userRealName: "",
          userSex: 1,
          userStatus: 1
        },
        detail:{

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
          const { user,detail } = response
          this.user = user
          this.detail = detail == null?{}:detail;
          loadingObj.close()
          this.sfzzmurl = this.detail.idCardFront.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.idCardFront+'?'+Tools.generateSecurePathHash("/"+this.detail.idCardFront):this.showImgUrl+'/'+this.detail.idCardFront;
          this.sfzbmurl = this.detail.idCardBack.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.idCardBack+'?'+Tools.generateSecurePathHash("/"+this.detail.idCardBack):this.showImgUrl+'/'+this.detail.idCardBack;
          this.xlzurl = this.detail.education.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.education+'?'+Tools.generateSecurePathHash("/"+this.detail.education):this.showImgUrl+'/'+this.detail.education;
          this.zgzurl = this.detail.practicingQualificationCertificate.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.practicingQualificationCertificate+'?'+Tools.generateSecurePathHash("/"+this.detail.practicingQualificationCertificate):this.showImgUrl+'/'+this.detail.practicingQualificationCertificate;
          this.zczurl = this.detail.professionalCertificate.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.professionalCertificate+'?'+Tools.generateSecurePathHash("/"+this.detail.professionalCertificate):this.showImgUrl+'/'+this.detail.professionalCertificate;
          this.zyjszgzurl = this.detail.technicalQualificationCertificate.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.technicalQualificationCertificate+'?'+Tools.generateSecurePathHash("/"+this.detail.technicalQualificationCertificate):this.showImgUrl+'/'+this.detail.technicalQualificationCertificate;
          this.znzurl = this.detail.facePhoto.substr(0,5) == 'files'?this.showSecureImgUrl+'/'+this.detail.facePhoto+'?'+Tools.generateSecurePathHash("/"+this.detail.facePhoto):this.showImgUrl+'/'+this.detail.facePhoto;
          console.log(this.sfzzmurl)
          this.srcList.push(this.sfzzmurl);
          this.srcList.push(this.sfzbmurl);
          this.srcList.push(this.xlzurl);
          this.srcList.push(this.zgzurl);
          this.srcList.push(this.zczurl);
          this.srcList.push(this.zyjszgzurl);
          this.srcList.push(this.znzurl);
        })
      },
      toSetting(){
        this.$router.push({ path: '/setting/index' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg{
    background-color: #F6F8FC;
  }
  .img-item{
    display: inline-block;
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

