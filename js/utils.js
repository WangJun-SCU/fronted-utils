var vue = new Vue({
    el: "#vue",
    data: {
        timestamp: "",
        time: "",
        oldMiliaoId: "",
        newMiliaoId: "",
        UUID: "",
        str: "",
        strHash: "",
        util3: {
            input1: "",
            input2: "",
            type: "交集",
            resultShow: false,
            resultError: false,
            result: "",
            resultError: "",
            input3: ""
        },
        util4: {
            input1: "",
            input2: ""
        }
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
        },
        // 计算两个集合的交集，并集，差集
        calculateSet() {
            // 去掉所有空格
            let str1 = this.util3.input1.replace(/\s/ig,"");
            let str2 = this.util3.input2.replace(/\s/ig,"");
            if(str1 == "" || str2 == ""){
                // 错误提示框
                this.util3.resultShow = false;
                this.util3.resultError = true;
                this.util3.resultError = "集合不能为空!";
                return;
            }
            let set1 = str1.split(",");
            let set2 = str2.split(",");

            let res;
            if(this.util3.type == "交集"){
                res = set1.filter(function(v){ return set2.indexOf(v) > -1 });
            }else if(this.util3.type == "并集") {
                res = set1.concat(set2.filter(function(v){ return !(set1.indexOf(v) > -1)}));
            }else if(this.util3.type == "差集") {
                res = set1.filter(function(v){ return set2.indexOf(v) == -1 });
            }

            // 数组去重
            this.util3.input3 = [...new Set(res)];

            let len1 = set1.length;
            let len2 = set2.length;
            let len3 = this.util3.input3.length;

            // 提示框
            this.util3.resultError = false;
            this.util3.resultShow = true;
            this.util3.result = "第一个集合长度：" + len1 + ", 第二个集合长度：" + len2 + ", 结果集合长度：" + len3;
        },
        // 分类汇总
        groupBy() {
            let str1 = this.util4.input1;
            let arr1 = str1.split("\n");
            let map = new Map();
            for(let i = 0; i < arr1.length; i++) {
                let lineStr = arr1[i];
                let arr2 = lineStr.split(":"); 
                let key = arr2[0], value = arr2[1];
                if(map.has(key)) {
                    map.get(key).add(value);
                }else {
                    let set3 = new Set();
                    set3.add(value);
                    map.set(key, set3);
                }
            }

            let result = "";
            for(let item of map) {
                let key = item[0], value = item[1];
                result = result+ key + ":【" + value.size + "个】\n";
                result = result + Array.from(value) + "\n\n";
            }

            this.util4.input2 = result;
        }
    },
})