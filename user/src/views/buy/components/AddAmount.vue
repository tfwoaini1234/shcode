<template>
  <el-form
:model="ruleForm"
status-icon
:rules="rules"
ref="ruleForm"
:size="this.GLOBAL.formSize()"
           label-width="100px"
class="demo-ruleForm">
    <el-form-item label="激活码套餐" prop="oldpass">
      <el-select @change="selectChanged" v-model="ruleForm.type" placeholder="请选择">
        <el-option
          v-for="item in records"
          :key="item.id"
          :price="item.price"
          :activeDays="item.activeDays"
          :royalty="item.royalty"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数量" prop="newPass">
      <el-input-number @change="handleChanged"  v-model="ruleForm.count" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item label="价格" prop="newPass">
      <label>{{ruleForm.total}}</label>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">购买</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import { buyCiphers, getList } from '../../../api/activeCode'

    export default {
        name: 'BuyCiphers',
        data() {
            return {
                records: [],
                ruleForm: {
                    type: 1,
                    count: 1,
                    proxyId: 0,
                    total: 0.0
                },
                rules: {
                    type: [
                        { required: false, message: '请选择套餐', trigger: 'blur' }
                    ],
                    count: [
                        { required: false, message: '请输入数量', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            let userInfo = localStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            this.ruleForm.proxyId = userInfo.id
            getList().then(r => {
                if (r.code === 200) {
                   this.records = r.records
                }
            })
        },
        methods: {
            clcAmount() {
                let price = 0.0
                for (const i in this.records) {
                    if (this.records[i].id === this.ruleForm.type) {
                        console.log(this.records[i])
                        price = this.records[i].price
                        break
                    }
                }
                return (price * this.ruleForm.count)
            },

            selectChanged(value) {
                console.log(value)
                this.ruleForm.total = this.clcAmount()
                console.log(this.ruleForm.total)
            },
            handleChanged(value) {
                console.log(value)
                this.ruleForm.total = this.clcAmount()
                console.log(this.ruleForm.total)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        buyCiphers(this.ruleForm).then(r => {
                            if (r.code === 200) {
                                this.$message.success(r.message)
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
