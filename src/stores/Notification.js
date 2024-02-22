import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([]) // [ { type: 'error', message: 'error message' } ]

  function setNotification(type, message) {
    // 随机生成一个唯一的ID
    const id = Math.random().toString(36).substring(7)
    notifications.value.push({type, message, id})
    setTimeout(() => {
      notifications.value.shift()  // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    }, 3000)  // 示例：3秒后自动移除通知
  }

  return {notifications, setNotification}
})






