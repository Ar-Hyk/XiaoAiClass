function scheduleHtmlParser(html) {
    // 导入cheerio 具体看小爱提供的教程，一般都这样写
    var $ = cheerio.load(html, { decodeEntities: false });

    // 数据输出
    var data = [];

    // 周次处理函数
    // 输入：[1-5周,9-13周]
    // 输出：[1,2,3,4,5,9,10,11,12,13]
    function getWeekList(li){
        r = []
        for(var i=0; i<li.length; i++){
            w = li[i].replace("周", "");
            if (w.search('-') != -1) {
                let range = w.split("-");
                let start = parseInt(range[0]);
                let end = parseInt(range[1]);
                for (let i = start; i <= end; i++) {
                    if (!r.includes(i)) {
                        r.push(i);
                    }
                }
            } else if (w.length != 0) {
                let v = parseInt(w);
                if (!r.includes(v)) {
                    r.push(v);
                }
            }
        }
        // console.log(r)
        return r
    }

    // 节数处理函数
    // 输入："第1节-第3节"
    // 输出：[1,2,3]
    function getSectionsList(s){
        r = [];
        s = s.replace(/第|节/g,"");
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
            let v = parseInt(w);
            if (!r.includes(v)) {
                r.push(v);
            }
        }
        // console.log(r)
        return r
    }

    // 定位到包含最小课表信息的"div"并且遍历
    $('.mtt_item_kcmc ').each(function(){
        // 将课表信息按7个空格切成列表
        l_class = $(this).text().split('       ');
        // l_class = ["思想道德修养与法律基础[17]","辛焕焕","1-16周,星期1,第1节-第3节,5201教室","21级中医4班,21级中医5班...   "]
        
        // 对l_class进一步切表
        time_all = l_class[2].split(',')

        // 切出地点
        s_position = time_all.pop();
        // 切出节数
        s_sections = time_all.pop();
        // 切出星期
        s_day = time_all.pop()[2];
        // l_class 剩下的就是周次

        data.push({
            name: l_class[0],
            position: s_position,
            teacher: l_class[1],
            weeks: getWeekList(time_all), // 周次处理
            day: s_day,
            sections: getSectionsList(s_sections) // 节数处理
        });
    });

    // 数据去重（100%重复）
    var new_data = [data[0]];
    data.forEach(function(item){
        for (var i = 0; i < new_data.length; i++){
            if (
                new_data[i]['name'] == item['name']&&
                new_data[i]['position'] == item['position']&&
                new_data[i]['teacher'] == item['teacher']&&
                new_data[i]['weeks'].toString() == item['weeks'].toString()&&
                new_data[i]['day'] == item['day']&&
                new_data[i]['sections'].toString() == item['sections'].toString()
            ){
                // console.log(i)
                return
            }
            // console.log(new_data[i]['name'] == item['name'])
            // console.log(new_data[i]['position'] == item['position'])
            // console.log(new_data[i]['teacher'] == item['teacher'])
            // console.log(new_data[i]['weeks'].toString() == item['weeks'].toString())
            // console.log(new_data[i]['day'] == item['day'])
            // console.log(new_data[i]['sections'].toString() == item['sections'].toString())
            // console.log('__________')
        }
        new_data.push(item)
    })

    // 数据输出
    return new_data;
}
