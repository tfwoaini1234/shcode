<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">团队设置</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">
          </div>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="成员管理" name="first">
        <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card shadow="never" class="tree-box">
                <el-tree :default-expand-all="true" :data="dataTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </el-card>
            </el-col>
            <el-col :span="18">
              <el-card shadow="never" class="tree-box">
                <el-row>
                  <el-col :span="24">
                    <el-form v-show="false" :inline="true" class="demo-form-inline" :size="this.GLOBAL.listSize()">
                      <el-form-item>
                        <el-input  placeholder="成员姓名">
                          <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
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
                  <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column align="center" label="名字" width="140">
                    <template slot-scope="scope">
                      {{ scope.row.userRealName }}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="电话" width="195">
                    <template slot-scope="scope">
                      {{ scope.row.userMobile }}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="钱包金额" width="195">
                    <template slot-scope="scope">
                      {{ scope.row.userWallet }}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="性别" width="105">
                    <template slot-scope="scope">
                      {{ scope.row.userSex | sexFilterSex }}
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="角色" width="195">
                    <template slot-scope="scope">
                      {{ scope.row.roleName }}
                    </template>
                  </el-table-column>

                  <el-table-column class-name="status-col" label="状态" width="110" align="center">
                    <template slot-scope="scope">
                      <el-tag size="mini" :type="scope.row.userStatus | statusFilter">{{ scope.row.userStatus | statusFilterTxt }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="created_at" label="邮箱">
                    <template slot-scope="scope">
                      <span>{{ scope.row.userEmail }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="注册时间" width="160" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.createTime }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    align="center"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <div v-if="scope.row.userCheckStatus == 3">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="cashOut(scope.row)" type="text" size="small">提现</el-button>
                      </div>
                      <div v-if="scope.row.userCheckStatus == 2">
                        <el-button @click="check(scope.row)" type="text" size="small">审核</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>

              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-drawer
          ref="editBox"
          title="编辑用户"
          :visible.sync="showEdit"
          direction="rtl"
          :before-close="handleClose">
          <div>
            <edit :parent="this" :item="item"></edit>
          </div>
        </el-drawer>
        <el-drawer
          ref="cashOutBox"
          title="提现"
          :visible.sync="showCashOut"
          direction="rtl"
          :before-close="handleClose">
          <div>
            <cash-out :parent="this" :item="item"></cash-out>
          </div>
        </el-drawer>
      </el-tab-pane>
      <el-tab-pane label="团队财务管理" name="second">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card" shadow="never">
              <ul class="amount-box">
                <li>
                  <label class="ttl">团队现金余额：</label>
                </li>
                <li>
                <span class="total">
                  <i class="iconfont icon-RMB"></i>{{hospital.organizationWallet}}
                </span>
                </li>
                <li v-if="false">
                  <el-button type="primary" size="mini">提现</el-button>
                </li>
                <li>
                  <span class="ttl">温馨提示：该余额为团队所得到的收入结余，团队提现后将扣除.</span>
                </li>
              </ul>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="never">
              <ul class="amount-box">
                <li>
                  <label class="ttl">医生总收入余额：</label>
                </li>
                <li>
                <span class="total">
                  <i class="iconfont icon-RMB"></i>{{hospital.organizationDoctorWallet}}
                </span>
                </li>
                <li v-if="false">
                  <el-button type="primary" size="mini">提现</el-button>
                </li>
                <li>
                  <span class="ttl">温馨提示：该余额为团队所有医生的收入结余，医生提现后将扣除.</span>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="list-box">
              <pay-list></pay-list>
            </div>

          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import { getList,getTeamInfo } from '@/api/team'
  import Edit from "./components/edit";
  import CashOut from "./components/CashOut";
  import PayList from "./components/PayList"
  export default {
    name: "index",
    components: {CashOut, Edit,PayList},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: 'gray',
          3: 'info'
        }
        return statusMap[status]
      },
      statusFilterTxt(status) {
        const statusMap = {
          1: '正常',
          2: '锁定',
          3: '待审核'
        }
        return statusMap[status]
      },
      sexFilterSex(sex) {
        const statusMap = {
          1: '男',
          2: '女',
          3: '保密'
        }
        return statusMap[sex]
      }
    },
    data() {
      return {
        activeName:'first',
        list: null,
        listLoading: true,
        showEdit:false,
        showCashOut:false,
        item:{},
        parent:this.$refs,
        hospital:{},
        dataTree: [{
          label: '全部成员 (1)',
          key:1,
          children: [{
            label: '正常 (2)',
            key:2
          },
            {
              label: '待审核 (1)',
              key:3
            }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted(){
      this.fetchTree()
      this.getTeamInfo();
    },
    methods: {
      fetchTree(){
        this.listLoading = true
        getList().then(response => {
          console.log(response)
          this.listLoading = false
          this.dataTree = response
          if(response && response.length>0){
            this.list =response[0].list
          }
          console.log(response)
        })
      },
      getTeamInfo(){
        getTeamInfo().then(r=>{
          console.log(r)
          this.hospital = r;
        })
      },
      handleNodeClick(data) {
        const {list} =data
        this.list =list
      },
      handleClick(row){
        this.item = row
        this.showEdit = true
      },
      handleClose(done){
        done()
      },
      handleTabClick(){

      },
      cashOut(row){
        this.item = row;
        this.showCashOut = true;
      },
      check(row){
        this.$router.push({ path: '/info/check/'+row.userId })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tree-box{
    height: calc(100vh - 135px);
  }
  .amount-box{
    padding:0;
    margin: 0;
    list-style: none;
    li{
      padding: 5px 0;
      vertical-align: middle;
      .total{
        font-size: 24px;
        color: rgb(255, 104, 0);
        font-weight: 400;
        display: inline-block;
        i{
          font-size: 24px;
          font-weight: bold;
        }
      }
      .qf{
        margin-left: 10px;
        height: 26px;
        line-height: 26px;
        display: inline-block;
        padding: 0 10px;
        color: rgb(255, 104, 0);
        background: #f0f0f0;
        font-size: 12px;
        border-radius: 3px;
        i{
          font-size: 14px;
          font-weight: bold;
        }
      }
      .ttl{
        font-size: 14px;
        color: #666666;
      }
    }
  }
  .info-list{
    margin-top: 20px;
  }
  .list-box{
    margin-top: 20px;
  }
</style>
