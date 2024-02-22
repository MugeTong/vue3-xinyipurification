<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

// 设定一个计时器，用于在三秒后返回主页
const timer = ref(5);
const prompt_text = ref("返回主页(" + timer.value + "s)");
// 获取路由对象
const router = useRouter();
// 设定一个定时器，用于在三秒后返回主页
setInterval(() => {
  timer.value--;
  prompt_text.value = "返回主页(" + timer.value + "s)";
  if (timer.value === 0) {
    router.push("/");
  }
}, 1000);


</script>

<template>
  <div class="not_found_container">
    <div class="not_found_text">
      <h1>404</h1>
      <!--提示页面不存在，并在三秒后返回主页/home-->
      <p>--&nbsp;&nbsp;页面不存在或者正在建设中&nbsp;&nbsp;--</p>
    </div>
    <div class="not_found_blank">
      <!-- 这个元素仅用来支撑上面的dom元素 -->
    </div>
    <div class="not_found_prompt">
      <!--提示用户不用担心-->
      <p>不用担心，和我们一起回到欣艺</p>
      <el-button type="primary" >{{ prompt_text }}</el-button>
    </div>

  </div>
</template>

<style scoped lang="scss">
.not_found_container { /*采用sketch布局*/
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  height: 100vh;
}
.not_found_container .not_found_text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6vw 0 0 0;  /*上下各留2rem的空白*/
}
.not_found_container .not_found_blank {
  flex-grow: 2;
  height: 40vh;
}
.not_found_container .not_found_prompt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  margin-bottom: 2rem;
}

.not_found_text h1 {
  font-size: 8rem;
  color: $color-primary;
  padding: 0;
  margin: 0;
}
.not_found_text p {
  font-size: 2rem;
  color: $color-primary;
  padding: 0;
  margin: 0;
}
.not_found_container .not_found_prompt p {
  margin: 1rem;
  color: $y-color-primary;
}
</style>