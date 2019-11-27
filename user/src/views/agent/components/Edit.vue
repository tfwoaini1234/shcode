<template>
  <div class="main-box" id="editBox">
    <el-form ref="form" label-width="80px" :size="this.GLOBAL.formSize()">
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="submitLoading">保存</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import { save,getInfo } from '@/api/agent'
    import { Loading } from 'element-ui'
    export default {
        name: "edit",
        props:{
            parent:Object,
            item:Object,
        },
        data(){
            return{
                submitLoading: false,
                roleList:[],
                form:{

                }
            }
        },
        mounted(){
            this.fetchData()
        },
        methods:{
            sexFilterSex(sex) {
                const statusMap = {
                    1: '男',
                    2: '女',
                    3: '保密'
                }
                return statusMap[sex]
            },
            fetchData(){
                // let loadingInstance = Loading.service({target:'#editBox'});
                let formItem = {}
                this.form = Object.assign(formItem,this.item)

                getInfo().then((res)=>{
                    this.roleList = res
                    // loadingInstance.close()
                })
            },
            onSubmit(){
                this.submitLoading = true
                let param = this.form
                param.password = 123456;
                param.proxy = 1;
                save(param).then(()=>{
                    this.submitLoading = false
                    this.$message('修改成功')
                    this.$emit('before-close')
                })
            },
            onCancel(){
                this.parent.$refs.editBox.closeDrawer()
            }
        }
    }
</script>

<style scoped>

</style>
