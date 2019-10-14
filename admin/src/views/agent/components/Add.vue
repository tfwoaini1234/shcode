<template>
  <div class="main-box" id="editBox">
    <el-form ref="form" label-width="80px" :size="this.GLOBAL.formSize()">
      <el-form-item label="姓名">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="请设置用户状态" v-model="form.status">
          <el-option key="1" label="正常" :value="1"></el-option>
          <el-option key="2" label="锁定" :value="2"></el-option>
        </el-select>
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
    name: "add",
    props:{
      parent:Object,
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
        delete param['createTime']
          save(param).then(()=>{
          this.submitLoading = false
          this.parent.fetchTree()
          this.$message('修改成功')
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
