const express = require('express');
const path = require('path');
const app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userDao = require('./dao/userInfoDao');
var user = require('./domain/user_info');
var historyDao = require('./dao/HistoryDao');
var hist = require('./domain/History_Table');
var fs = require("fs");
var readline = require('readline');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'static')));
// view engine setup
app.set('views', path.join(__dirname, 'static'));
app.engine('html',require('ejs').__express);
//app.set('view engine', 'ejs');
app.set('view engine','html');
app.use(cookieParser());
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{ maxAge:1000*60*30}
}));


app.get('/login', function (req, res) {
   res.render('login');
});

app.get('/', function (req, res) {
	res.render('login');
});

app.post('/login', function (req, res) {
  var name = req.body.name;
  var pwd = req.body.password;
	userDao.getUserByNameAndPwd(name,pwd,function(user){
 	if(user){
		// 从数据库获得的user信息放在session中
 		req.session.user = user;
 		//console.log("login suc");
		
		// 把你的页面替换success success是html格式文件
		res.render('run');
	} else {
		//console.log("login failed");
		res.render('login');
	}
  });
});


app.get('/register', function(req, res){
	res.render('register');
});

app.get('/configure', function(req, res){
    res.render('configure');
});

app.post('/export', function(req, res){
	// 操作文件
    //console.log("export : ", req.body);
    exroet(req.body);
    res.render('configure');
});

app.post('/import', function(req, res){
    var p = req.body.projectName;
    console.log(p);
    //读文件，文件内容返回
    var data = getData(p).toString();
    var str = {};
    var index = data.indexOf("\n");
    while (index > -1) {
        var line = data.substring(0, index);
        data = data.substr(index + 1);
        var outId = line.substring(0, 1);
        var d = line.substring(2, index);
        str[outId] = d;
        index = data.indexOf("\n");
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(str));
});

function getData(p) {
    var file = "./zutaiFile/" + p + ".txt";
    return fs.readFileSync(file);
}
app.post('/register', function(req, res){
	var name = req.body.name;
	var pwd = req.body.password;
	var phone = req.body.phone;
	var userId = getUserId();
	if (name === '' || pwd === '' || phone === '' || userId === '') {
		res.render('register');
	} else {
	    userDao.insertUser(userId,name,pwd,phone,function(result){
		if(result){
			res.redirect('/login');
		}else{
			res.send(404);
		}
	});
	}
});

function getUserId() {
	var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
	var date = now.getDate();//得到日期
	var hour = now.getHours();//得到小时
	var minu = now.getMinutes();//得到分钟
	var sec = now.getSeconds();//得到秒
	var userId = '14' + year + month + date + hour + minu + sec;
	return userId;
}
app.listen(8880, () => {
  console.log(`App listening at port 8880`);
});

function isFileExists(id, data) {
	var file = "./zutaiFile/" + id + ".txt";
	fs.appendFile(file, data.outId + "," + JSON.stringify(data) + "\n", (err) => {
	    if (err) {
	        throw err;
        }
        console.log("appendData.");
    });
}

function exroet(data) {
    createPath();
    var projectName = data.projectName;
    isFileExists(projectName, data);
}
