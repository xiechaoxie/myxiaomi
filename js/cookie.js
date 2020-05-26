// 添加
function addCookie(key, value, count) {
    let d = new Date()
    d.setDate(d.getDate() + count)
    document.cookie = `${key}=${value};expires=${d.toGMTString()}`
}

// 删除
function removeCookie(key) {
    addCookie(key, "byebye", -1)
}

// 修改
function updateCookie(key, value, count) {
    addCookie(key, value, count)
}

// 查
function getCookie(key) {
    let str = document.cookie
    let arr = str.split("; ")
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(key + "=") == 0) {
            return arr[i].substring(key.length + 1)
        }
    }
}