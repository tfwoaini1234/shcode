<template>
  <el-form :model="ruleForm" status-icon :rules="rules"  ref="ruleForm" :size="this.GLOBAL.formSize()" label-width="100px" class="demo-ruleForm">
    <el-form-item label="转账账号" prop="oldpass">
      <el-input type="password" v-model="ruleForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="余额" prop="newPass">
      <label>123.00</label>
    </el-form-item>
    <el-form-item label="转账金额" prop="newPass">
      <el-input type="password" v-model="ruleForm.amount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">激活</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {addAmount} from "@/api/recharge";

  export default {
    name: "ChangePass",
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
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            { required: false, message: '请输入原始密码', trigger: 'blur'  }
          ],
          newPass: [
            { required: false, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {

            }
              addAmount(data).then(r=>{
              this.$message('修改成功')
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
