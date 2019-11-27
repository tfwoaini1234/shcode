<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    :size="this.GLOBAL.formSize()"
    label-width="100px"
    class="demo-ruleForm">
    <el-form-item label="原始密码" prop="oldpass">
      <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import {changePass} from '@/api/setting'

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
                        {required: true, message: '请输入原始密码', trigger: 'blur'}
                    ],
                    newPass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const user = JSON.parse(localStorage.getItem('userInfo'))
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data = {
                            oldPassword: this.ruleForm.oldPass,
                            newPassword: this.ruleForm.newPass,
                            username: user.mobile
                        }
                        changePass(data).then(r => {
                            if (r.code == 200) {
                                this.$message('修改成功')
                                localStorage.clear()
                                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
