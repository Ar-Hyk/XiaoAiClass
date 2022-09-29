async function scheduleTimer() {
    return {
        totalWeek: 30, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
                section: 1, // 节次：[1, 30]之间的整数
                startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
                endTime: '08:45', // 结束时间：同上
            },
            {
                section: 2,
                startTime: '08:50',
                endTime: '09:35',
            },
            {
                section: 3,
                startTime: '09:50',
                endTime: '10:35',
            },
            {
                section: 4,
                startTime: '10:40',
                endTime: '11:25',
            },
            {
                section: 5,
                startTime: '14:00',
                endTime: '14:45',
            },
            {
                section: 6,
                startTime: '14:50',
                endTime: '15:35',
            },
            {
                section: 7,
                startTime: '15:50',
                endTime: '16:35',
            },
            {
                section: 8,
                startTime: '16:35',
                endTime: '17:20',
            },
            {
                section: 9,
                startTime: '19:00',
                endTime: '19:40',
            },
            {
                section: 10,
                startTime: '19:50',
                endTime: '20:30',
            },
        ]
    }
}