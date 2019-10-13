<template>
  <div class="main-box">
    <div class="page-title">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">财务中心</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">

          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="5">
        <el-col :span="24">

          <el-card class="box-card" shadow="never">
            <ul class="amount-box">
              <li>
                <label class="ttl">个人收入现金余额：</label>
              </li>
              <li>
                <span class="total">
                  <i class="iconfont icon-RMB"></i>{{wallet.toFixed(2)}}
                </span>
              </li>
              <li v-if="false">
                <el-button type="primary" size="mini">提现</el-button>
              </li>
              <li>
                <span class="ttl">温馨提示：该余额为完成任务所得到的收入金额，医生提现后将扣除.</span>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
      <div class="info-list">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="账单记录" name="first">
            <pay-list></pay-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {getWallet} from "@/api/user"
  import PayList from "./components/PayList"
  export default {
    components: {PayList},
    data() {
      return {
        activeName: 'first',
        wallet:0,
        hospital:{
          "hospitalId":1,
          "hospitalName":"测试医院",
          "hospitalAddress":"成都",
          "hospitalPhone":"13880311555",
          "hospitalContacts":"2",
          "hospitalWallet":2000.00,
          "hospitalWalletLimit":5.00,
          "createTime":"2019-08-29T02:21:43",
          "hospitalStatus":1
        }
      }
    },
    mounted(){
      this.getWallet()
    },
    methods: {
      getWallet() {
        getWallet().then(response => {
          console.log(response)
          this.wallet = response
        })
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
</style>

