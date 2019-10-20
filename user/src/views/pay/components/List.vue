<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">
          <el-form-item>
            <el-input v-model="search.orderNo"  placeholder="订单号">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.status" style="width: 100px" placeholder="状态" >
              <el-option  label="全部" value="0"></el-option>
              <el-option  label="已发起" value="1"></el-option>
              <el-option  label="已完成" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button style="height: 28px;line-height: 13px" round @click="searchData">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      ref="listTable"
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
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          {{ scope.row.orderNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status == 1?'已发起':'已完成' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="接收人">
        <template slot-scope="scope">
          {{ getUserName(scope.row.toId) }}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="转账金额">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="激活时间" width="300">
        <template slot-scope="scope">
          {{ scope.row.addTime }}
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        fixed="right"-->
      <!--        align="center"-->
      <!--        label="操作"-->
      <!--        width="200">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button @click="openEdit(scope.row)" type="text" size="small">编辑</el-button>-->
      <!--          <el-button @click="openDelete(scope.row)" type="text" size="small">删除</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
    import { getList,getUserList } from '@/api/recharge'
    import Tools from '@/utils/tools'
    export default {
        name: "List",
        props:{
            status:{
                type: String,
                default:''
            }
        },
        filters: {

        },
        data(){
            return {
                userList:[],
                showAdd:false,
                showEdit:false,
                item:{},
                search:{

                },
                page:{
                    size:this.GLOBAL.pageSize(),
                    current:1,
                    total:0
                },
                list: null,
                listLoading: false,
                orderTypeList:[],
                orderCheckpointList:[],
                orderGradeList:[]
            }
        },
        created() {

        },
        mounted(){
            this.fetchData()
            this.getUserList()
        },
        methods:{
            getUserName(id){
                for(var k in this.userList){
                    let item = this.userList[k]
                    if(item.id = id){
                        return item.nickname
                    }
                }
                return "未知"
            },
            getUserList(){
                getUserList().then(response => {
                    const {records}  = response
                    this.userList = records
                })
            },
            showAddHandel(){
                this.showAdd = true;
            },
            handleClose(done){
                done()
            },
            handleCommand(value){
                let data={};

                addCode(data).then(response => {
                    this.$message('新增成功')
                })
            },
            openDelete(row){
                alert("删除了")
            },
            fetchData(search) {
                this.listLoading = true
                let param = {
                    pageSize: this.page.size,
                    pageNum: this.page.current
                }
                if(search){
                    Object.assign(param,search)
                }
                let userInfo = localStorage.getItem('userInfo')
                userInfo = JSON.parse(userInfo)
                param.proxyId = userInfo.id;
                getList(param).then(response => {
                    const {records,total,size,current,searchCount,pages}  = response
                    this.page.total =total
                    this.list = records
                    this.listLoading = false
                    this.$refs['listTable'].doLayout()
                    this.$emit('load',total)
                })
            },
            searchData(){
                let search = Object.assign({},this.search)
                if(search.daterange && search.daterange.length==2){
                    search.timeFrom =Tools.dateFormat(search.daterange[0],'yyyy-MM-dd')
                    search.timeTo =  Tools.dateFormat(search.daterange[1],'yyyy-MM-dd')
                }
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
            },
            openEdit(row) {
                this.showEdit = true;
                this.item = row;
            }
        },
        computed: {
            States() {
                return this.status;
            }
        },
        watch: {
            States(val) {
                //console.log(val)
            }
        }
    }
</script>

<style scoped>

</style>
