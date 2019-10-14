<template>
  <div>
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

      <el-table-column align="center" label="名字">
        <template slot-scope="scope">
          {{ scope.row.patientName }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="业务号">
        <template slot-scope="scope">
          {{ scope.row.orderNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="145">
        <template slot-scope="scope">
          {{ scope.row.patientMobile }}
        </template>
      </el-table-column>
      <el-table-column label="检查类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅片等级" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderGradeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅片费用" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检查部位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderCheckpointName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientBirthday | ageFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientSex | sexFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.orderStatus | statusFilterColor"
            disable-transitions>{{scope.row.orderStatus | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.orderStatus==10" @click="openEdit(scope.row)" type="text" size="small">立即确认</el-button>
          <el-button v-if="scope.row.orderStatus==15" @click="openEdit(scope.row)" type="text" size="small">立即阅片</el-button>
          <el-button v-if="scope.row.orderStatus==20" @click="openEdit(scope.row)" type="text" size="small">立即审核</el-button>
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
  import { getDicomListByType,getDicomcheckType,getDicomcheckCharge } from '@/api/dicom'
  import {getDict} from "@/api/hospital"
  import Tools from '@/utils/tools'

  export default {
    name: "DicomTypeList",
    props:{
      pendType:{
        type: Number,
        default:1
      }
    },
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
          pendType:this.pendType
        },
        page:{
          size:this.GLOBAL.pageSize(),
          current:1,
          total:0
        },
        list: null,
        listLoading: true,
        orderTypeList:[],
        orderCheckpointList:[],
        orderGradeList:[]
      }
    },
    created() {

    },
    mounted(){
      this.fetatchLoad()
    },
    methods:{
      fetatchLoad(){
        this.fetchData(this.search)
        // this.getDicomcheckType()
        // this.getPosition()
      },
      async getDicomcheckType(){
        await getDicomcheckType().then((res)=>{
          this.orderTypeList = res
        })
      },
      async getPosition(){
        let param = {"tableName":'m_imageology_order',"fieldName":'order_checkpoint'}
        await getDict(param).then((res)=>{
          this.orderCheckpointList = res
        })
      },
      /**获取付费档次**/
      getDicomcheckChargeList(orderType){
        let parmars={orderType:orderType}
        getDicomcheckCharge(parmars).then((res)=>{
          console.log(res)
          this.orderGradeList = res
        })
      },
      /**检查类型**/
      handleOrderTypeChange(item){
        this.getDicomcheckChargeList(item)
      },
      /**加在数据**/
      fetchData(search) {
        this.listLoading = true
        let param = {
          pageSize: this.page.size,
          pageNum: this.page.current
        }
        if(search){
          Object.assign(param,search)
        }
        getDicomListByType(param).then(response => {
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
