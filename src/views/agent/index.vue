<template>
  <div class="main-box">
    <div class="page-title" v-if="false">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">影像分析</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
            &nbsp;
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">

      <el-tab-pane label="代理列表" name="0">
        <dicom-list ref="listItem1" status="20,30,40"></dicom-list>
      </el-tab-pane>
<!--      <el-tab-pane label="所有激活码" name="1">-->
<!--        <el-row>-->
<!--          <el-col>-->
<!--            <ul class="btns-box">-->
<!--              <li @click="changeType('0')">-->
<!--                <div class="item" v-bind:class="activeType=='0'?'active':''">-->
<!--                  <span class="icon"><i class="iconfont icon-shenhe"></i></span>-->
<!--                  <span class="title">待阅片</span>-->
<!--                  <span v-if="readCount>0" class="count">{{readCount}}</span>-->
<!--                </div>-->
<!--              </li>-->
<!--              <li @click="changeType('1')">-->
<!--                <div class="item" v-bind:class="activeType=='1'?'active':''">-->
<!--                  <span class="icon"><i class="iconfont icon-shenhe1"></i></span>-->
<!--                  <span class="title">待审核</span>-->
<!--                  <span v-if="reviewCount>0" class="count">{{reviewCount}}</span>-->
<!--                </div>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <div style="margin-top: 10px;">-->
<!--          <dicom-type-list :pendType="1"  v-show="activeType=='0'" @load="readOnLoad" ref="listTypeItem0"></dicom-type-list>-->
<!--          <dicom-type-list :pendType="2" v-show="activeType=='1'" @load="reviewOnLoad" ref="listTypeItem1"></dicom-type-list>-->
<!--        </div>-->

<!--      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DicomList from './components/DicomList'
  import DicomTypeList from "./components/DicomTypeList";

  export default {

    components:{
      DicomTypeList,
      DicomList
    },
    data() {
      return {
        activeName:'0',
        activeType:'0',
        readCount:0,
        reviewCount:0
      }
    },

    methods: {
      changeType(tab){
        this.activeType = tab
        this.$refs['listTypeItem'+tab].fetatchLoad()
      },
      handleTabClick(item){
        if(item=='0'){
          this.changeType('0')
        }
        if(item=='1') {
          let name = 'listItem' + item.index
          this.$refs[name].fetatchLoad()
        }
      },
      readOnLoad(total){
        this.readCount = total
      },
      reviewOnLoad(total){
        this.reviewCount = total
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .btns-box{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      width: 150px;
      float: left;
      margin-right: 10px;
      cursor: default;
      .item{
        text-align: center;
        padding: 10px 20px;
        border: 1px solid #EBEEF5;
        border-radius: 3px;
        color: #666666;
        .title{
          display: inline;
          font-size: 14px;
        }
        .icon{

        }
        .count{
          color: #ffffff;
          background: #ff0000;
          padding: 1px 5px;
          border-radius: 5px;
          font-size: 12px;
        }
      }
      .active{
        background: #ECF5FF;
        color:#459EFF ;
        border: 1px solid #459EFF;
      }
    }

  }
</style>
