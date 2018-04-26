/**
 * Created by CC2longer on 18/3/9.
 */
//新增一组>>可以新增各种图元
function add() {
    //填充圆
    var circle = new fabric.Circle({
        top: 200, left: 100, radius: 30, fill: 'gray' });
    //三角形
    var triangle = new fabric.Triangle({
        top: 100, left: 200, width: 60, height: 60, fill: 'gray' });
    //方形
    var rect = new fabric.Rect({
        top: 200, left: 200, width: 60, height: 60, fill: 'gray' });
    //直线
    var line = new fabric.Rect({
        top: 100, left: 100, width: 100, height: 3, fill: 'gray'});

    //直角折线
    //图片
    //表->单独列出:可编辑长宽的表格,表格内容可编辑

    //选中对象后可以上下/左右对齐
    //鼠标右键对象->设置属性/绑定操作对象功能(如对齐)



    canvas.add(circle,triangle,rect,line);

}

//==================================初始化==============================================
//定义$用来方便取元素,jquery功能
var $ = function(id){return document.getElementById(id)};

//初始化画布
var canvas = this.__canvas = new fabric.Canvas('c');
fabric.Object.prototype.transparentCorners = false;
canvas.perPixelTargetFind = true;           //选中对象上的像素才算选中,防止误选正方形空白处
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

//绘制默认初始对象 可用来设置默认界面
//var red = new fabric.Rect({
//    top: 200, left: 200, width: 80, height: 50, fill: 'red' });
//var blue = new fabric.Rect({
//    top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
//var green = new fabric.Rect({
//    top: 100, left: 100, width: 60, height: 60, fill: 'green' });
//canvas.add(red)

//声明按键功能
var group = $('group'), //组合选中
    ungroup = $('ungroup'), //取消组合
    multiselect = $('multiselect'), //全选
    addmore = $('addmore'), //新增一组
    discard = $('discard'), //取消选中
    deleteObject = $('deleteObject'), //删除对象
    clearAll = $('clearAll'),   //清空
    copy = $('copy'),  //复制
    paste = $('paste'),  //粘贴
    //exportObject = $('exportObject'), //导出
    //importObject = $('importObject'), //导入
    toBottom = $('toBottom'), //置底
    toTop = $('toTop'), //置顶
    test1 = $('test1'),
    exportToLib = $('exportToLib');//导出控件
    exportToConf = $('exportToConf');//导出画面
    addLib = $('addLib');

    addLine2=$('addLine2'), //矩形画成的直线
    addRect=$('addRect'),   //矩形
    addTriangle=$('Triangle'),   //三角形
    addCircle=$('addCircle'),   //圆
    addCircle2=$('addCircle2'),   //圆环
    addEllipse=$('addEllipse'),  //椭圆
    addText=$('addText'),   //文本
    addImg=$('addImg'); //图片
    addSVG = $('addSVG');//SVG
    dateDisplay=$('dateDisplay'); //数据显示

//添加自定义类
fabric.Labeledrect = fabric.util.createClass(fabric.Rect, {

    type: 'labeledrect',

    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('label', options.label || '');
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);
        ctx.font = '16px Helvetica';
        ctx.fillStyle = '#000000';
        ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);
    }
});
fabric.Labeledrect.fromObject = function(object, callback, forceAsync) {
    return fabric.Object._fromObject('Labeledrect', object, callback, forceAsync);
}

//==================================图元==============================================
//新增直线
// addLine.onclick= function(){
//    canvas.add(new fabric.Line([10, 10, 100, 100],{
//        //stroke:'red',
//        fill: 'red'
//    }));
//}
//此法以矩形替代直线 便于操作

addLine2.onclick=drawLine;
function drawLine(){
    canvas.add(new fabric.Rect({
        top: 300, left: 150, width: 150, height: 3, fill: 'gray'
    }))
}

//新增矩形
addRect.onclick=function(){
    var rect = new fabric.Rect({
        top:200,
        left:200,
        width:60,
        height:60,
        fill:'gray',
        //tagId:'AB.CD-123',
    });
    //自定义属性:位号tagId,名称tagName,示值tagValue,上下限tagUplimit/tagDownlimit
    rect.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                tagId:this.tagId,
                tagName: this.tagName,
                tagValue:this.tagValue,
                tagUplimit:this.tagUplimit,
                tagDownlimit:this.tagDownlimit,
            });
        };
    })(rect.toObject);
    //rect.tagId='AB.CD-123';
    //rect.tagName = '装置ABC';
    //rect.tagValue = 123.456;
    //rect.tagUplimit=10000;
    //rect.tagDownlimit=100;
    //canvas.add(rect);
    //
    //if(canvas.item(0).tagValue<130){
    //    canvas.item(0).set('fill','red');
    //}
    canvas.add(rect);
}

//新增三角形
addTriangle.onclick=function(){
    var triangle = new fabric.Triangle({
        top:100,
        left:200,
        width:60,
        height:60,
        fill:'gray',
    });
    //自定义属性:位号tagId,名称tagName,示值tagValue,上下限tagUplimit/tagDownlimit
    triangle.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                tagId:this.tagId,
                tagName: this.tagName,
                tagValue:this.tagValue,
                tagUplimit:this.tagUplimit,
                tagDownlimit:this.tagDownlimit,
            });
        };
    })(triangle.toObject);
    canvas.add(triangle);
}
//新增圆形
addCircle.onclick=function(){
    var circle = new fabric.Circle({
        top:200,
        left:100,
        radius:30,
        fill:'gray',
        //tagId:'AB.CD-123',
    });
    //自定义属性:位号tagId,名称tagName,示值tagValue,上下限tagUplimit/tagDownlimit
    circle.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                tagId:this.tagId,
                tagName: this.tagName,
                tagValue:this.tagValue,
                tagUplimit:this.tagUplimit,
                tagDownlimit:this.tagDownlimit,
            });
        };
    })(circle.toObject);
    canvas.add(circle);
    }


//新增圆环
addCircle2.onclick=function(){
    canvas.add(new fabric.Circle({
        top: 300, left: 100, radius: 30, fill: 'white',strokeWidth: 5, stroke: 'black'
    }))
}

//新增椭圆
addEllipse.onclick=function(){
    var ellipse = new fabric.Ellipse({
        top:200,
        left:400,
        rx: 30,
        ry: 55,
        fill:'gray',
        angle: 90
    });
    //自定义属性:位号tagId,名称tagName,示值tagValue,上下限tagUplimit/tagDownlimit
    ellipse.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                tagId:this.tagId,
                tagName: this.tagName,
                tagValue:this.tagValue,
                tagUplimit:this.tagUplimit,
                tagDownlimit:this.tagDownlimit,
            });
        };
    })(ellipse.toObject);
    canvas.add(ellipse);
}

//新增一组
addmore.onclick = add;


//文本框
//清除上标下标格式-预留功能
//function remove() {
//    var active = canvas.getActiveObject();
//    if (!active) return;
//    active.setSelectionStyles({
//        fontSize: undefined,
//        deltaY: undefined,
//    });
//    canvas.requestRenderAll();
//}
//上标-预留功能
function superScript() {
    var active = canvas.getActiveObject();
    if (!active) return;
    active.setSuperscript();
    canvas.requestRenderAll();
}
//下标-预留功能
function subScript() {
    var active = canvas.getActiveObject();
    if (!active) return;
    active.setSubscript();
    canvas.requestRenderAll();
}
//addText.onclick= function () {
//    canvas.add(new fabric.Textbox('请输入文字',{
//        left:200,
//        top:20,
//        fill: 'blue',
//        fontSize:20,
//        //strokeWidth: 2,
//        //stroke: "#D81B60",
//    }))
//}
////新增文本
//addText.onclick=function(){
//    canvas.add(new fabric.Text('欢迎使用图元编辑器',
//        {
//            left:200,
//            top:20,
//            fontFamily:'Comic Sans',
//            fontSize:30
//        }
//    ))
//}
addText.onclick=function(){
    var textCont='请输入文字';
    var text = new fabric.Textbox(textCont,{
        top:20,
        left:200,
        fill:'blue',
        fontSize:20,
    });
    //自定义属性:位号tagId,名称tagName,示值tagValue,上下限tagUplimit/tagDownlimit
    text.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                tagId:this.tagId,
                tagName: this.tagName,
                tagValue:this.tagValue,
                tagUplimit:this.tagUplimit,
                tagDownlimit:this.tagDownlimit,
            });
        };
    })(text.toObject);
    //text.text = '22';
    //text.set({ text: "22" });
    canvas.add(text);
}

//数据显示
dateDisplay.onclick=function(){
    var textCont='数据显示值';
    var text = new fabric.Textbox(textCont,{
        top:20,
        left:400,
        fill:'black',
        fontSize:20,
    });
    //自定义属性:位号tagId,名称tagName,示值tagValue,上下限tagUplimit/tagDownlimit
    text.toObject = (function(toObject) {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                tagId:this.tagId,
                tagName: this.tagName,
                tagValue:this.tagValue,
                tagUplimit:this.tagUplimit,
                tagDownlimit:this.tagDownlimit,
            });
        };
    })(text.toObject);
    //text.tagValue=12.14;
    if(text.tagValue){
        text.text = String(text.tagValue);
    }else {
        text.text="######";
    }
    canvas.add(text);
}


//图片,也可以加入自定义tag,同svg.
addImg.onclick=function() {
    var imgURL='img/test.jpg';
    fabric.Image.fromURL(imgURL, function(objects) {
        var img = objects.scale(0.5);
        img.toObject = (function(toObject) {
            return function() {
                return fabric.util.object.extend(toObject.call(this), {
                    tagId:this.tagId,
                    tagName: this.tagName,
                    tagValue:this.tagValue,
                    tagUplimit:this.tagUplimit,
                    tagDownlimit:this.tagDownlimit,
                });
            };
        })(img.toObject);
        canvas.centerObject(img);
        canvas.add(img).renderAll();
    });
};

//SVG,用法与图元一样,包括自定义属性tag类,基本设置(大小颜色形状等均适用).
addSVG.onclick=function() {
    var svgURL='img/arrow.svg';
    //若载入的svg含有多个元素,此法可以,不过会重叠在一起,需要调整
    //fabric.loadSVGFromURL(svgURL, function (objects) {
    //    for (var i=0;i<objects.length;i++) {
    //        canvas.add(objects[i].scale(5));
    //        canvas.centerObject(objects[i].scale(5));
    //    }
    //    canvas.renderAll();
    //});
    fabric.loadSVGFromURL(svgURL, function (objects) {
        var svg = objects[0].scale(5);
        svg.toObject = (function(toObject) {
            return function() {
                return fabric.util.object.extend(toObject.call(this), {
                    tagId:this.tagId,
                    tagName: this.tagName,
                    tagValue:this.tagValue,
                    tagUplimit:this.tagUplimit,
                    tagDownlimit:this.tagDownlimit,
                });
            };
        })(svg.toObject);
        canvas.centerObject(svg);
        canvas.add(svg);
    });
};

//==================================操作==============================================
//全部选中
multiselect.onclick = function () {
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
};

//取消选中
discard.onclick = function () {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
};

//组合选中
group.onclick = function () {
    if (!canvas.getActiveObject()) {
        return;
    }
    if (canvas.getActiveObject().type !== 'activeSelection') {
        return;
    }
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
};

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

//复制
copy.onclick=function(){
    if (!canvas.getActiveObject()) {
        return;
    }
    canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
    });
}

//粘贴,右下偏移50像素
paste.onclick= function () {
    _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 50,
            top: clonedObj.top + 50,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        _clipboard.top += 50;
        _clipboard.left += 50;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}

//删除对象
deleteObject.onclick = function(){
    if (!canvas.getActiveObject()) {
        return;
    }
    if (canvas.getActiveObject().type == 'activeSelection'){
        canvas.getActiveObject().toGroup(); //先组合成一个对象再删
        canvas.remove(canvas.getActiveObject());
    }
    canvas.remove(canvas.getActiveObject());
    //canvas.clearContext(canvas.getActiveObject()); // 清除画布元素的指定上下文 效果同上
    canvas.requestRenderAll();
};
// 键盘快捷键操作对象
canvas.on(
    'object:selected', function () {
    // 监控页面的键盘事件
    document.onkeydown = function (e) {
        // 是否点击ctrl+delete
        if (e.ctrlKey&&e.keyCode === 8) {
            // 移除当前所选对象
            if (canvas.getActiveObject().type == 'activeSelection'){
                canvas.getActiveObject().toGroup(); //先组合成一个对象再删
                canvas.remove(canvas.getActiveObject());
            }
            canvas.remove(canvas.getActiveObject());
            //canvas.clearContext(canvas.getActiveObject()); // 清除画布元素的指定上下文 效果同上
            canvas.requestRenderAll();
        }
        //esc取消选中
        if(e.keyCode===27) {
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
        //ctrl+c复制
        //  e.returnValue=false; //浏览器快捷禁用
        if(e.ctrlKey&& e.keyCode==67){
            canvas.getActiveObject().clone(function(cloned) {
                _clipboard = cloned;
            });
        }
        //ctrl+v粘贴
        if(e.ctrlKey&& e.keyCode==86){
            _clipboard.clone(function(clonedObj) {
                canvas.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 50,
                    top: clonedObj.top + 50,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    clonedObj.canvas = canvas;
                    clonedObj.forEachObject(function(obj) {
                        canvas.add(obj);
                    });
                    clonedObj.setCoords();
                } else {
                    canvas.add(clonedObj);
                }
                _clipboard.top += 50;
                _clipboard.left += 50;
                canvas.setActiveObject(clonedObj);
                canvas.requestRenderAll();
            });
        }
    }
});

//置顶置底局限性:只能处理两层.
//如果可以观察其它对象global...的设置,理论上可以实现多对象层级设置.
//对象置底
toBottom.onclick= function () {
    if (!canvas.getActiveObject()) {
        return;
    }
    canvas.getActiveObject().set('globalCompositeOperation','destination-over');
    canvas.renderAll();
    // console.log(JSON.stringify(canvas.toJSON([])));
}
//对象置顶
toTop.onclick= function () {
    if (!canvas.getActiveObject()) {
        return;
    }
    canvas.getActiveObject().set('globalCompositeOperation','sonrce-over');
    canvas.renderAll();
    // console.log(JSON.stringify(canvas.toJSON([])));
}

//清空页面
clearAll.onclick =function(){
    var conf= confirm("警告:清空将无法恢复.是否清空?");
    if(conf==true){
        canvas.clear().renderAll();
        canvas.requestRenderAll();
    }
};

//生成本地库关键在调用时,全局刷新,不能保留上一次状态,考虑复用:复制+粘贴实现.
////生成本地图库
//exportToLib.onclick= function () {
//    let group=JSON.stringify(canvas.toJSON());
//    localStorage.setItem($('outProjectName') + $('outId').value, group);
//}
////载入图库-反序列化
//addLib.onclick= function () {
//    //从图库里载入
//    let origin=JSON.stringify(canvas.toJSON());
//    let lib=localStorage.getItem($('outProjectName') + $('outId').value);
//    console.log(origin, lib);
//}
//生成本地库就是复制到本地变量localStorage
//载入图库就是从本地变量粘贴,有局限性
exportToLib.onclick= function () {
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas
    });
    canvas.setActiveObject(sel);
    if (!canvas.getActiveObject()) {
        return;
    }
    canvas.getActiveObject().clone(function(cloned) {
        outProject=cloned;
        let address=$('outProjectName').value + $('outId').value;
        //address=outProject;
        var group=JSON.stringify(outProject);
        console.log(outProject,address,group);//obj,var,str
        //localStorage.setItem(address,outProject);
        localStorage.setItem(address,group);
    });
    canvas.renderAll();
};
addLib.onclick= function () {
    var address=$('outProjectName').value + $('outId').value;
    var lib=localStorage.getItem(address);//字符串
    var libObj = JSON.parse(lib); //对象
    console.log(address,lib,libObj);

    //
    //canvas.discardActiveObject();
    //var sel = new fabric.ActiveSelection(canvas.getObjects(), {
    //    canvas: canvas
    //});
    //canvas.setActiveObject(sel);
    //if (!canvas.getActiveObject()) {
    //    return;
    //}

    //canvas.loadFromJSON(lib);
    //canvas.renderAll();
   var present = canvas.getActiveObject();

    outProject.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 50,
            top: clonedObj.top + 50,
            evented: true
        });
        if (clonedObj.type === 'activeSelection') {
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        canvas.setActiveObject(clonedObj);
        canvas.renderAll();
    });
};




//导出组态页面-序列化
exportToConf.onclick= function () {
    //console.log(canvas.toDatalessJSON());
    console.log(JSON.stringify(canvas.toJSON()));
    //console.log(JSON.stringify(canvas.toObject()));
    let json=JSON.stringify(canvas.toJSON());
    //console.log(canvas.item(0));
    if(json=='{"version":"1.0.0","objects":[]}') {alert("组态画面为空!");return;}

    //存入本地
    //localStorage.clear();//清本地,慎用
    if((!$('outId').value)&&(!$('outName').value)) {
        alert("请在导出设置中设置工程/编号/命名");
    }else{
        localStorage.setItem($('outProjectName').value +"#"+ $('outId').value, json);//存画面
        localStorage.setItem($('outProjectName').value +"#"+"configureName" + $('outId').value, $('outName').value);//存名称
        alert("导出完毕,工程名:"+$('outProjectName').value+";编号:" + $('outId').value + "; 命名:" + $('outName').value);
    }
}


//test1.onclick= function () {
//    //console.log(JSON.stringify(canvas.toJSON()));
//    //var json1=JSON.stringify(canvas.toJSON([]));
//    //var obj = JSON.parse(json1);
//    //console.log(canvas.item(1).fill,canvas.item(1).type);
//    //console.log(obj.objects[1].fill,obj.objects[1].type);
//    var json={
//        "objects": [{
//            "type": "group",
//            "left": 380,
//            "top": 150,
//            "width": 161,
//            "height": 161,
//            "objects": [{
//                "type": "rect",
//                "left": 50,
//                "top": 50,
//                "width": 60,
//                "height": 60,
//                "fill": "blue"
//            }, {
//                "type": "triangle",
//                "left": 50,
//                "top": -50,
//                "width": 60,
//                "height": 60,
//                "fill": "gray",
//                "tagId":"E001",
//                "tagValue":13.14,
//            }]
//        }, {
//            "type": "circle",
//            "left": 100,
//            "top": 200,
//            "fill": "red",
//            "radius": 30,
//            "tagId":"E001",
//            "tagValue":13.14,
//        }]
//    };
//    var json1 = JSON.stringify(json); //字符串
//    var obj = JSON.parse(json1);  //对象
//    canvas.loadFromJSON(json);
//    canvas.renderAll();
//    console.log(json1);
//    console.log(obj.objects.length);
//    //for(var i=0;i<obj.objects.length;i++){
//    //    console.log(obj.objects[i].type);
//    //};
//    for(var p in obj.objects){
//        console.log(obj.objects[p].type);
//    };
//    //取group中的属性
//    for(var i=0;i<obj.objects.length;i++){
//        if(obj.objects[i].type=="group") {
//                for(var j=0;j<obj.objects[i].objects.length;j++){
//                    console.log(obj.objects[i].objects[j].fill);
//                }
//            }else {
//                console.log(obj.objects[i].fill);
//            }
//    };
//}



//==================================设置==============================================
//属性条设置属性
//形状位置设置  其中各种缩放要设成响应式 即比例 不是固定值!
var angleControl = $('angle-control');
angleControl.oninput = function() {
    if(!canvas.getActiveObject())   return;
    canvas.getActiveObject().set('angle', parseInt(this.value, 10)).setCoords();
    canvas.getActiveObject().centeredRotation=document.getElementById('centeredRotation').checked; //选择当前旋转中心
    canvas.requestRenderAll();
};

var leftControl = $('left-control');
leftControl.oninput = function() {
    if(!canvas.getActiveObject())   return;
    canvas.getActiveObject().set('left', parseInt(this.value, 10)).setCoords();
    canvas.requestRenderAll();
};

var topControl = $('top-control');
topControl.oninput = function() {
    if(!canvas.getActiveObject())   return;
    canvas.getActiveObject().set('top', parseInt(this.value, 10)).setCoords();
    canvas.requestRenderAll();
};

var scaleControl = $('scale-control');
scaleControl.oninput = function() {
    if(!canvas.getActiveObject())   return;
    canvas.getActiveObject().centeredScaling=document.getElementById('centeredScaling').checked; //选择当前缩放设置
    canvas.getActiveObject().scale(parseFloat(this.value)).setCoords();
    canvas.requestRenderAll();
};

var skewXControl = $('skewX-control');
skewXControl.oninput = function() {
    if(!canvas.getActiveObject())   return;
    canvas.getActiveObject().set('skewX', parseInt(this.value, 10)).setCoords();
    canvas.requestRenderAll();
};

var skewYControl = $('skewY-control');
skewYControl.oninput = function() {
    if(!canvas.getActiveObject())   return;
    canvas.getActiveObject().set('skewY', parseInt(this.value, 10)).setCoords();
    canvas.requestRenderAll();
};


//操作对象更新属性条
function updateControls() {
    if(!canvas.getActiveObject())return;
    angleControl.value = canvas.getActiveObject().angle;
    leftControl.value = canvas.getActiveObject().left;
    topControl.value = canvas.getActiveObject().top;
    scaleControl.value = canvas.getActiveObject().scaleX;
    skewXControl.value = canvas.getActiveObject().skewX;
    skewYControl.value = canvas.getActiveObject().skewY;
}
canvas.on({
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls,
    'object:skewing': updateControls,
    'mouse:down': updateControls

});


//颜色属性设置
//单选
function observeBoolean(property) {
    document.getElementById(property).onclick = function() {
        if(!canvas.getActiveObject()) return;
        canvas.getActiveObject()[property] = this.checked;
        canvas.renderAll();
    };
}

//二选一
function observeRadio(property) {
    document.getElementById(property).onchange = function() {
        if(!canvas.getActiveObject()) return;
        var name = document.getElementById(this.id).name;
    //    console.log(name, this.id, this.value);
        canvas.getActiveObject()[name] = this.value;
        canvas.renderAll();
    };
}

//控制点\边框颜色\位号设置
function observeValue(property) {
    document.getElementById(property).oninput = function() {
        if(!canvas.getActiveObject()) return;
        //canvas.getActiveObject()[property] = this.value;
        canvas.getActiveObject().set(property,this.value);
        canvas.renderAll();
    };
}

//条形
//function observeNumeric(property) {
//    document.getElementById(property).oninput = function() {
//        canvas.item(0)[property] = parseFloat(this.value);
//        canvas.renderAll();
//    };
//}
//多选(8)
//function observeOptionsList(property) {
//    var list = document.querySelectorAll('#' + property +
//        ' [type="checkbox"]');
//    console.log(list);
//    for (var i = 0, len = list.length; i < len; i++) {
//        list[i].onchange = function() {
//            console.log(property, this.name, this.checked);
//            canvas.getActiveObject()[property](this.name, this.checked);
//            canvas.renderAll();
//        };
//    };
//}

observeBoolean('hasControls');
observeBoolean('hasRotatingPoint');
observeBoolean('evented');
observeBoolean('transparentCorners');
observeBoolean('centeredScaling');
//observeBoolean('centeredRotation');

observeRadio('cornerStyle1');
observeRadio('cornerStyle2');

observeValue('borderColor');
observeValue('cornerColor');
observeValue('fill');

observeValue('tagId');
observeValue('tagName');
observeValue('tagUplimit');
observeValue('tagDownlimit');

//更新
function updateSets(){
    if(!canvas.getActiveObject())return;
    document.getElementById('hasControls').checked=canvas.getActiveObject().hasControls;
    document.getElementById('hasRotatingPoint').checked=canvas.getActiveObject().hasRotatingPoint;
    document.getElementById('evented').checked=canvas.getActiveObject().evented;
    document.getElementById('transparentCorners').checked=canvas.getActiveObject().transparentCorners;
    document.getElementById('centeredScaling').checked=canvas.getActiveObject().centeredScaling;
    //document.getElementById('centeredRotation').checked=canvas.getActiveObject().centeredRotation;

    //console.log(document.getElementById('cornerStyle1').checked,document.getElementById('cornerStyle2').checked,canvas.getActiveObject().cornerStyle);
    //保存原形状
    if(canvas.getActiveObject().cornerStyle=='rect'){
        document.getElementById('cornerStyle1').checked=true;
        document.getElementById('cornerStyle2').checked=!document.getElementById('cornerStyle1').checked;
    }else {
        document.getElementById('cornerStyle1').checked=false;
        document.getElementById('cornerStyle2').checked=!document.getElementById('cornerStyle1').checked;
    }

    //保存原色
    document.getElementById('borderColor').value=canvas.getActiveObject().borderColor;
    document.getElementById('cornerColor').value=canvas.getActiveObject().cornerColor;
    document.getElementById('fill').value=canvas.getActiveObject().get('fill');

    //保存原设置
    $('tagId').value=canvas.getActiveObject().tagId;
    $('tagName').value=canvas.getActiveObject().tagName;
    $('tagUplimit').value=canvas.getActiveObject().tagUplimit;
    $('tagDownlimit').value=canvas.getActiveObject().tagDownlimit;

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
////鼠标滚轮监听 配合jquery
//$(".upper-canvas").mousewheel(function(event) {
//    var zoom = (event.deltaY > 0 ? 0.1 : -0.1) + canvas.getZoom();
//    zoom = Math.max(0.1,zoom); //最小为原来的1/10
//    zoom = Math.min(3,zoom); //最大是原来的3倍
//    var zoomPoint = new fabric.Point(event.pageX, event.pageY);
//    canvas.zoomToPoint(zoomPoint, zoom);
//});

//==================================测试==============================================
//测试对象类型
//canvas.on("mouse:down", function (options) {
//    if (options.target){
//        console.log(typeof options.target);
//    }
//})


//自定义子类

//    fabric.util.object.extend(fabric.object.prototype,{
//        tagName:function(){
//            this.value=1;
//        }
//    })

//var rect = new fabric.Rect({
//    left: 100,
//    top: 100,
//    fill: 'red',
//    width: 20,
//    height: 20
//});
//rect.toObject = (function (toObject) {
//    return function () {
//        return fabric.util.object.extend(toObject.call(this), {
//            depth: 10
//        });
//    };
//})(rect.toObject);
//canvas.add(rect);
////fabric.Object.prototype.toObject = (function (toObject) {
////return function () {
////    return fabric.util.object.extend(toObject.call(this), {
////        tagName: 10
////    });
////};
////})(fabric.Object.prototype.toObject);
//
//canvas.on("mouse:down", function () {
//
//        console.log(rect.depth);
//
//})

