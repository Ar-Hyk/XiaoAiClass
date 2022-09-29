async function scheduleTimer() {
    return {
        totalWeek: 30, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 4, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
            section: 1, // 节次：[1, 30]之间的整数
            startTime: '08:20', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '09:05', // 结束时间：同上
        },
        {
            section: 2,
            startTime: '09:15',
            endTime: '10:00',
        },
        {
            section: 3,
            startTime: '10:20',
            endTime: '11:05',
        },
        {
            section: 4,
            startTime: '11:15',
            endTime: '12:00',
        },
        {
            section: 5,
            startTime: '14:20',
            endTime: '15:05',
        },
        {
            section: 6,
            startTime: '15:15',
            endTime: '16:00',
        },
        {
            section: 7,
            startTime: '16:20',
            endTime: '17:05',
        },
        {
            section: 8,
            startTime: '17:15',
            endTime: '18:00',
        },
        {
            section: 9,
            startTime: '19:30',
            endTime: '20:15',
        },
        {
            section: 10,
            startTime: '20:25',
            endTime: '21:10',
        },
        {
            section: 11,
            startTime: '21:20',
            endTime: '22:10',
        },
        {
            section: 12,
            startTime: '22:20',
            endTime: '23:10',
        }
        ]
    }
}
