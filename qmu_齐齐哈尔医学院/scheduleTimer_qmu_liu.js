async function scheduleTimer() {
    return {
        totalWeek: 30, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 2, // 上午课程节数：[1, 10]之间的整数
        afternoon: 2, // 下午课程节数：[0, 10]之间的整数
        night: 0, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
                section: 1, // 节次：[1, 30]之间的整数
                startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
                endTime: '09:40', // 结束时间：同上
            },
            {
                section: 2,
                startTime: '10:00',
                endTime: '11:40',
            },
            {
                section: 3,
                startTime: '13:00',
                endTime: '14:40',
            },
            {
                section: 4,
                startTime: '15:00',
                endTime: '16:40',
            },
        ]
    }
}