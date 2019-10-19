<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">
          <el-form-item>
            <el-input v-model="search.cipher"  placeholder="激活码">
            </el-input>
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

      <el-table-column align="center" label="激活码">
        <template slot-scope="scope">
          {{ scope.row.cipher }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="激活码类型">
        <template slot-scope="scope">
          {{getTypeName(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="激活账号">
        <template slot-scope="scope">
          {{getUserName(scope.row.bindId)}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="激活时间">
        <template slot-scope="scope">
          {{ scope.row.activeTime }}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="到期时间">
        <template slot-scope="scope">
          {{ getLastTime(scope.row.activeTime,scope.row.activeDays) }}
        </template>
      </el-table-column>

<!--      <el-table-column-->
<!--        fixed="right"-->
<!--        align="center"-->
<!--        label="操作"-->
<!--        width="100">-->
<!--        <template slot-scope="scope">-->
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
    import { getTypeList,getList,getUserList } from '@/api/active'
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
                typeList:[],
                userList:[],
                search:{
                    cipher:''
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
            this.getUserList()
            this.getTypeList()
            this.fetchData()
        },
        methods:{
            formatDate(now) {
                now = new Date(now)
                var year=now.getFullYear();  //取得4位数的年份
                var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date=now.getDate();      //返回日期月份中的天数（1到31）
                var hour=now.getHours();//返回日期中的小时数（0到23）
                var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                var second=now.getSeconds(); //返回日期中的秒数（0到59）
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            },
            getLastTime(time,day){
                if(time == null || time == undefined){
                    return "数据错误"
                }
              let date = new Date(time)
                let times = date.getTime()
                times = times+(day*3600*24)
                console.log(times)
                return this.formatDate(times)
            },
            getUserList(){
                getUserList().then((r)=>{
                    this.userList = r.records
                })
            },
            getUserName(id){
                for(var k in this.userList){
                    let item = this.userList[k]
                    if(item.id == id){
                        return item.nickname
                    }
                }
                return '未知'
            },
            getTypeName(id){
                for(var k in this.typeList){
                    let item = this.typeList[k]
                    if(item.id == id){
                        return item.name
                    }
                }
                return '未知'
            },
            getTypeList(){
                getTypeList().then((r)=>{
                    const {records} = r
                    this.typeList = records
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
