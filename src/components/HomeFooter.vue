<script setup>
import Feedback from "@/components/Feedback.vue";

</script>

<template>
  <footer>
    <div class="copy-right">
      <router-link to="/">© 2022-2024 上海市欣艺净化科技有限公司版权所有</router-link>
      <a href="https://beian.miit.gov.cn/" target="_blank">备案号：沪ICP备2023006443号-1</a>
    </div>

    <feedback class="feedback" />
  </footer>
</template>

<style lang="scss" scoped>
* {
  color: $y-color-text-white;
}

/* 设置页脚大小及位置 */
footer {
  width: 100%;
  margin-top: 300px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: center; /* 设置为居中对齐 */
  background-color: rgb(32, 33, 35);
}


/* 设置连接样式 */
.copy-right {
  display: flex;
  flex-direction: column; /* 设置为垂直排列 */
  align-items: center; /* 设置为居中对齐 */
  flex-grow: 3; /* 设置为可伸展 */
}

.copy-right a {
  font-size: 0.8rem;
  text-decoration: none;
}

/* 设置feedback样式 */
.feedback {
  padding: 10px 0;
  margin: 0 30px;
  width: calc(min(80%, 240Px));
  height: 300px;
}

@media screen and (max-width: 768px) {
  footer {
    flex-direction: column-reverse;
    align-items: center;
  }
}
</style>