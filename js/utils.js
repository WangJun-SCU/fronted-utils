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
            console.log(str);
            let hash = new Number(0);
            console.log(str.length);
            for(let i = 0; i < str.length; i++){
                let char = str.charAt(i);
                hash = 31 * hash + new Number(char.charCodeAt());
                console.log(hash);
            }
            hash = this.toJavaInt(hash);
            this.strHash = "" + hash;
        },
        /** 
         * 将js页面的number类型转换为java的int类型 
         * @param num 
         * @return intValue 
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