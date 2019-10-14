<template>
  <el-form :model="ruleForm" status-icon :rules="rules"  ref="ruleForm" :size="this.GLOBAL.formSize()" label-width="100px" class="demo-ruleForm">
    <el-form-item label="周卡金额"  prop="oldpass">
      <el-input-number  v-model="ruleForm.oldPass" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item label="月卡金额" prop="oldpass">
      <el-input-number  v-model="ruleForm.oldPass" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item label="季卡金额" prop="oldpass">
      <el-input-number  v-model="ruleForm.oldPass" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item label="年卡金额" prop="oldpass">
      <el-input-number  v-model="ruleForm.oldPass" style="width:200px;" autocomplete="off"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import {update} from "@/api/activeCode";

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

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.ruleForm;
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
