<template>
  <div>
    <el-table
      ref="tableList"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :size="this.GLOBAL.listSize()"
      :header-cell-style="this.GLOBAL.tableHeaderStyle"
      cell-class-name="table-cell"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="left" label="标题内容">
        <template slot-scope="scope">
          <router-link :to="'/message/show/'+scope.row.relationId"><span class="round" v-if="scope.row.hasRead==1"></span> {{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="295">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="类型" width="210" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.msgType | statusFilter">{{ scope.row.msgType | statusFilterTxt }}</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <el-row>
      <el-col :span="8">
        <div class="page-wrap">
          <el-button size="small" :disabled="selectItems.length>0?false:true" @click="deleteDialogVisible=true">删除</el-button>
          <el-dialog
            title="删除确认提示"
            :visible.sync="deleteDialogVisible"
            width="30%">
            <span>确定要删除所选消息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDelete">确 定</el-button>
            </span>
          </el-dialog>
          <el-button size="small" :disabled="selectItems.length>0?false:true" @click="handleRead">标记已读</el-button>
          <el-button size="small" @click="handleReadAll">全部已读</el-button>
        </div>

      </el-col>
      <el-col :span="16">
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
  import { getAllList,deleteItems,readItems,readAllItems  } from '@/api/message'


  export default {
    name: "AllList",
    props: {
      msgType: Number
    }
    ,
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: 'gray'
        }
        return statusMap[status]
      },
      statusFilterTxt(status) {
        const statusMap = {
          1: '系统消息',
          2: '业务消息'
        }
        return statusMap[status]
      }
    },
    data(){
      return {
        deleteDialogVisible:false,
        selectItems:[],
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
      fetchData() {
        this.listLoading = true
        const param = {
          pageSize: this.page.size,
          pageNum: this.page.current,
        }
        if(this.msgType >0){
          param.msgType = this.msgType;
        }
        getAllList(param).then(response => {
          const {records,total,size,current,searchCount,pages}  = response
          this.page.total =total
          this.list = records
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.GLOBAL.savePage(val)
        this.page.size = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page.current = val
        this.fetchData()
      },
      handleDelete(){
        let ids = []
        let items = this.selectItems;
        if(items && items.length>0){
          for(var i in items){
            ids.push(items[i].relationId)
          }
        }
        if(ids.length>0) {
          deleteItems(ids.join(',')).then(response => {
            this.fetchData()
            this.$message('删除成功');
          })
        }
        this.deleteDialogVisible = false
      },
      handleRead(){
        let ids = []
        let items = this.selectItems;
        if(items && items.length>0){
          for(var i in items){
            ids.push(items[i].relationId)
          }
        }
        if(ids.length>0) {
          readItems(ids.join(',')).then(response => {
            this.fetchData()
            this.$message('操作成功');
          })
        }
      },
      handleReadAll(){
          readAllItems().then(response => {
            this.fetchData()
            this.$message('操作成功');
          })
      },
      handleSelectionChange(val) {
        this.selectItems = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .round{
    width:5px ;
    height: 5px;
    display: inline-block;
    background: #FF0000;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
