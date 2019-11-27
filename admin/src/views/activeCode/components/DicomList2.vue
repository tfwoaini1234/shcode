<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">
          <el-form-item>
            <el-input v-model="search.patientName" placeholder="激活码" />
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
      <el-table-column align="center" label="激活账号">
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
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="page-wrap align-right">
          <el-pagination
            background
            :current-page="page.current"
            :page-sizes="this.GLOBAL.pageSizesList"
            :page-size="page.size"
            :layout="this.GLOBAL.pageTmplete()"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getList } from '@/api/active'
  import Tools from '@/utils/tools'

  export default {
    name: 'List',
    filters: {

    },
    props: {
      status: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        search: {

        },
        page: {
          size: this.GLOBAL.pageSize(),
          current: 1,
          total: 0
        },
        list: null,
        listLoading: false,
        orderTypeList: [],
        orderCheckpointList: [],
        orderGradeList: []
      }
    },
    computed: {
      States() {
        return this.status
      }
    },
    watch: {
      States(val) {
        // console.log(val)
      }
    },
    created() {

    },
    mounted() {
      // this.fetchData()
    },
    methods: {
        openDelete(row) {
            alert('删除了')
        },
      fetchData(search) {
        this.listLoading = true
        const param = {
          pageSize: this.page.size,
          pageNum: this.page.current
        }
        if (search) {
          Object.assign(param, search)
        }
        getList(param).then(response => {
            // eslint-disable-next-line no-unused-vars
          const { records, total, size, current, searchCount, pages } = response
          this.page.total = total
          this.list = records
          this.listLoading = false
          this.$refs['listTable'].doLayout()
          this.$emit('load', total)
        })
      },
      searchData() {
        const search = Object.assign({}, this.search)
          // eslint-disable-next-line eqeqeq
        if (search.daterange && search.daterange.length == 2) {
          search.timeFrom = Tools.dateFormat(search.daterange[0], 'yyyy-MM-dd')
          search.timeTo = Tools.dateFormat(search.daterange[1], 'yyyy-MM-dd')
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
        this.$router.push({ path: '/dicom/show/' + row.orderNo })
      }
    }
  }
</script>

<style scoped>

</style>
