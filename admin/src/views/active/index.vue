<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">激活记录</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">

      <el-tab-pane label="激活记录" name="0">
        <dicom-list ref="listItem1" status="20,30,40"></dicom-list>
      </el-tab-pane>
      <el-tab-pane label="代理激活记录" name="1">
        <dicom-list2 ref="listItem2" status="20,30,40"></dicom-list2>
      </el-tab-pane>
      <el-tab-pane label="切换绑定" name="2">
        <change-bind ref="listItem3" status="20,30,40"></change-bind>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import DicomList from './components/DicomList'
  import DicomList2 from './components/DicomList2'
  import DicomTypeList from "./components/DicomTypeList";
  import ChangeBind from "./components/changeBind";

  export default {

    components:{
        ChangeBind,
      DicomTypeList,
      DicomList,
        DicomList2
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
