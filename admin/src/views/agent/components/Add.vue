<template>
  <div class="main-box" id="editBox" style="margin: 0px 20px 10px 20px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="预设密码">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import { save, getInfo } from '@/api/agent'
    // eslint-disable-next-line no-unused-vars
    import { Loading } from 'element-ui'
    export default {
        name: 'Add',
        props: {
            parent: Object
        },
        data() {
            return {
                submitLoading: false,
                roleList: [],
                ruleForm: {
                    phoneNumber: '',
                    password: ''
                },
                rules: {
                    phoneNumber: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度不够', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            sexFilterSex(sex) {
                const statusMap = {
                    1: '男',
                    2: '女',
                    3: '保密'
                }
                return statusMap[sex]
            },
            fetchData() {
                // let loadingInstance = Loading.service({target:'#editBox'});
                const formItem = {}
                this.form = Object.assign(formItem, this.item)

                getInfo().then((res) => {
                    this.roleList = res
                    // loadingInstance.close()
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitLoading = true
                        const param = this.ruleForm
                        if (!param.password) {
                            param.password = 123456
                        }
                        param.username = param.phoneNumber
                        param.proxy = 1
                        // const user = JSON.parse(localStorage.getItem('userInfo'))
                        // param.createId = user.id
                        save(param).then((r) => {
                            this.submitLoading = false
                            if (r.code == 200) {
                                this.$message('添加成功')
                                this.parent.$refs.addBox.closeDrawer()
                                this.$emit('success')
                            } else {
                                this.$message.error(r.message)
                                this.$emit('error')
                            }
                        }).catch(() => {
                            this.submitLoading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            onCancel() {
                this.parent.$refs.addBox.closeDrawer()
            }
        }
    }
</script>

<style scoped>

</style>
