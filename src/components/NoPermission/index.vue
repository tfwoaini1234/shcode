<template>
  <div class="content">
    <div class="item">
      <span class="icon"><i class="iconfont icon-suo"></i></span>
      <span class="title">您暂无权限访问该页面...</span>
    </div>

  </div>
</template>

<script>
    export default {
        name: "NoPermission"
    }
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  height: 100%;
  z-index: 10000;
  text-align: center;
  .item{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin: -100px 0 0 -100px;
    .icon{
      display: block;
      i{
        font-size: 80px;
        color: #BCC0CC;
      }
    }
    .title{
      color: #BCC0CC;
      font-size: 14px;
    }
  }
}
</style>
