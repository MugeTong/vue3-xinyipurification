import DynamicUtils from "@/utils/DynamicUtils";
import { getCookie } from "@/utils/cookie";


// 创建新用户
export function createNewUserApi(data) {
    return DynamicUtils.post('create-new-user/', data)
}

// 登录
export function loginApi(data) {
    return DynamicUtils.post('login/', data)
}

// 提交反馈
export function submitFeedbackApi(data) {
    return DynamicUtils.post('submit-feedback/', data, {
        headers: {
            'authorization': getCookie('authorization')
        }
    })
}

