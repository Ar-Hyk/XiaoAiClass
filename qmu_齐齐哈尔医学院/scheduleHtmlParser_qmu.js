function scheduleHtmlParser(html) {
    var $ = cheerio.load(html, { decodeEntities: false });

    const sections_list = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]

    function getWeekList(week) {
        // let t = week.split('周')
        // let weeks = []
        // let t = week.split(/周\s+/)[0].replace('，', ',')
        // t.split(".").forEach(w => {
        //     if (w.search('-') != -1) {
        //         let range = w.split('-');
        //         let start = parseInt(range[0]);
        //         let end = parseInt(range[1]);
        //         for (let i = start; i <= end; i++) {
        //             if (!weeks.includes(i)) {
        //                 weeks.push(i);
        //             }
        //         }
        //     } else if (w.length != 0) {
        //         let v = parseInt(w);
        //         if (!weeks.includes(v)) {
        //             weeks.push(v);
        //         }
        //     }
        // })
        return '传入类型为：' + typeof (week) + '------具体值为：' + week+'--------------传入类型为：' + typeof (t) + '------具体值为：' + t;
    }

    const getWeeks = (weekStr, options = { remove: /周 /g, separator: ',', secondSeparator: '-' }) => {
        const { remove, separator, secondSeparator } = options
        let weeks = []
        weekStr.replace(remove, '').split(separator).forEach(weekInterval => {
            if (~weekInterval.search(secondSeparator)) {
                let flag = 0
                if (~weekInterval.search('单')) flag = 1
                if (~weekInterval.search('双')) flag = 2
                const [start, end] = weekInterval.replace(/单|双/, '').split(secondSeparator).map(v => parseInt(v))
                for (let i = start; i <= end; i++) {
                    if (!flag) weeks.push(i)
                    else if (flag && !((i + flag) % 2) && !weeks.includes(i)) weeks.push(i)
                }
            } else if (weekInterval.length) {
                let v = parseInt(weekInterval)
                if (!weeks.includes(v)) weeks.push(v)
            }
        })
        if (!weeks.length) console.log('空的周信息，原始字符串为：', weekStr)
        return weeks
    }

    const tbody = $('tbody').eq(3);
    let data = []

    tbody.find('tr').slice(3, 9).each(function (i) {
        // 节次 ------> sections = sections_list[i]
        $(this).find('td').slice(1, 8).each(function (ii) {
            // 星期 ------> day = ii + 1
            // cell信息
            var cell_str = $(this).html()
            // 排除空cell
            if (cell_str != '&nbsp;') {
                let cell = cell_str.split(/<.*?>/)
                let n = cell.length / 4;
                for (let iii = 0; iii < n; iii++) {
                    data.push({
                        // name: cell[0],  //课程名字
                        name: cell[3],  //课程名字
                        position: cell[2],  //上课地点
                        teacher: cell[1],  //老师
                        // weeks: weeks_list,  //周次
                        weeks: getWeeks(cell[3]),  //周次
                        day: ii + 1,
                        sections: sections_list[i]
                    })
                    cell.splice(0,4)
                }
            } else {
                // console.log('周 ' + (ii + 1) + ' 的第 ' + sections_list[i] + ' 节无课！')
            }
        })
    })

    return data
}