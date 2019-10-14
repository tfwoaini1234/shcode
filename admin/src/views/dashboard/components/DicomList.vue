<template>
  <div class="content">
    <div v-for="(item,index) in list" :key="index" class="item-list">
      <div class="user-item">
        <el-row :gutter="0">
          <el-col :lg="4">
            <div class="profit">
              <div>
                <el-avatar :size="50">
                  <span slot="default">
                    <img v-if="item.patientSex==1" width="100%" src="@/assets/male.png"/>
                    <img v-if="item.patientSex==2" width="100%" src="@/assets/female.png"/>
                  </span>
                </el-avatar>
              </div>
              <div class="profit-box">
                <div class="info-name">
                  <span class="name-value is-hover">{{item.patientName}}</span>
                </div>
                <div class="info-other">
                  <span class="other-sex">{{item.patientSex |sexFilter}}</span>
                  <span class="other-age">{{item.patientBirthday | ageFilter}}岁</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :lg="12">
            <div class="profile-info">
              <div class="cell-field">
                    <span  class="field-part">
                      <span  class="field-name">业务号：</span>
                      <span  class="field-value">{{item.orderNo}}</span>
                    </span></div>
              <div class="cell-field">
                  <span  class="field-part">
                    <span  class="field-name">手机号：</span>
                    <span  class="field-value">{{item.patientMobile}}</span>
                  </span>
              </div>
              <div class="cell-field">
                    <span  class="field-part">
                      <span  class="field-name">日期：</span>
                      <span  class="field-value">{{item.addTime}}</span>
                    </span>
              </div>
            </div>
          </el-col>
          <el-col :lg="4">
            <div class="tag-box">
              <el-tag :type="item.orderStatus|statusFilterColor"  effect="plain">{{item.orderStatus |statusFilter}}</el-tag>
            </div>

          </el-col>
          <el-col :lg="4">
            <div class="btn-box align-right">
              <div class="btn-items">
                <el-button size="mini" type="primary" @click="openEdit(item)">{{item.orderStatus|statusFilterBtn}}</el-button>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>
    <empty v-if="list.length==0" title="暂无相关任务"></empty>
  </div>
</template>

<script>
  import { getDicomList,getDicomcheckType,getDicomcheckCharge } from '@/api/dicom'
  import Tools from '@/utils/tools'
  import { mapGetters } from 'vuex'
  import Empty from "@/components/Empty"

  export default {
    name: "DicomList",
    components:{Empty},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1:  '分析中',
          10: '待确认',
          15: '待阅片',
          20: '待审核',
          30: '已完成',
          40: '已取消'
        }
        return statusMap[status]
      },
      statusFilterBtn(status) {
        const statusMap = {
          10: '立即确认',
          15: '立即阅片',
          20: '立即审核'
        }
        return statusMap[status]
      },
      statusFilterColor(status) {
        const statusMap = {
          1:  '',
          10: 'warning',
          15: 'danger',
          20: 'success',
          30: 'success',
          40: 'info'
        }
        return statusMap[status]
      },
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
      }
    },
    data(){
      return {
        search:{
          statusStr:'10,15,20'
        },
        page:{
          size:this.GLOBAL.pageSize(),
          current:1,
          total:0
        },
        list: [],
        listLoading: true,
        orderTypeList:[],
        orderCheckpointList:[],
        orderGradeList:[]
      }
    },
    mounted(){
      this.fetchData(this.search)
    },
    methods:{
      fetchData(search) {
        this.listLoading = true
        let param = {
          pageSize: 100,
          pageNum: this.page.current
        }
        if(search){
          Object.assign(param,search)
        }
        getDicomList(param).then(response => {
          const {records,total,size,current,searchCount,pages}  = response
          this.page.total =total
          let result = []
          for(var i in records){
            if(records[i].orderStatus==20 && records[i].verifyUserId==this.userInfo.userId){
              result.push(records[i])
            }
            if((records[i].orderStatus==10 || records[i].orderStatus==15) &&
              records[i].serviceUserId==this.userInfo.userId){
              result.push(records[i])
            }
          }
          this.list = result
          this.listLoading = false
          this.$emit('load',total)
        })
      },
      handleSizeChange(val) {
        this.GLOBAL.savePage(val)
        this.page.size = val
      },
      handleCurrentChange(val) {
        this.page.current = val
      },
      openEdit(row) {
        this.$router.push({ path:'/dicom/show/'+row.orderNo})
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
    .box-card{
      padding: 10px 20px;
      background: #ffffff;
      .card-header{
        padding: 5px 0;
      }
    }
    .tll{
      line-height: 35px;
    }
    .item-list{
      border-style: solid;
      border-color: #f0f0f0;
      border-width:0 0 1px 0;
      border-radius: 0;
      padding: 10px 10px;
      color: #666666;
      .user-item{
        .profit{
          display: flex;
          flex-direction: row;
          .profit-box {
            margin-left: 10px;
            .info-name {
              font-size: 18px;
              margin-top: 10px;
            }
            .info-other {
              font-size: 14px;
            }
          }
        }
      }

      .profile-info{
        font-size: 13px;
        .cell-field{
          padding: 3px 0;
        }
      }
      .tag-box{
        line-height: 60px
      }
      .btn-box{
        margin-top: 20px;
        .btn-items {

        }
      }
      &:last-child{
        border-width:0 0 0 0;
      }
    }
    .gz-btn{
      padding: 15%;
      border: 1px solid #f0f0f0;
      margin: 5%;
      cursor: pointer;
      border-radius: 3px;
      .ico{
        text-align: center;
        padding: 5% 0;
        i{
          font-size: 20px;
          color: #409EFF;
        }

      }
      .txt{
        margin-top: 8%;
        text-align: center;
        font-size: 13px;
        color: #666666;
      }
      &:hover{
        box-shadow: 0 0 5px #d0d0d0;
      }
    }
  }
</style>
