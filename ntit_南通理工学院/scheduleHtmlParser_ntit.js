function scheduleHtmlParser(html) {
    // 导入cheerio 具体看小爱提供的教程，一般都这样写
    var $ = cheerio.load(html, { decodeEntities: false });

    // 数据输出
    var data = [];

    // 周/节数_处理函数
    // "1-2周,4-8周,10-17周" ---> [1,2,4,5,6,7,8,10,11,12,13,14,15,16,17]
    // "1-2节" ---> [1,2]
    function getS2List(s) {
        li = s.split(",")
        r = []
        for (var i = 0; i < li.length; i++) {
            s = li[i].replace(/周|节/g, "");
            if (s.search('-') != -1) {
                let range = s.split("-");
                let start = parseInt(range[0]);
                let end = parseInt(range[1]);
                for (let i = start; i <= end; i++) {
                    if (!r.includes(i)) {
                        r.push(i);
                    }
                }
            } else if (s.length != 0) {
                let v = parseInt(s);
                if (!r.includes(v)) {
                    r.push(v);
                }
            }
        }
        // console.log(r)
        return r
    }

    // 定位到包含最小课表信息的"div"并且遍历
    $(".td_wrap").each(function() {
        i_day = parseInt($(this).attr('id')[0])
        console.log("===day: " + i_day + "===")

        $(this).find("div").each(function() {
            li = $(this).children()

            // console.log(li.eq(0).find("font").text())
            s_name = li.eq(0).find("font").text()
            s_position = li.eq(2).find("font").text()
            s_teacher = li.eq(3).find("font").text()

            sw = li.eq(1).find("font").text().split('\)')
            l_weeks = getS2List(sw[1])
            l_sections = getS2List(sw[0].replace(" \(", ""))
                // day = day

            console.log(data)
            data.push({
                name: s_name,
                position: s_position,
                teacher: s_teacher,
                weeks: l_weeks,
                day: i_day,
                sections: l_sections
            })

            console.log(data[-1])
        })
    })

    console.log("=====OK=====")
    console.log(data)

    return data
}