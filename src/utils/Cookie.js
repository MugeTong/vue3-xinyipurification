export function getCookie(name) {
    // 创建正则表达式对象，用于匹配cookie
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    // 使用正则表达式匹配document.cookie
    let arr = document.cookie.match(reg);

    if (arr) {
        // 如果匹配成功，返回Cookie值
        return decodeURIComponent(arr[2]);
    } else {
        // 如果没有匹配到，返回null
        return null;
    }
}

export function setCookie(name, value, maxAge) {
    document.cookie = name + "=" + value + ";max-age=" + maxAge
}

export function delCookie(name) {
    let cval = getCookie(name);
    if (cval !== null) {
        document.cookie = name + "=" + cval + ";max-age=" + 0
    }
}