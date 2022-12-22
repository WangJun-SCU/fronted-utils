var vue = new Vue({
    el: "#vue",
    data: {
        fold: [],
        util1: {
            timestamp: "",
            time: ""
        },
        util2: {
            str: "",
            strHash: ""
        },
        util3: {
            input1: "",
            input2: "",
            type: "交集",
            resultShow: false,
            resultErrorShow: false,
            result: "",
            resultError: "",
            input3: ""
        },
        util4: {
            input1: "",
            input2: "",
            resultErrorShow: false,
            resultError: ""
        },
        util5: {
            lngLat1: "",
            lngLat2: "",
            result: "",
            resultErrorShow: false,
            resultError:""
        },
        util6: {
            input1: "",
            input2: "",
            input3: ""
        },
        util7: {
            input1: "",
            input2: "",
            input3: ""
        }
    },
    methods: {
        unfold() {
            this.fold = [1,2,3,4];
        },
        foldAll() {
            this.fold = [];
        },
        timestamp2time() {
            this.util1.time = this.time2str2(this.util1.timestamp);
        },
        time2timestamp() {
            this.util1.timestamp = this.toTimestamp(this.util1.time);
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
            let str = this.util2.str;
            let hash = new Number(0);
            for(let i = 0; i < str.length; i++){
                let char = str.charAt(i);
                hash = 31 * hash + new Number(char.charCodeAt());
            }
            hash = this.toJavaInt(hash);
            this.util2.strHash = "" + hash;
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
                this.util3.resultErrorShow = true;
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
            this.util3.resultErrorShow = false;
            this.util3.resultShow = true;
            this.util3.result = "第一个集合长度：" + len1 + ", 第二个集合长度：" + len2 + ", 结果集合长度：" + len3;
        },
        // 分类汇总
        groupBy() {
            let str1 = this.util4.input1;
            if(str1.replace(/\s/ig,"") == "") {
                this.util4.resultErrorShow = true;
                this.util4.resultError = "参数不能为空";
                this.util4.input2 = "";
                return;
            }
            let arr1 = str1.split("\n");
            let map = new Map();
            // 解析入参并存入map
            for(let i = 0; i < arr1.length; i++) {
                let lineStr = arr1[i];
                // 分隔符：空格
                let arr2 = lineStr.split(/\s+/); 
                let key = arr2[0], value = arr2[1];
                if(value == undefined) {
                    this.util4.resultErrorShow = true;
                    this.util4.resultError = "参数不合法:" + key;
                    this.util4.input2 = "";
                    return;
                }
                if(map.has(key)) {
                    map.get(key).add(value);
                }else {
                    let set3 = new Set();
                    set3.add(value);
                    map.set(key, set3);
                }
            }

            // 构造结果
            let result = "";
            for(let item of map) {
                let key = item[0], value = item[1];
                result = result+ key + ":【" + value.size + "个】\n";
                result = result + ("" + Array.from(value)).replace(/\s/ig,"") + "\n\n";
            }

            this.util4.resultErrorShow = false;
            this.util4.input2 = result;
        },
        Rad(d) {
            return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
         },
        //计算两个经纬度点的距离
        lngAndLatDistance() {
            let str1 = this.util5.lngLat1;
            let str2 = this.util5.lngLat2;
            let arr1 = str1.split(",");
            let arr2 = str2.split(",");

            if(arr1.length < 2|| arr2.length < 2){
                this.util5.resultErrorShow = true;
                this.util5.resultError= "参数不合法";
                return;
            }

            this.util5.resultErrorShow = false;

            let lng1 = arr1[0] / 1000000;
            let lat1 = arr1[1] / 1000000;
            let lng2 = arr2[0] / 1000000;
            let lat2 = arr2[1] / 1000000;


            var radLat1 = lat1 * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式
            var radLat2 = lat2 * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式
            var a = radLat1 - radLat2;
            var radLng1 = lng1 * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式
            var radLng2 = lng2 * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式
            var b = radLng1 - radLng2;
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
            s = s * 6378.137 ;// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000; //输出为km
            s = s.toFixed(3) * 1000; //输出为m
            this.util5.result = s;
        },
        // 首位加字符
        addString() {
            let input1 = this.util6.input1.replace(/\s/ig,""); //去掉所有空格
            let input3 = this.util6.input3;

            let arr = input1.split(",");

            let result = "";
            if(input3 == "") {
                input3 = "400";
            }
            for(let i = 0; i < arr.length; i++) {
                result += input3 + arr[i];
                if(i != arr.length - 1) {
                    result += ",";
                }
            }
            this.util6.input2 = result;
        },
        // 生成压测配置，补充所有线上城市对应的压测城市
        generatePtestData() {
            let input1 = this.util7.input1.replace(/\s/ig,""); //去掉所有空格
            let arr = input1.split(",");
            let resultOnline = "";
            let resultPtest = "";

            for(let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if(item.length == 6) {
                    if(resultOnline == "") {
                        resultOnline = resultOnline + item;
                        resultPtest = resultPtest + "400" + item;
                    }else {
                        resultOnline = resultOnline + "," + item;
                        resultPtest = resultPtest + ",400" + item;
                    }
                    
                }
            }
            this.util7.input2 = resultOnline + "," + resultPtest;

            let arrResult = this.util7.input2.split(",");

            // 求结果对原始数据的差集
            this.util7.input3 = arrResult.filter(function(v){ return input1.indexOf(v) == -1 });
        }
    },
})