<template>
  <el-form
:model="ruleForm"
status-icon
:rules="rules"
ref="ruleForm"
:size="this.GLOBAL.formSize()"
           label-width="100px"
class="demo-ruleForm">
    <el-form-item label="转账账号" prop="mobile">
      <el-input type="text" v-model="ruleForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="余额" prop="newPass">
      <label>{{ruleForm.liveAmount}}</label>
    </el-form-item>
    <el-form-item label="转账金额" prop="amount">
      <el-input-number v-model="ruleForm.amount" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { toRecharge } from '../../../api/activeCode'

    export default {
        name: 'UserRecharge',
        data() {
            return {
                ruleForm: {
                    mobile: '',
                    amount: 0,
                    proxyId: 0,
                    liveAmount: 0
                },
                rules: {
                    mobile: [
                        { required: false, message: '请输入帐号', trigger: 'blur' }
                    ],
                    account: [
                        { required: false, message: '请输入金额', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            let userInfo = localStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            this.ruleForm.proxyId = userInfo.id
            this.ruleForm.liveAmount = userInfo.money
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        toRecharge(this.ruleForm).then(r => {
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
