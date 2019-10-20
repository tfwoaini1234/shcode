<template>
  <el-form
ref="codeForm"
:model="codeForm"
status-icon
:rules="rules"
:size="this.GLOBAL.formSize()"
           label-width="100px"
class="demo-ruleForm">
    <el-form-item label="激活账号" prop="mobile">
      <el-input v-model="codeForm.mobile" type="text" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="激活码" prop="code">
      <el-input v-model="codeForm.code" type="text" autocomplete="off"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('codeForm')">激活</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import { activeCode } from '@/api/activeCode'

    export default {
        name: 'ChangePass',
        data() {
            return {
                codeForm: {
                    mobile: '',
                    code: '',
                    proxyId: 0
                },
                rules: {
                    mobile: [
                        { required: false, message: '请输入帐号', trigger: 'blur' }
                    ],
                    code: [
                        { required: false, message: '请输入激活码', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            let userInfo = localStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            this.codeForm.proxyId = userInfo.id
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        activeCode(this.codeForm).then(r => {
                            if (r.code === 200) {
                                this.$message.success('激活成功')
                            } else {
                                this.$message.error(r.message)
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
