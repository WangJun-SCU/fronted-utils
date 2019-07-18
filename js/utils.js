var vue = new Vue({
    el: "#vue",
    data: {
        timestamp: "",
        time: "",
        oldMiliaoId: "",
        newMiliaoId: "",
        UUID: "",
        str: "",
        strHash: ""
    },
    methods: {
        timestamp2time() {
            this.time = this.time2str2(this.timestamp);
        },
        time2timestamp() {
            this.timestamp = this.toTimestamp(this.time);
        },
        // 时间戳转换成时间
        time2str(val) {
            if (val == 0) {
                return "";
            }
            let now = new Date(parseInt(val, 10));
            let _year = now.getFullYear(),
                _month = Number(now.getMonth()) + 1,
                _day = now.getDate(),
                _hour = now.getHours(),
                _min = now.getMinutes(),
                _sec = now.getSeconds();
            return `${_year}-${_month}-${_day}`;
        },
        // 时间戳转换成时间--包含时分秒
        time2str2(val) {
            if (val == 0) {
                return "";
            }
            let now = new Date(parseInt(val, 10));
            let _year = now.getFullYear(),
                _month = Number(now.getMonth()) + 1,
                _day = now.getDate(),
                _hour = now.getHours(),
                _min = now.getMinutes(),
                _sec = now.getSeconds();
            return `${_year}-${_month}-${_day} ${_hour}:${_min}:${_sec}`;
        },
        // 时间转时间戳
        toTimestamp(time) {
            let date = new Date(time);
            return date.getTime();
        },
        //String转hash
        str2hash() {
            let str = this.str;
            let hash = new Number(0);
            for(let i = 0; i < str.length; i++){
                let char = str.charAt(i);
                hash = 31 * hash + new Number(char.charCodeAt());
            }
            hash = this.toJavaInt(hash);
            this.strHash = "" + hash;
        },
        /** 
         * 将js页面的number类型转换为java的int类型 
         * 
         * JavaScript中，数字存储是双进度64位浮点数。
         * 但是位操作却会把要操作的运算元当做32位带符号的整数。
         * 因此 & 0xFFFFFFFF不会改变原值，也可以 ^ 0 或者 | 0 都可以得到原值
         * 来源：https://zhuanlan.zhihu.com/p/65533642
         */  
        toJavaInt(num)  
        {  
            var MAX_VALUE = 0x7fffffff;  
            var MIN_VALUE = -0x80000000;  
            if(num > MAX_VALUE || num < MIN_VALUE)  
            {  
                return num &= 0xFFFFFFFF;  
            }  
            return num;  
        }  
        
    },
})