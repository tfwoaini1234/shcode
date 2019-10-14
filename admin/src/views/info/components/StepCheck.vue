<template>
    <div class="result-content">
      <span class="icon-box">
        <i class="iconfont icon-shenhe1"></i>
      </span>
      <h2>信息审核中...</h2>
      <p>您提交的资料正在等待管理员审核，审核通过后我们将以短信的方式告知您，请耐心等待。</p>
    </div>
</template>

<script>
    export default {
        name: "StepCheck"
    }
</script>

<style lang="scss" scoped>
  .result-content {
    margin-top: 100px;
    text-align: center;
    .icon-box {
      width: 100%;
      margin-bottom: 30px;
      i {
        font-size: 70px;
        color: #2eabff;
      }
    }
    h2{
      font-size: 26px;
      color: #2eabff;
      font-weight: normal;
    }
    p{
      font-size: 14px;
      color: #666666;
    }
  }
</style>
