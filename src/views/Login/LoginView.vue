<script setup>
import {ref} from 'vue';
import {loginApi} from "@/apis/DynamicApis";
import {useRouter} from "vue-router"
import {setCookie, getCookie} from "@/utils/Cookie";

const useremail = ref("");
const password = ref("");

const router = useRouter();

// 提交登录请求
const submitLogin = async () => {
  // 检验两者是否为空
  if (useremail.value === "" || password.value === "") {
    console.log("用户名或密码不能为空!")
    return
  }

  let password_base64 = btoa(password.value);  // 对密码使用base64加密

  // 发送登录请求
  await loginApi({
    "useremail": useremail.value,
    "password": password_base64
  }).then(res => {
    if (res.status === 200) {
      router.push("/home")
      console.log("登录成功!")
      setCookie("authorization", res.data, 86400)
      console.log(getCookie("authorization"))
    } else {
      console.log(res.statusText)
    }
  }).catch(err => console.log(err))
}

</script>

<template>
  <div class="container">
    <div class="login-container">
      <h1>LOGIN</h1>
      <form @submit.prevent="submitLogin">
        <label for="useremail">邮箱</label>
        <input id="useremail" type="email" v-model="useremail" autocomplete="email">
        <label for="password">密码</label>
        <input id="password" type="password" v-model="password" autocomplete="current-password">
        <button type="submit">登录</button>
      </form>
      <div class="forget-password">
        <router-link to="/forget-password">忘记密码？</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  color: $y-color-white;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url("https://media.xinyipurification.com/images/pexels-photo-4050300.jpg");
  background-size: cover;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.login-container {
  position: relative;
  width: calc(min(70%, 300Px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  background-image: linear-gradient(135deg, $y-color-primary, $y-color-primary-dark-9);
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.7);
}

form {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
}

label {
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid $y-color-primary;
  color: $y-color-black-dark-1;
  text-align: start;


  &:focus {
    outline: none;
  }
}


button {
  width: 100%;
  margin: 5px 0;
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
  background-color: $y-color-primary;
  color: $y-color-white;
  cursor: pointer;
}

button:hover {
  background-color: $y-color-black-dark-1;
}

.forget-password a {
  color: $y-color-white;
  text-decoration: none;
  font-size: .8rem;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>