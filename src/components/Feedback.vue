<script setup>
import {ref} from 'vue';

import {submitFeedbackApi} from "@/apis/DynamicApis";
import {useNotificationStore} from "@/stores/Notification";

const nickname = ref("");
const feedback = ref("");
const notificationService = useNotificationStore();


const submitFeedback = async () => {
  await submitFeedbackApi({"nickname": nickname.value, "feedback": feedback.value
  }).then(res => {
    console.log(res);
    if (res.status === 200) {
      notificationService.setNotification('success', '提交成功');
    } else {
      notificationService.setNotification('error', '提交失败');
    }
  }).catch(err => console.log(err));
};
</script>

<template>
  <div>
    <form @submit.prevent="submitFeedback">
      <label for="name">您的称呼</label>
      <input v-model="nickname" placeholder="">
      <label for="feedback">您的反馈</label>
      <textarea v-model="feedback" placeholder="分享您的建议让我们做得更好..."></textarea>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  width: 100%;
}

label {
  font-size: .9rem;
  margin: 5px;
}

input {
  width: 100%;
  height: auto;
  font-size: .8rem;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid $y-color-primary;
  color: $y-color-black-dark-1;
  font-weight: 500;
  text-align: start;

  &:focus {
    outline: none;
  }
}

textarea {
  width: 100%;
  height: 100%;
  font-size: .8rem;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  color: $y-color-black-dark-1;
  text-align: start;
  resize:none; /* 取消拖拽 */

  &:focus {
    outline: none;
  }
}


button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: .9rem;
  background-color: $y-color-primary;
  color: $y-color-white;
  cursor: pointer;
}

</style>