<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">
          <el-form-item>
            <el-input v-model="search.patientName"  placeholder="激活码">
            </el-input>
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

      <el-table-column align="center" label="激活码">
        <template slot-scope="scope">
          {{ scope.row.patientName }}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="激活账号">
        <template slot-scope="scope">
          {{ scope.row.orderNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="激活时间" width="300">
        <template slot-scope="scope">
          {{ scope.row.addTime }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
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
    import { getList } from '@/api/active'
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
            //this.fetchData()
        },
        methods:{
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
                this.$router.push({ path:'/dicom/show/'+row.orderNo})
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
