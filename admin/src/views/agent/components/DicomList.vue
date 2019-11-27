<template>
  <div>
    <div style="margin-bottom:20px;">
        <el-button @click="showAddHandel" type="primary">
          新增
        </el-button>

    </div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">
          <el-form-item>
            <el-input v-model="search.mobile"  placeholder="手机号">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="height: 28px;line-height: 13px" round @click="searchData">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-drawer
      ref="addBox"
      title="新增用户"
      size="80%"
      :visible.sync="showAdd"
      direction="rtl"

      :before-close="handleClose">
      <div>
        <add @success="addSuccess" :parent="this" ></add>
      </div>
    </el-drawer>
    <el-drawer
      ref="editBox"
      title="新增用户"
      :visible.sync="showEdit"
      direction="rtl"
      :before-close="handleClose">
      <div>
        <edit :parent="this" :item="item"></edit>
      </div>
    </el-drawer>
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

      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户余额">
        <template slot-scope="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="80">
        <template slot-scope="scope">
<!--          <el-button @click="openEdit(scope.row)" type="text" size="small">编辑</el-button>-->
          <el-button @click="openDelete(scope.row)" type="text" size="small">删除</el-button>
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
    import { getList,deleteUser } from '@/api/agent'
    import Tools from '@/utils/tools'
    import Add from './Add'
    import Edit from './Edit'
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
        components:{ Add,Edit},
        data(){
            return {
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
        },
        methods:{
            showAddHandel(){
                this.showAdd = true;
            },
            handleClose(done){
                done()
            },
            addSuccess(){
                this.fetchData()
            },
            handleCommand(value){
                let data={};

                addCode(data).then(response => {
                    this.$message('新增成功')
                })
            },
            openDelete(row){
                this.$confirm('此操作将永久删除该代理, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser({
                        id:row.id
                    }).then(response => {
                        this.fetchData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                });
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
