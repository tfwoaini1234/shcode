<template>
  <div class="login-container">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="title">
            <img src="@/assets/logo.png" class="sidebar-logo">
            <img src="@/assets/title.png" class="sidebar-title">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple align-right">

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录系统</h3>
      </div>
      <div class="form-content">
        <div class="tpp">请使用手机号码和密码<br>登录系统</div>
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入手机号码"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;padding:20px 0" @click.native.prevent="handleLogin">登录</el-button>

        <div class="tips">
          <el-row :gutter="20">
            <el-col :span="12">
              <div>&nbsp;</div>
            </el-col>
            <el-col :span="12">
              <div class="align-right"> <a href="#">找回密码</a></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    </div>
    <div class="bottom">
      Copyright  ©  2018 - {{new Date().getFullYear()}} 青耕鸟. All Rights Reserved. 版权所有
    </div>
  </div>
</template>

<script>
  import { validMobile } from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码必须大于6个字符'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '13880311555',
          password: '123456'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">

  $bg:#FFFFFF;
  $light_gray:#fff;
  $cursor: #000000;

  $dark_gray:#333333;
  $light_gray:#333333;

  .header{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f4f4f4;
    line-height: 60px;
    background: #ffffff;
    .title{
      font-size: 18px;
      padding-left: 20px;
      color: #666666;
      .sidebar-logo{
        width: 30px;
        vertical-align: middle;
        align-self: left;
      }
      .sidebar-title{
        height: 25px;
        vertical-align: middle;
      }
    }
  }
  .content{
    flex: 1;
  }
  .bottom{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #d0d0d0;
  }
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background:#FFFFFF;
    background-size: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .login-form {
      background: $bg;
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 0;
      margin: 8% auto;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      box-shadow: 0px 0px 8px #e0e0e0;
      border-radius: 5px;
      .form-content{
        padding: 40px;
      }
      .tpp{
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        margin: 0 auto;
        padding-bottom: 10px;
      }
    }
    .tips {
      font-size: 14px;
      color: #333333;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      border-bottom: 2px solid #f9f9f9;
      .title {
        font-size: 26px;
        color: #1ca3ce;
        margin: 20px auto;
        text-align: center;
        font-weight: normal;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid #d0d0d0;
      background: #FFFFFF;
      border-radius: 5px;
      color: #454545;
    }

  }
</style>
