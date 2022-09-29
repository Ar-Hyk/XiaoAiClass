function scheduleHtmlParser(html) {
    function cell2data(cell, d) {
        let l = cell.length
        // console.log(l)
        switch (l) {
            case 0: return '空';
            case 1: return '无课程';
            case 7: {
                data.push({
                    name: cell[0],
                    position: cell[4],
                    teacher: cell[1],
                    weeks: getWeekList(cell[2]),
                    day: d,
                    sections: getSectionsList(cell[2])
                });
                break;
            };
            case 8: {
                data.push({
                    name: cell[0] + '@' + cell[1],
                    position: cell[5],
                    teacher: cell[2],
                    weeks: getWeekList(cell[3]),
                    day: d,
                    sections: getSectionsList(cell[3])
                });
                break;
            };
            default: {
                fu = cell.indexOf('---------------------')
                if (fu != -1) {
                    cell_new = cell.splice(0, fu + 1)
                    cell_new.pop()
                    cell2data(cell_new, d)
                    cell2data(cell, d)
                }
                return '错误'
            }
        };
    }

    function getWeekList(week) {
        console.log(week)
        let	 flag = 0
        if (week.search('单')!=-1) {
            flag = 1
        }else if(week.search('双')!=-1){
            flag = 2
        }
        let t = week.split(/\(.?周\)\[/)[0].replace('，', ',');
        console.log(t)
        let weeks = [];
        t.split(",").forEach(w => {
            if (w.search('-') != -1) {
                let range = w.split("-");
                let start = parseInt(range[0]);
                let end = parseInt(range[1]);
                for (let i = start; i <= end; i++) {
                    if (!weeks.includes(i)) {
                        weeks.push(i);
                    }
                }
            } else if (w.length != 0) {
                let v = parseInt(w);
                if (!weeks.includes(v)) {
                    weeks.push(v);
                }
            }
        });
        if(flag==1){
            let weeks_j = []
            weeks.forEach(w=>{
                if ((w%2)!=0) {
                    weeks_j.push(w)
                }
            })
            weeks = weeks_j
        }else if (flag==1){
            let weeks_o = []
            weeks.forEach(w=>{
                if ((w%2)!=0) {
                    weeks_o.push(w)
                }
            })
            weeks = weeks_o
        }
        console.log(weeks)
        return weeks
    }
        
    function getSectionsList(sections) {
        let s = []
        let jc = sections.split(/\(.?周\)\[/)[1].replace('节]', '').split('-')
        // console.log(jc)
        start = parseInt(jc[0]);
        end = parseInt(jc[1]);
        for (let i = start; i <= end; i++) {
            s.push(i)
        }
        // console.log(s)
        return s
    }

    var $ = cheerio.load(html, { decodeEntities: false });
    let data = [];
    let cell_num = 0
    $('.kbcontent').each(function (i) {
        if (i % 2 == 0) {
            // console.log(i + '------>\n' + $(this).html().split(/<.*?>/).filter((x) => x !== ''))
            c = $(this).html().split(/<.*?>/).filter((x) => x !== '')
            // console.log(c)
            cell2data(c, cell_num % 7 + 1)
            cell_num++;
        }
    })
    return data
}