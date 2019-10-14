<template>
  <div class="me-content-title">
    <label></label>
    <label class="title">{{title}}</label>
  </div>
</template>

<script>
  export default {
    name: "ContentTitle",
    props: {
      title: {
        type: String,
        default: '标题名字'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .me-content-title{
    height: 24px;
    display: inline-block;
    font-weight: 400;
    margin: 8px 0px 15px;
    .title{
      display: inline-block;
      margin-left: 4px;
      padding: 0;
      font-size: 16px;
      color: #333;
      font-weight: normal;
    }
    label:first-child {
      width: 4px;
      height: 14px;
      background-color: #5e7be4;
      display: inline-block;
    }
  }
</style>
