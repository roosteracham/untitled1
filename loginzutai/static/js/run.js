// var Chart = require('./echarts.min');
//==================================初始化==============================================
var $ = function(id){return document.getElementById(id)};
//初始化画布
var canvas = this.__canvas = new fabric.Canvas('c');
fabric.Object.prototype.transparentCorners = false;
canvas.perPixelTargetFind = true;           //选中对象上的像素才算选中,防止误选正方形空白处
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

var importConfiguration = $('importConfiguration'),
    importProjedt = $('importProject');
    ungroup = $('ungroup');

/*$('#myModal').on('show.bs.modal', function () {


});*/
function getData(p) {
    localStorage.clear();
    var data = {
        projectName : p
    };

    jQuery.ajaxSetup({contentType : 'application/json'});
    jQuery.post( "/import", JSON.stringify(data), function (res) {
        //console.log(JSON.stringify(res));
        //localStorage.clear();
        //res = JSON.stringify(res);
        for (var key in res) {
            var d = res[key];
            d = JSON.parse(d);
            var outProjectName = d.projectName;
            var outId = d.outId;
            var outName = d.outName;
            var jsonData = d.jsonData;
            localStorage.setItem(outProjectName +"#"+ outId, jsonData);//存画面
            localStorage.setItem(outProjectName +"#"+"configureName" + outId, outName);//存名称
            //alert("导出完毕,工程名:"+$('outProjectName').value+";编号:" + $('outId').value + "; 命名:" + $('outName').value);
        }
        connectToServer(p);
    });
}
//导入工程,需要先输入工程号,再选择需要导入画面
importProjedt.onclick= function a() {
    let projectName=prompt("请输入工程名:", "Pro1");
    removeEle();
    localStorage.clear();
    getData(projectName);
};
function removeEle() {
    var confChange = $('confChange');
    var b = confChange.childNodes;
    for (let i = 0; i < b.length; i++) {
        confChange.removeChild(b[i]);
    }
    $('confChange').innerHTML = "";
}
function connectToServer(projectName) {
    if(projectName!=""&&projectName!=null){
        //请求工程名下信息
        //首先实现通信
        var ws = new WebSocket("ws://localhost:8181");
        var stockrequest = new Array();//找出所有需要通信的位号点
        var KV=new Array();//初始键值对
        for (var i=0;i<100;i++) {
            var local_json=localStorage.getItem(projectName +"#" + i);
            if(local_json!=null){
                var local_obj = JSON.parse(local_json);
                //console.log(local_obj,local_obj.objects);
                for(var j=0;j<local_obj.objects.length;j++) {
                    if(local_obj.objects[j].tagId){
                        //console.log(local_obj.objects[j].tagId,local_obj.objects[j].tagValue);
                        //stockrequest.push(local_obj.objects[j].tagId);
                        let key = local_obj.objects[j].tagId;
                        let value = local_obj.objects[j].tagValue;
                        let s = new tagKeyValue(key, value);
                        stockrequest.push(key);
                        KV.push(s);
                    }
                }
            }
        }
        var ws = new WebSocket("ws://localhost:8181");
        var stock_request0 = '{ "stocks":'+JSON.stringify(stockrequest) + ' }';
        var stock_request = JSON.parse(stock_request0);
        //var stock_request = `{"stocks":${JSON.stringify(stockrequest)}}`;//两种方法一样
        //var stock_request = { "stocks": ["A001", "A002", "A003"] };
        //var KV1 = {"A001": 0, "A002": 0, "A003": 0};
        var stocks0="{";
        for(var p=0;p<KV.length-1;p++) {
            let tagId = KV[p].key;
            let tagValue = KV[p].value;
            //let tagValue = 0;
            //stock+=tagId+":"+tagValue+",";
            stocks0+=`"${tagId}":${tagValue},`;  //强大的ES6特性
        }
        stocks0 = stocks0 + `"${KV[KV.length-1].key}":${KV[KV.length-1].value}}`;
        var stocks = JSON.parse(stocks0);
        //console.log(stockrequest,stock_request,KV,stocks);
        var isClose = false;
        //进入updataUI的参数已准备就绪
        ws.onopen = function (e) {
            //console.log('Connection to server opened');
            isClose = false;
            ws.send(JSON.stringify(stock_request));
            //console.log("sened a mesg");
        };
        //// UI update function  //通过设置CSS来形成颜色改变的动画
        //var changeStockEntry = function (symbol, originalValue, newValue) {
        //    var valElem = $('#' + symbol + ' span');
        //    valElem.html(newValue.toFixed(2));   //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
        //    if (newValue < originalValue) {
        //        valElem.addClass('label-danger');
        //        valElem.removeClass('label-success');
        //    } else if (newValue > originalValue) {
        //        valElem.addClass('label-success');
        //        valElem.removeClass('label-danger');
        //    }
        //}

        // WebSocket message handler
        ws.onmessage = function (e) {
            var stocksData = JSON.parse(e.data); //将服务器返回的字符串序列化为对象
            //console.log(stocksData);
            for (var symbol in stocksData) {
                if (stocksData.hasOwnProperty(symbol)) {
                    //changeStockEntry(symbol, stocks[symbol], stocksData[symbol]);
                    stocks[symbol] = stocksData[symbol];//stocks相当于将服务器传回数据映射到本地
                }
            }
            localStorage.setItem("cacheData", JSON.stringify(stocksData));//缓存到本地
            //console.log( JSON.stringify(stocksData));
        };

        ws.onclose = function (e) {
            //console.log("Connection closed", e);
            isClose = true;
        };


        //生成组态画面,包括canvas和realtime实时数据表
        addConf(projectName);
    }
}
var flag=true;
//js生成各个组态画面
function addConf(project){
    var confChange=$('confChange');
   // var outId = prompt("请输入组态画面序号:", "1");
    var map = {};
    for(var i=0;i<100;i++){
        var configureName=localStorage.getItem(project +"#configureName" + i);
        if(configureName!=null){
            var newNode = document.createElement('button');
            newNode.innerHTML=configureName;
            //console.log(configureName);
            confChange.appendChild(newNode);//自动加button
            confChange.appendChild(document.createElement('br'));//加个回车
            //map用来存储存在的键值对{编号:命名}
            map[i]=configureName;
            //console.log(i,map[i],map);
            //点击对应组态画面
            var cycle;
            newNode.onclick= function () {
                var configureName1 = this.innerHTML;
                //console.log(configureName1,map);
                for(var j=0;j<100;j++){
                    if(map[j]==configureName1){
                        //console.log(j);
                        var json = localStorage.getItem(project +"#" + j);
                        canvas.loadFromJSON(json);
                         var configureName=localStorage.getItem(project +"#configureName" + j);
                         canvas.add(new fabric.Text(configureName, {
                             left:680,
                             top:20,
                             fontFamily:'Comic Sans',
                             fontSize:30,
                             fill:'green'
                         }));
                    }
                }
                let jsonPresent=JSON.stringify(canvas.toJSON());//canvas上所有对象序列化
                let keyValue=new Array();
                let obj = JSON.parse(jsonPresent);  //对象,即反序列化
                //console.log(jsonPresent,obj);
                for (var p in obj.objects) {
                    if(obj.objects[p].tagId){    //此处不考虑组合,即组合中组合组态无效
                        let key = obj.objects[p].tagId;
                        let value = obj.objects[p].tagValue;
                        let s = new tagKeyValue(key, value);
                        keyValue.push(s);
                       // console.log(obj.objects[p].tagId,obj.objects[p].tagValue,keyValue);
                    }
                }
                //console.log(keyValue,keyValue[0],keyValue[0].key,keyValue[0].value);
                //KV=keyValue;

                //设置循环执行页面刷新
                clearInterval(cycle);
                cycle=setInterval(function () {
                    createTable(keyValue.length,keyValue);
                    canvas.renderAll();
                },1000);
            };
        }
    }
}

//js生成数据列表
function createTable(totalTag,arrayKeyValue){
    //初始化,删除表格table
    var flag=document.getElementsByTagName('table');
    var num=flag.length;
    //console.log(num);
    for(var i=0;i<num;i++){
        flag[i].parentNode.removeChild(flag[i]);
    }
    //创建表格
    //创建对象
    var table = window.document.createElement("table");
    var realtimeData=localStorage.getItem("cacheData");
    var obj_rtd = JSON.parse(realtimeData);//取回本地缓存数据 成对象
    //console.log(obj_rtd,arrayKeyValue);
    //更新arraykeyvalue
    for (var i=0;i<totalTag;i++){
        for (var k in obj_rtd){
            if(k== arrayKeyValue[i].key){
                arrayKeyValue[i].value=obj_rtd[k];
            }
        }
    }
    for(var i=0;i<totalTag;i++){
        let tr = document.createElement("tr");
        let td = document.createElement("td");

        let tagId = arrayKeyValue[i].key;
        let tagValue = arrayKeyValue[i].value;

        let txt = document.createTextNode(tagId+": ");
        let txt2 = document.createTextNode(tagValue);
        //把表格添加到body里去
        td.appendChild(txt);
        td.appendChild(txt2);
        tr.appendChild(td);
        //给表格设置各行变色
        if(i%2 == 0){
            //偶数行
            tr.style.backgroundColor = "white";
        }else{
            //奇数行
            tr.style.backgroundColor = "#f0f8ff";
        }
        table.appendChild(tr);
    }
    table.setAttribute("border",1);
    $('table').appendChild(table);
}

//键值对函数
function tagKeyValue(key,value){
    this.key = key;
    this.value = value
}

//取键值对key
function arrayToKey(array){

}

//取消组合
ungroup.onclick = function () {
    if (!canvas.getActiveObject()) {
        return;
    }
    if (canvas.getActiveObject().type !== 'group') {
        return;
    }
    canvas.getActiveObject().toActiveSelection();
    canvas.requestRenderAll();
};


//更新
function updateSets(){
    if(!canvas.getActiveObject())return;
    //保存原设置
    $('tagId').value=canvas.getActiveObject().tagId;
    $('tagName').value=canvas.getActiveObject().tagName;
    $('tagUplimit').value=canvas.getActiveObject().tagUplimit;
    $('tagDownlimit').value=canvas.getActiveObject().tagDownlimit;
    if(canvas.getActiveObject().tagValue){
        $('tagValue').value=canvas.getActiveObject().tagValue;
    }else {
        $('tagValue').value = "######";
    }
    //console.log(JSON.stringify(canvas.toJSON()));
}
canvas.on({
    'mouse:down':updateSets
})

//监听是否移动到单个对象上 移入变透明度 移出还原
canvas.on('mouse:over', function (options) {
    if(options.target) {
        options.target.set('opacity', 0.8);
        canvas.renderAll();
    }
})
canvas.on('mouse:out', function (options) {
    if(options.target) {
        options.target.set('opacity', 1);
        canvas.renderAll();
    }
})


//默认情况下，按住鼠标拖动时是自带的框选操作。而当按住键盘的 Alt 键时，按下鼠标则可以移动画布
var panning = false;
//鼠标按下
canvas.on('mouse:down', function (e) {
    //按住alt键才可拖动画布
    if(e.e.altKey) {
        panning = true;
        canvas.selection = false;
    }
});
//鼠标抬起
canvas.on('mouse:up', function (e) {
    panning = false;
    canvas.selection = true;
});
//鼠标移动
canvas.on('mouse:move', function (e) {
    if (panning && e && e.e) {
        var delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
    }
});

//实时显示时间
var show = document.getElementById("showtime");
setInterval(function() {
    var time = new Date();
    // 程序计时的月从0开始取值后+1
    var m = time.getMonth() + 1;
    var t = time.getFullYear() + "-" + m + "-"
        + time.getDate() + " " + time.getHours() + ":"
        + time.getMinutes() + ":" + time.getSeconds();
    show.innerHTML ="&nbsp;&nbsp;&nbsp;"+"当前时间:&nbsp;&nbsp;&nbsp;&nbsp;"+t;
}, 1000);

//留用扩展
////取group中的属性
//for (var i = 0; i < obj.objects.length; i++) {
//    if (obj.objects[i].type == "group") {
//        for (var j = 0; j < obj.objects[i].objects.length; j++) {
//            console.log(obj.objects[i].objects[j].tagValue);
//        }
//    } else {
//        console.log(obj.objects[i].tagValue);
//    }
//}

////通信-实时数据
//var ws = new WebSocket("ws://localhost:8181");
//var stock_request = { "stocks": ["A001", "A002", "A003"] };
//var isClose = false;
//var KV = {
//    "A001": 0, "A002": 0, "A003": 0
//};
//
//function updataUI() {
//    ws.onopen = function (e) {
//        console.log('Connection to server opened');
//        isClose = false;
//        ws.send(JSON.stringify(stock_request));
//        console.log("sened a mesg");
//    }
//    //// UI update function  //通过设置CSS来形成颜色改变的动画
//    //var changeStockEntry = function (symbol, originalValue, newValue) {
//    //    var valElem = $('#' + symbol + ' span');
//    //    valElem.html(newValue.toFixed(2));   //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
//    //    if (newValue < originalValue) {
//    //        valElem.addClass('label-danger');
//    //        valElem.removeClass('label-success');
//    //    } else if (newValue > originalValue) {
//    //        valElem.addClass('label-success');
//    //        valElem.removeClass('label-danger');
//    //    }
//    //}
//
//    // WebSocket message handler
//    ws.onmessage = function (e) {
//        var stocksData = JSON.parse(e.data);
//        console.log(stocksData);
//        for (var symbol in stocksData) {
//            if (stocksData.hasOwnProperty(symbol)) {
//                //changeStockEntry(symbol, stocks[symbol], stocksData[symbol]);
//                stocks[symbol] = stocksData[symbol];
//            }
//        }
//
//    };
//    ws.onclose = function (e) {
//        console.log("Connection closed", e);
//        isClose = true;
//    };
//}
//
//$("realtimeStart").onclick=function() {
//    ws = new WebSocket("ws://localhost:8181");
//    updataUI();
//
//};
//$("realtimeStop").onclick=function() {
//    ws.close();
//    isClose = true;
//};

