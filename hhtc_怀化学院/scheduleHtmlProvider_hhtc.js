function scheduleHtmlProvider() {
    let http = new XMLHttpRequest()
    http.open("GET", 'http://jwmis.hhtc.edu.cn/jsxsd/xskb/xskb_list.do', false) // 使用同步方法
    http.send()
    // console.log(http.responseText)
    return http.responseText
}