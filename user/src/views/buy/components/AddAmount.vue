<template>
  <el-form :model="ruleForm" status-icon :rules="rules"  ref="ruleForm" :size="this.GLOBAL.formSize()" label-width="100px" class="demo-ruleForm">
    <el-form-item label="激活码类型" prop="oldpass">
      <el-select v-model="ruleForm.type" placeholder="请选择">
        <el-option label="周卡" value="1" > </el-option>
        <el-option label="月卡" value="2" > </el-option>
        <el-option label="季卡" value="3" > </el-option>
        <el-option label="年卡" value="4" > </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="激活码价格" prop="newPass">
      <label>123.00</label>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">购买</el-button>
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
