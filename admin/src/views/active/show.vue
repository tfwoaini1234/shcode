<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-page-header title="返回" @back="goBack" :content="title"></el-page-header>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
            <span v-if="item.orderStatus==20 && fiterReviewReport(item.verifyUserId) ">
              <el-button type="warning" size="small" style="margin-left: 10px" :plain="false" @click="handleBackOrder">退回报告</el-button>
            </span>
            <span v-if="item.orderStatus==15">
              <el-button type="warning" size="small" style="margin-left: 10px" :plain="false" @click="handleCanceOrder">取消订单</el-button>
            </span>
            <span v-if="item.orderStatus==30">
              <el-button type="primary" size="small" style="margin-left: 10px" :plain="false" @click="handlePrint">打印报告</el-button>
            </span>
            <span v-if="item.orderStatus==10">
              <el-button type="warning" size="small" style="margin-left: 10px" :plain="false" @click="handleCanceOrder">取消订单</el-button>
              <el-button  type="primary" size="small" style="margin-left: 10px" :plain="false" v-loading="btnLoading" @click="confirmOrder">确认阅片</el-button>
            </span>
            <span>
            <el-button type="primary" size="small" style="margin-left: 10px" :plain="false" @click="handleShowPtient">患者信息</el-button>
            <el-button type="primary" size="small" style="margin-left: 10px" :plain="true" @click="goBack">返回</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="action-box">
      <no-permission v-if="showAccess"></no-permission>
      <!--影像图像-->
      <div class="dicom-box" v-if="item.orderStatus!=40"
           v-loading="iframLoading"
           element-loading-text="数据较大,请耐心等待..."
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <iframe @load="iframLoad"  style="width: 100%;height: 100%" frameborder="0" id="iframe" :src="iframUrl"></iframe>
      </div>
      <div class="dicom-box" v-if="item.orderStatus==40">
        <empty title="暂无相关的影像信息"></empty>
      </div>
      <!--操作信息-->
      <div v-if="item.orderStatus==15 || item.orderStatus==20 ||  item.orderStatus==30" class="patient-box" v-bind:class="patientBoxShowClass">

        <div class="info-button" @click="changePatient" v-bind:class="patientBoxButtonRightClass">
          <i class="me-icon el-icon-arrow-right"></i>
        </div>
        <div class="patient-box-content">

          <create-report v-if="item.orderStatus==15"  :orderId="item.orderId" :parent="this"></create-report>
          <review-report v-if="item.orderStatus==20" :item="item" :parent="this"></review-report>
          <show-report v-if="item.orderStatus==30" :item="item" :parent="this"></show-report>
        </div>

      </div>

    </div>

    <!--取消弹窗-->
    <el-drawer
      ref="canceBox"
      size="800px"
      title="取消业务订单"
      :wrapperClosable="false"
      :visible.sync="showCance"
      direction="rtl">
      <div>
        <cance-order :orderId="item.orderId" :parent="this"></cance-order>
      </div>
    </el-drawer>
    <!--回退报告-->
    <el-drawer
      ref="backOrderBox"
      size="800px"
      title="退回报告"
      :wrapperClosable="false"
      :visible.sync="showBackOrder"
      direction="rtl">
      <div>
        <back-order :orderId="item.orderId" :parent="this"></back-order>
      </div>
    </el-drawer>
    <!--打印报告-->
    <el-drawer
      ref="showPrintBox"
      size="800px"
      title="查看报告"
      :wrapperClosable="false"
      :visible.sync="showPrint"
      direction="rtl">
      <div>
        <print-templete :item="item" :parent="this"></print-templete>
      </div>
    </el-drawer>
    <!--患者信息-->
    <el-drawer
      ref="showPatient"
      size="800px"
      title="患者信息"
      :wrapperClosable="false"
      :visible.sync="showPatient"
      direction="rtl">
      <div class="main-box">
        <el-tabs type="card">
          <el-tab-pane label="患者信息">
            <el-row>
              <el-col :span="24">
                <el-form label-width="80px" size="mini">
                  <el-form-item label="姓名">
                    <label>{{item.patientName}}</label>
                  </el-form-item>
                  <el-form-item label="年龄">
                    <label>{{item.patientBirthday | ageFilter}}</label>
                  </el-form-item>
                  <el-form-item label="性别">
                    <label>{{item.patientSex | sexFilter}}</label>
                  </el-form-item>
                  <el-form-item label="业务号">
                    <label>{{item.orderNo}}</label>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <label>{{item.patientMobile}}</label>
                  </el-form-item>
                  <el-form-item label="检查部位">
                    <label>{{item.orderCheckpointName}}</label>
                  </el-form-item>
                  <el-form-item label="检查类型">
                    <label>{{item.orderType}}</label>
                  </el-form-item>
                  <el-form-item label="病情描述">
                    <label>{{item.illnessDescription}}</label>
                  </el-form-item>
                  <el-form-item label="临床诊断">
                    <label>{{item.clinicalDiagnosis}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="操作日志">
            <div style="padding:20px 0" v-loading="logsLoading">
              <el-timeline>
                <el-timeline-item
                  v-for="(item, index) in logs"
                  :color="index==0?'#409EFF':'#d0d0d0'"
                  :key="index"
                  :timestamp="item.addTime">
                  <span class="name">{{item.operationName | fiterName}}</span><span class="content">{{item.remark}}</span>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>


  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ContentTitle from '@/components/ContentTitle'
  import PrintTemplete from "./components/PrintTemplete"
  import {getDicomDetail,confirmDicom,getOrderLog} from '@/api/dicom'
  import Tools from '@/utils/tools'
  import CanceOrder from "./components/CanceOrder"
  import CreateReport from "./components/CreateReport"
  import ReviewReport from "./components/ReviewReport"
  import BackOrder from "./components/BackOrder"
  import NoPermission from "@/components/NoPermission"
  import ShowReport from "./components/ShowReport"
  import Empty from "@/components/Empty"

  export default {
    name: "show",
    components:{
      ShowReport,
      NoPermission,
      BackOrder,
      ReviewReport,
      CreateReport,
      CanceOrder,
      PrintTemplete,
      ContentTitle,
      Empty
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
    data() {
      return {
        isLoad:true,//是否初次加载
        title:'',
        patientBoxShow:true,
        patientBoxShowClass:'',
        patientBoxButtonRightClass:'',
        showPatient:false,
        showAccess:false,
        showPrint: false,
        showCance:false,
        showReport:false,
        showReview:false,
        showBackOrder:false,
        showOrder:false,
        iframLoading:false,
        btnLoading:false,
        logsLoading:false,
        item:{
          orderId:null
        },
        iframUrl:'',
        logs: []
      };
    },
    mounted(){
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      this.fetchData()
      this.fetchLogData()

    },
    methods: {
      //切换侧边box窗口
      changePatient(){
        if(this.patientBoxShow){
          this.patientBoxButtonRightClass = 'info-button-hidden';
          this.patientBoxShow = !this.patientBoxShow
          this.patientBoxShowClass = 'patient-box-hidden';
        }else{
          this.patientBoxButtonRightClass = 'info-button-show';
          this.patientBoxShow = !this.patientBoxShow
          this.patientBoxShowClass = 'patient-box-show';
        }
      },
      //加在日志数据
      fetchLogData(){
        this.logsLoading = true
        let orderNo = this.$route.params.orderNo
        getOrderLog({orderNo:orderNo}).then((res)=>{
          this.logs = res
          this.logsLoading = false
        })
      },
      //加在订单数据
      fetchData(){
        let orderNo = this.$route.params.orderNo
        getDicomDetail({orderNo:orderNo}).then((res)=>{
          this.item = res
          const statusMap = {
            1: '分析中',
            10: '待确认',
            15: '待阅片',
            20: '待审核',
            30: '已完成',
            40: '已取消'
          }
          this.title = '查看影像 | ('+statusMap[res.orderStatus]+')'
          if(this.isLoad) {
            this.iframUrl = process.env.VUE_APP_DICOM_API + '/viewer/' + res.dicomSopuid+'?code='+res.dicomSop
            this.iframLoading = true
            setTimeout(()=>{
              this.iframLoading = false
            },60000)
            this.isLoad=false
          }else{
            this.iframLoading = false
          }
        }).catch(()=>{
          this.showAccess = true
        })
      },
      confirmOrder() {
        this.$confirm('确定要开始阅片?', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.btnLoading = true
          let orderId = this.item.orderId
          confirmDicom(orderId).then((res)=>{
            this.fetchData()
            this.btnLoading = false
            this.$message('阅片确认成功');
          }).catch(()=>{
            this.btnLoading = false
          })
        })
      },
      handleCanceOrder(){
        this.showCance = true
      },
      handleReport(){
        this.showReport = true
      },
      handleReview(){
        this.showReview = true
      },
      //回退报告
      handleBackOrder(){
        this.showBackOrder = true
      },
      handleShowPtient(){
        this.showPatient = true
      },
      goBack(){
        this.$store.dispatch('app/toggleSideBar')
        this.$router.push({ path:'/dicom/index'})
      },
      //过滤审核权限
      fiterReviewReport(verifyUserId){
        if(verifyUserId && this.userInfo.userId==verifyUserId) {
          return true
        }else{
          return false
        }
      },
      //查看报告
      handleShowReport(){
        this.showOrder = true
      },
      handlePrint(){
        this.showPrint = true
      },
      iframLoad(){
        this.iframLoading = false
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
  $width:500px;
  $buttonWidth:20px;
  $time:0.3s;

  @keyframes width-show
  {
    0%   {width: 0;}
    100% {width: $width;}
  }
  @keyframes width-hide
  {
    0%   {width: $width;}
    100% {width: 0;}
  }
  @keyframes right-show
  {
    0%   {right: -$width;opacity:0;}
    100% {right: 0;opacity:1;}
  }
  @keyframes right-hide
  {
    0%   {right: 0;opacity:1;}
    100% {right: -$width;opacity:0;}
  }

  @keyframes info-right-show
  {
    0%   {right: $buttonWidth}
    100% {right:$width + $buttonWidth;}
  }
  @keyframes info-right-hide
  {
    0%   {right: $width + $buttonWidth}
    100% {right: $buttonWidth}
  }

  .action-box{
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: row;

    .info-button-show{
      animation: info-right-show $time;
      -moz-animation: info-right-show $time;
      -webkit-animation: info-right-show $time;
      -o-animation: info-right-show $time;
      right: $width + $buttonWidth;
      .me-icon{
        transform:rotate(0deg);
        -ms-transform:rotate(0deg); 	/* IE 9 */
        -moz-transform:rotate(0deg); 	/* Firefox */
        -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
        -o-transform:rotate(0deg);
      }
    }
    .info-button-hidden{
      animation: info-right-hide $time;
      -moz-animation: info-right-hide $time;
      -webkit-animation: info-right-hide $time;
      -o-animation: info-right-hide $time;
      right: $buttonWidth;
      .me-icon{
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg);
      }
    }
    .patient-box{
      position: absolute;
      background: #FFFFFF;
      right: 0;
      z-index: 1000;
      width: $width+$buttonWidth;
      height: calc(100vh - 135px);
      .info-button{
        position: absolute;
        top: 50%;
        left: -$buttonWidth;
        height: 50px;
        width: $buttonWidth;
        margin-top: -25px;
        background: #62A1F0;
        border-radius:7px 0  0 7px;
        line-height: 50px;
        color: #ffffff;
        z-index: 1000;
        cursor: pointer;
      }
    }
    .patient-box-content{
      min-width: 100%;
      padding: 10px;
      position: absolute;
      right: 0;
      top: 0;
      height: calc(100vh - 135px);
      overflow: auto;
    }
    .patient-box-show{
      animation: width-show $time;
      -moz-animation: width-show $time;
      -webkit-animation: width-show $time;
      -o-animation: width-show $time;
      width: $width;
      .patient-box-content{
        animation: right-show $time;
        -moz-animation: right-show $time;
        -webkit-animation: right-show $time;
        -o-animation: right-show $time;
        right: 0;
        opacity:1;
      }
    }
    .patient-box-hidden{
      animation: width-hide $time;
      -moz-animation: width-hide $time;
      -webkit-animation: width-hide $time;
      -o-animation: width-hide $time;
      width: 0;
      .patient-box-content{
        animation: right-hide $time;
        -moz-animation: right-hide $time;
        -webkit-animation: right-hide $time;
        -o-animation: right-hide $time;
        right: $width;
        opacity:0;
      }
    }
    .dicom-box{
      flex: 1;
      background: #000000;
      height: calc(100vh - 135px);
    }
  }
  .name{
    display: block;
    margin-bottom: 5px;
    color: #62A1F0;
    font-weight: bold;
  }
  .content{
    display: block;
    color: #666666;
  }
</style>
