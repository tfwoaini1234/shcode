<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">

          <el-form-item>
            <el-select :clearable="true" v-model="search.recordType" style="width: 100px" placeholder="账单类型">
              <el-option label="收入" :value="1"></el-option>
              <el-option label="提现" :value="2"></el-option>
            </el-select>
            <el-select :clearable="true" v-model="search.recordStatus" style="width: 100px" placeholder="状态">
              <el-option label="已取消" :value="-1"></el-option>
              <el-option label="处理中" :value="1"></el-option>
              <el-option label="已完成" :value="2"></el-option>
            </el-select>
            <el-date-picker
              v-model="search.daterange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-form-item>
              <el-input v-model="search.operationName"  placeholder="操作人">
                <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
              </el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :size="this.GLOBAL.listSize()"
      :header-cell-style="this.GLOBAL.tableHeaderStyle"
      cell-class-name="table-cell"
    >

      <el-table-column align="left" label="业务编号" width="200">
        <template slot-scope="scope">
          {{ scope.row.recordNo}}
        </template>
      </el-table-column>
      <el-table-column label="交易类型" align="center" width="120">
        <template slot-scope="scope">
          <span v-bind:style="scope.row.recordType | statusPayColor">{{ scope.row.recordType | statusPayTxt}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额" width="160">
        <template slot-scope="scope">
          {{scope.row.recordType|statusPayPrefix}} {{scope.row.recordAmount|amountFormat}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="当前余额" width="200">
        <template slot-scope="scope">
          {{scope.row.currentWallet|amountFormat}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.recordStatus | statusFilter">{{ scope.row.recordStatus | statusFilterTxt }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.operationName }}
        </template>
      </el-table-column>

    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="page-wrap align-right">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="this.GLOBAL.pageSizesList"
            :page-size="page.size"
            :layout="this.GLOBAL.pageTmplete()"
            :total="page.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>

  import {getRecordList} from "@/api/hospital"
  import Tools from '@/utils/tools'
  export default {
    name: "RechargeList",
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'info',
          2: 'warning',
          3: 'success'
        }
        return statusMap[status]
      },
      statusFilterTxt(status) {
        switch (status){
          case -1:
            return '已取消';
            break;
          case 1:
            return '处理中';
            break;
          case 2:
            return '已完成';
            break;
        }
      },
      statusPayPrefix(status) {
        const statusMap = {
          1: '+',
          2: '-'
        }
        return statusMap[status]
      },
      statusPayTxt(status) {
        const statusMap = {
          1: '收入',
          2: '提现'
        }
        return statusMap[status]
      },
      statusPayColor(status){
        const statusMap = {
          1: {color:'#F66E24'},
          2: {color:'#1396F1'}
        }
        return statusMap[status]
      },
      amountFormat(value){
        value = Tools.amountFormat(value,2)
        return value
      }
    },
    data(){
      return {
        search:{

        },
        page:{
          size:this.GLOBAL.pageSize(),
          current:1,
          total:0
        },
        list: null,
        listLoading: true
      }
    },
    created() {

    },
    mounted(){
      this.fetchData()
    },
    methods:{
      fetchData(search) {
        this.listLoading = true
        let param = {
          pageSize: this.page.size,
          pageNum: this.page.current
        }
        if(search){
          Object.assign(param,search)
          console.log(param)
        }
        getRecordList(param).then(response => {
          console.log(response)
          const {records,total,size,current,searchCount,pages}  = response
          this.page.total =total
          this.list = records
          this.listLoading = false
        })
      },
      searchData(){
        let search = this.search
        if(search.daterange && search.daterange.length==2){
          search.timeFrom =Tools.dateFormat(search.daterange[0],'yyyy-MM-dd')
          search.timeTo =  Tools.dateFormat(search.daterange[1],'yyyy-MM-dd')
        }
        delete search.daterange
        this.fetchData(search)
      },
      handleSizeChange(val) {
        this.GLOBAL.savePage(val)
        this.page.size = val
        this.searchData()
      },
      handleCurrentChange(val) {
        this.page.current = val
        this.searchData()
      }
    }
  }
</script>

<style scoped>

</style>
