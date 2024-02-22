<script setup>
import {useNotificationStore} from "@/stores/Notification";

const notificationService = useNotificationStore();

const notificationHeight = 2.4;

</script>

<template>
  <transition-group name="notification">
    <div v-for="(notification, index) in notificationService.notifications"
         :key="notification.id"
         :class="notification.type"
         :style="{ top: 4 + (notificationService.notifications.length - index - 1) *
         notificationHeight + 'rem' }"
         class="notification">
      {{ notification.message + ' ' + notification.id }}
    </div>
  </transition-group>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  right: 2rem;
  width: 150px;
  height: 2rem;
  padding: 5px 0 5px 5px; // 上 右 下 左
  text-align: center;
  z-index: 99;
  transition: all 0.2s ease-out;
}

.notification.error {
  border-left: 5px solid $y-color-error;
  background-color: $y-color-error-bk;
  color: $y-color-error-text;
}

.notification.success {
  border-left: 5px solid $y-color-success;
  background-color: $y-color-success-bk;
  color: $y-color-success-text;
}

.notification.warning {
  border-left: 5px solid #7f5a0e;
  background-color: #f0e68c;
  color: #7f5a0e;
}

.notification-enter-active {
  transition: all 0.2s ease-out;
}

@keyframes slideInFromRight {
  0% {
    right: -150px;
    opacity: 0;
  }
  100% {
    right: 2rem;
    opacity: 1;
  }
}



.notification-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.notification-enter-from {
  right: -150px;
  opacity: 0;
}

.notification-leave-to {
  opacity: 0;
}

</style>




