<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="breadcrumb-container">总后台</div>

    <div class="right-menu">
      <ul class="header-operations">
        <li class="item">
          <el-divider class="item" direction="vertical"></el-divider>
        </li>
        <li class="item">
          <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <el-avatar class="avatar" :size="34">
                <span slot="default">
                  <img  src="@/assets/logo.jpg"  width="100%" />
                </span>
              </el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <el-dropdown-item >
                <span style="display:block;" @click="logout">退出系统</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import { getToken } from '@/utils/auth'
  let ws
  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    data(){
      return {
        msgList:[]
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'hospitalName'
      ])
    },
    mounted(){
      // this.webSocketMessage()
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      logout() {
        localStorage.clear();
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      // webSocketMessage() {
      //   if ("WebSocket" in window) {
      //     let URL = process.env.VUE_APP_BASE_API
      //     URL = URL.replace('http:','ws:')
      //     URL = URL.replace('https:','ws:')
      //     // 打开一个 web socket
      //     ws = new WebSocket(URL+"/websocket/"+getToken());
      //     ws.onopen =()=> {
      //       //ws.send("发送数据")
      //       console.log("数据发送中...")
      //     };
      //
      //     ws.onmessage = (evt)=> {
      //
      //       let msg = evt.data
      //       if(msg && msg.trim()!='') {
      //         try {
      //           let received_msg = JSON.parse(msg)
      //           if (received_msg && received_msg.msgType) {
      //             let item={}
      //             if(received_msg.title && received_msg.title.length>10){
      //               item.title = received_msg.title.substring(0,10)
      //             }else{
      //               item.title = received_msg.title
      //             }
      //             item.msgType = received_msg.msgType
      //             this.msgList.push(item)
      //             switch (item.msgType) {
      //               case 1://系统消息
      //                 this.$notify.info({
      //                   title: '系统消息',
      //                   message: item.title
      //                 })
      //                 break;
      //               case 2://业务消息
      //                 this.$notify.info({
      //                   title: '业务消息',
      //                   message: item.title
      //                 })
      //                 break;
      //             }
      //           }
      //         }catch (e) {
      //           console.log('解析字符串失败')
      //         }
      //       }
      //       console.log("数据已接收..."+msg)
      //     }
      //     ws.onerror=()=>{
      //       console.log("连接出错了...")
      //     }
      //     ws.onclose =()=> {
      //       console.log("连接已关闭...")
      //     }
      //   }
      //   else {
      //     // 浏览器不支持 WebSocket
      //     alert("您的浏览器不支持 WebSocket!");
      //   }
      // },
      msgClick(command){
        if(command!='empty') {
          setTimeout(()=>{
            this.msgList = []
          },3000)
          this.$router.push('/message/index')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $navbarHeight:50px;
  .navbar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction:row;
    align-items: stretch;
    height: $navbarHeight;
    color: #666666;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      width: 50px;
      line-height: 46px;
      height: 100%;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      -webkit-flex: 1;
      flex: 1;
      line-height: $navbarHeight;
    }

    .right-menu {
      height: 100%;
      text-align: right;
      &:focus {
        outline: none;
      }
      .avatar-container {
        margin-right: 30px;
      }

      .header-operations{
        list-style: none;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0;
        margin: 0;
      }
      .item{
        flex: 0 1 auto;
        display: block;
        cursor: pointer;
        padding: 0 10px;
        height: $navbarHeight;
        line-height: $navbarHeight;
        .avatar-wrapper{
          vertical-align: center;
          height: $navbarHeight;
          line-height: $navbarHeight;
          .avatar{
            vertical-align: middle;
          }
          .user-name{
            padding-left: 10px;
          }
        }
        .notice-icon{
          font-size: 20px;
          color: #aaaaaa;
        }
      }
    }
  }
  .item {

  }
</style>
