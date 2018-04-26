var WebSocketServer = require('ws').Server;

var historyDao = require('../../dao/HistoryDao');
var history = require('../../domain/History_Table');
wss = new WebSocketServer({ port: 8181 });
var stocks = {
    "A001": 95.0,
    "A002": 92.0,
    "A003": 98.0,
    "A004": 99.0,
    "A005": 90.0,
    "A006": 90.0,
    "A007": 98.0,
    "A008": 90.0,
    "A009": 99.0,
    "B001": 75.0,
    "B002": 70.0,
    "B003": 70.0,
    "B004": 73.0,
    "B005": 75.0,
    "B006": 72.0,
    "B007": 77.0,
    "B008": 78.0,
    "B009": 80.0,
    "C001": 50.0,
    "C002": 50.0,
    "C003": 55.0,
    "C004": 54.0,
    "C005": 56.0,
    "C006": 58.0,
    "C007": 52.0,
    "C008": 52.0,
    "C009": 55.0,
}
//随机数据模拟现场实时量
function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var stockUpdater;
var randomStockUpdater = function() {
    for (var symbol in stocks) {
        if(stocks.hasOwnProperty(symbol)) {
            var randomizedChange = randomInterval(-50, 50);
            var floatChange = randomizedChange /10;
            //console.log(randomizedChange,floatChange);
            stocks[symbol] += floatChange;
        }
    }
    var randomMSTime = randomInterval(1000, 2500);//模拟服务器端实时采集时间
    stockUpdater = setTimeout(function() {
        randomStockUpdater();
    }, randomMSTime);
};
randomStockUpdater();
//建立通信 传回value值
var clientStocks = [];
wss.on('connection', function (ws) {
    var sendStockUpdates = function (ws, res) {
        if (ws.readyState === 1) {
            var stocksObj = {};
            //console.log(res);
            if (res !== null) {
                clearInterval(clientStockUpdater);
                    for (let i = 0; i < res.length; i++) {
                        var date = res[i].timestamp;
                        stocksObj[date.format("yyyy-MM-dd hh:mm")] = res[i].value;
                    }
                    ws.send(JSON.stringify(stocksObj));/*
                setInterval(function () {
                    sendStockUpdates(ws, null);
                }, 1000);*/
                    return;
            } else {

                for (var i = 0; i < clientStocks.length; i++) {
                    var symbol = clientStocks[i];
                    stocksObj[symbol] = stocks[symbol].toFixed(2);//保留2位小数
                }
            }
             //console.log(stocksObj);
            if (stocksObj.length !== 0) {
                ws.send(JSON.stringify(stocksObj));//返回{key:value}键值对字符串
                console.log("更新", JSON.stringify(stocksObj));
            }
        }
    };
    var clientStockUpdater = setInterval(function () {
        sendStockUpdates(ws, null);
    }, 1000);//传回服务端时间间隔
    ws.on('message', function (message) {
        var stockRequest = JSON.parse(message);
        console.log("收到消息", stockRequest);
        var type = stockRequest['type'];
        var tagId = stockRequest['tagId'];
        var beginTime = stockRequest['beginTime'];
        var endTime = stockRequest['endTime'];
        if (type === 0) {
            historyDao.getHistoryData(tagId, beginTime, endTime, function (res) {
                sendStockUpdates(ws, res);
            });
            return;
        }
        clientStocks = stockRequest['stocks'];
        console.log(clientStocks, clientStocks.length);
        sendStockUpdates(ws, null);
    });
    ws.on('close', function () {
        if (typeof clientStockUpdater !== 'undefined') {
            clearInterval(clientStockUpdater);
        }
    });
});
// 格式化时间
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};