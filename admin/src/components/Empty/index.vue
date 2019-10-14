<template>
  <div class="empty">
    <i class="iconfont icon-zanwushuju"></i>
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    name: "index",
    props:{
      title:{
        type:String,
        default:'暂无数据'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .empty{
    text-align: center;
    color: #EBF1F9;
    margin-top: 20%;
    i{
      font-size: 80px;
    }
    span{
      display: block;
    }
  }
</style>
