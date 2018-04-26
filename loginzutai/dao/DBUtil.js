
//MySql数据库配置
var mysql=require('mysql');

function connectServer(){
	var client = mysql.createConnection({
		host : '127.0.0.1',
		port : '3306',
		user:'root',
		password:'root123',
		database:'equipmentrepairsystem'
	})
	return client;
}

function exeSql(sql,param,callback){
	client = connectServer();
	client.query(
		sql,param,
		function(err,results,fields){
			if(err){
				console.log(err);
				callback(null);
			}else{
				callback(results);
			}

			
			//client.end();
		});

}

exports.exeSql = exeSql;