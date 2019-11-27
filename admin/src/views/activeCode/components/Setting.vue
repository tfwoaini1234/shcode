<template>
  <el-form :model="ruleForm" status-icon :rules="rules"  ref="ruleForm" :size="this.GLOBAL.formSize()" label-width="100px" class="demo-ruleForm">
    <el-form-item  label="日卡"  prop="oldpass">
      金额：<el-input-number v-model="dayAmount" style="width:200px;" autocomplete="off"></el-input-number>
      优惠比例（%）：<el-input-number  v-model="dayBiLi" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item  label="周卡"  prop="oldpass">
      金额：<el-input-number v-model="zhouAmount" style="width:200px;" autocomplete="off"></el-input-number>
      优惠比例（%）：<el-input-number  v-model="zhouBiLi" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item  label="月卡"  prop="oldpass">
      金额：<el-input-number v-model="monthAmount" style="width:200px;" autocomplete="off"></el-input-number>
      优惠比例（%）：<el-input-number  v-model="monthBiLi" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item  label="季卡"  prop="oldpass">
      金额：<el-input-number v-model="jiduAmount" style="width:200px;" autocomplete="off"></el-input-number>
      优惠比例（%）：<el-input-number  v-model="jiduBiLi" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item  label="半年卡"  prop="oldpass">
      金额：<el-input-number v-model="bannianAmount" style="width:200px;" autocomplete="off"></el-input-number>
      优惠比例（%）：<el-input-number  v-model="bannianBiLi" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item  label="年卡"  prop="oldpass">
      金额：<el-input-number v-model="yearAmount" style="width:200px;" autocomplete="off"></el-input-number>
      优惠比例（%）：<el-input-number  v-model="yearBiLi" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import {update,getList} from "@/api/activeCode";

    export default {
        name: 'SetActiveCode',
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else {
                    if (this.ruleForm.newPass !== this.ruleForm.checkPass) {
                        callback(new Error('两次密码不一致'));
                    }
                    callback();
                }
            };
            return {
                list:[],
                ruleForm: {
                    oldPass: '',
                    newPass: '',
                    checkPass: ''
                },
                dayAmount:0,
                dayBiLi:0,
                zhouAmount:0,
                zhouBiLi:0,
                monthAmount:0,
                monthBiLi:0,
                jiduAmount:0,
                jiduBiLi:0,
                bannianAmount:0,
                bannianBiLi:0,
                yearAmount:0,
                yearBiLi:0,
                rules: {

                }
            };
        },
        mounted(){
          this.getList();
        },
        methods: {
            getList(){
                getList().then((r)=>{
                    this.list = r.records
                    for(var k in this.list){
                        let item = this.list[k]
                        if(item.name == '日卡'){
                            this.dayAmount = item.price
                            this.dayBiLi = item.royalty
                        }
                        if(item.name == '周卡'){
                            this.zhouAmount = item.price
                            this.zhouBiLi = item.royalty
                        }
                        if(item.name == '月卡'){
                            this.monthAmount = item.price
                            this.monthBiLi = item.royalty
                        }
                        if(item.name == '季卡'){
                            this.jiduAmount = item.price
                            this.jiduBiLi = item.royalty
                        }
                        if(item.name == '半年卡'){
                            this.bannianAmount = item.price
                            this.bannianBiLi = item.royalty
                        }
                        if(item.name == '年卡'){
                            this.yearAmount = item.price
                            this.yearBiLi = item.royalty
                        }
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            dayAmount:this.dayAmount,
                            dayBiLi:this.dayBiLi,
                            zhouAmount:this.zhouAmount,
                            zhouBiLi:this.zhouBiLi,
                            monthAmount:this.monthAmount,
                            monthBiLi:this.monthBiLi,
                            jiduAmount:this.jiduAmount,
                            jiduBiLi:this.jiduBiLi,
                            bannianAmount:this.bannianAmount,
                            bannianBiLi:this.bannianBiLi,
                            yearAmount:this.yearAmount,
                            yearBiLi:this.yearBiLi,
                        };

                        update(data).then(r=>{
                            this.$message('设置成功')
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
