<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" src="@/assets/logo.png" class="sidebar-logo">
        <span v-else class="sidebar-title">
          <img src="@/assets/title.png">
        </span>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" src="@/assets/logo.png" class="sidebar-logo">
        <span class="sidebar-title">
          <img src="@/assets/title.png">
        </span>
      </router-link>
    </transition>
  </div>
</template>

<script>
import Setting from '@/settings'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title:Setting.title,
      logo: '/assets/logo.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 0.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #FFFFFF;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #426ED7;
      text-shadow: 0px 0px 1px #64A2ED;
      font-weight: 500;
      line-height: 50px;
      font-size: 16px;
      font-family:"Microsoft YaHei";
      vertical-align: middle;
      img{
        height: 25px;
        vertical-align: middle;
      }
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
