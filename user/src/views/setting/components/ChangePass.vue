<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" :size="this.GLOBAL.formSize()" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原始密码" prop="oldpass">
      <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input v-model="ruleForm.newPass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { changePass } from '@/api/setting'

  export default {
    name: 'ChangePass',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'))
        } else {
          if (this.ruleForm.newPass !== this.ruleForm.checkPass) {
            callback(new Error('两次密码不一致'))
          }
          callback()
        }
      }
      return {
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            { required: true, message: '请输入原始密码', trigger: 'blur' }
          ],
          newPass: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              oldPassword: this.ruleForm.oldPass,
              newPassword: this.ruleForm.newPass
            }
            changePass(data).then(r => {
                // eslint-disable-next-line eqeqeq
                if (r.code == 200) {
                    this.$message('修改成功')
                } else {
                    this.$message.error(r.msg)
                }
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
