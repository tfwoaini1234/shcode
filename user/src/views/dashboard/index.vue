<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :md="14" :lg="18">
        <div class="box-card">
          <div class="card-header">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="tll">激活数</div>
              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>
          </div>
          <div class="total">
            <el-row :gutter="20">
              <el-col :md="12" :lg="12">
                <el-card shadow="never">
                  <div class="icon" style="background: #4CB560">
                    <i class="iconfont icon-dayview"></i>
                  </div>
                  <div class="count">
                    <span class="nb">{{ddayCount}}</span>
                  </div>
                  <!--                  <span class="ttm">本月</span>-->
                  <label>今日激活数</label>
                </el-card>
              </el-col>
              <el-col :md="12" :lg="12">
                <el-card shadow="never">
                  <div class="icon" style="background: #4CB560">
                    <i class="iconfont icon-monthlyview"></i>
                  </div>
                  <div class="count">
                    <span class="nb">{{ddayAllCount}}</span>
                  </div>
                  <!--                  <span class="ttm">本月</span>-->
                  <label>总激活数</label>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="box-card" style="margin-top: 10px;min-height: 790px">
          <!--数据列表-->
          <div class="card-header">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="tll">激活列表</div>
              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 10px">
            <dicom-list></dicom-list>
          </div>
        </div>
      </el-col>
      <el-col :md="10" :lg="6">
        <div style="background: #ffffff;">
          <div class="box-card" style="margin-bottom: 20px">
            <div class="card-header">
              <el-row :gutter="30">
                <el-col :span="12">
                  <div class="tll">快捷操作</div>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row :gutter="20">
                <el-col :span="8">
                  <router-link to="/activeCode/index">
                    <div class="gz-btn">
                      <div class="ico"><i class="iconfont icon-table"></i></div>
                      <div class="txt">激活码</div>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="8">
                  <router-link to="/recharge/index">
                    <div class="gz-btn">
                      <div class="ico"><i class="iconfont icon-form"></i></div>
                      <div class="txt">激活</div>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="8">
                  <router-link to="/pay/index">
                    <div class="gz-btn">
                      <div class="ico"><i class="iconfont icon-user"></i></div>
                      <div class="txt">转账</div>
                    </div>
                  </router-link>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <router-link to="/buy/index">
                    <div class="gz-btn">
                      <div class="ico"><i class="iconfont icon-shezhi"></i></div>
                      <div class="txt">购买</div>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="8">

                </el-col>
              </el-row>
            </div>
          </div>
          <!--日历-->
          <div class="box-card" style="margin-bottom: 20px">
            <div class="card-header">
              <el-row :gutter="30">
                <el-col :span="12">
                  <div class="tll"></div>
                </el-col>
              </el-row>
            </div>

            <!--            <el-calendar v-model="date">-->
            <!--            </el-calendar>-->
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import DicomList from "../recharge/components/List"
    import { getCount } from '@/api/dashboard'
    export default {
        name: 'Dashboard',
        components: {DicomList},
        data(){
            return {
                date:null,
                dayCount:0,
                ddayCount:0,
                ddayAllCount:0,
                dayAllCount:0,
            }
        },
        mounted(){
            this.fetchCount()
        },
        methods:{
            fetchCount(){
                let param = {

                }
                let userInfo = localStorage.getItem('userInfo')
                userInfo = JSON.parse(userInfo)
                param.proxyId = userInfo.id
                getCount(param).then((res) => {
                    const { dayCount, ddayCount, ddayAllCount,dayAllCount } = res
                    this.dayCount = dayCount
                    this.ddayCount = ddayCount
                    this.ddayAllCount = ddayAllCount
                    this.dayAllCount = dayAllCount
                })
            },
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        }
    }
</script>

<style lang="scss" scoped>
  .dashboard-container {
    padding: 15px;
    background: #f4f4f4;
    .icon{
      position: absolute;
      width: 60px;
      height: 60px;
      background: #FAB260;
      line-height: 60px;
      color: #ffffff;
      border-radius: 50%;
      i{
        font-size: 30px;
      }
    }
    .total{
      margin: 10px 0 20px 0;
      text-align: center;

      .count{
        width: 160px;
        height: 40px;
        line-height: 40px;
        display: block;
        color: #2eabff;
        position: relative;
        margin: 5px auto;
        .nb{
          font-size: 40px;
        }
        .fg{
          font-size: 14px;
          vertical-align: top;
          color: #f0f0f0;
          margin: 0 10px;
        }
      }
      .ttm{
        font-size: 12px;
        color: #999999;
        display: block;
        margin: 5px 0;
      }
      label{
        font-weight: normal;
        color: #666666;
        font-size: 14px;
      }
    }
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
