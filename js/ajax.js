class Ajax {
    constructor() {

    }


    ajax(obj) {
        let defaultObj = {
            method: "get",
            url: "#",
            params: "",
            callback: null,
            isAsync: true
        }

        for (let i in defaultObj) {
            defaultObj[i] = obj[i] == undefined ? defaultObj[i] : obj[i]
        }

        let xhr = new XMLHttpRequest()

        let urlAndParams = defaultObj.url
        if (defaultObj.method.toLowerCase() == "get" && defaultObj.params != "") {
            urlAndParams += "?" + defaultObj.params
        }
        xhr.open(defaultObj.method, urlAndParams, defaultObj.isAsync)

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                defaultObj.callback && defaultObj.callback(xhr.responseText)
            }
        }

        if (defaultObj.method.toLowerCase() == "get") {
            xhr.send()
        } else if (defaultObj.method.toLowerCase() == "post") {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(defaultObj.params);
        }

    }



    ajax2(obj) {
        let defaultObj = {
            method: "get",
            url: "#",
            params: "",
            isAsync: true
        }

        for (let i in defaultObj) {
            defaultObj[i] = obj[i] == undefined ? defaultObj[i] : obj[i]
        }

        let xhr = new XMLHttpRequest()

        let urlAndParams = defaultObj.url
        if (defaultObj.method.toLowerCase() == "get" && defaultObj.params != "") {
            urlAndParams += "?" + defaultObj.params
        }
        xhr.open(defaultObj.method, urlAndParams, defaultObj.isAsync)

        return new Promise(function(resolve, reject) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve && resolve(xhr.responseText)
                    } else {
                        reject && reject("服务器出错了")
                    }
                }
            }
            if (defaultObj.method.toLowerCase() == "get") {
                xhr.send()
            } else if (defaultObj.method.toLowerCase() == "post") {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(defaultObj.params);
            }

        })
    }
}