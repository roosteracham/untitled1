var util = require('./DBUtil');
var User = require('../domain/user_info');

//sql语句
var sql = {
	insertUser :'insert into user_info(userId,name,password,phone) values(?,?,?,?)',
	updateUser :'update user_info set userId=?,phone=? where id=?',
	getUserById:'select * from user_info where id=?',
	getAllUser : 'select * from user_info',
	deleteUser : 'delete from user_info where id =?',
	getUserByNameAndPwd:'select * from user_info where name=? and password=?'
}

function getUserById(id,callback){
	util.exeSql(sql.getUserById,id,function(result){
			var resultUser = getUserFromResult(result);
			callback(resultUser);
	});
};

function getUserByNameAndPwd(name,password,callback){
	util.exeSql(sql.getUserByNameAndPwd,[name,password],function(result){		
			var resultUser = getUserFromResult(result);
			callback(resultUser);
	});

}


function getAllUser(callback){
	var userlist = null;
	util.exeSql(sql.getAllUser,null,function(result){
		if(result.length>0){
			userlist = new Array();
			for(var i=0;i<result.length;i++){
				var resultUser = new User();
				resultUser.id = result[i].id;
				resultUser.userId = result[i].userId;
				resultUser.name = result[i].name;
				resultUser.password = result[i].password;
				resultUser.phone = result[i].phone;
				userlist[i]=resultUser;
			}

			callback(userlist);
		}else{
			callback(null);
		}

		/*for(var i=0;i<userlist.length;i++)
			console.log("inner "+userlist[i].name);*/

	});
}
function insertUser(userId,username,password,phone,callback){
	util.exeSql(sql.insertUser,[userId,username,password,phone],
		function(result){
			callback("success");
		});
}

function updateUser(userId,phone,id,callback){
	util.exeSql(sql.updateUser,[userId,phone,id],function(result){
			callback("success");
		});
}

function deleteUser(id,callback){
	util.exeSql(sql.deleteUser,id,function(result){
		callback("success");
	});

}

function getUserFromResult(result){
	var resultUser=null;
	if(result&&result.length>0){
		resultUser = new User();
		resultUser.id = result[0].id;
		resultUser.userId = result[0].userId;
		resultUser.name = result[0].name;
		resultUser.password = result[0].password;
		resultUser.phone = result[0].phone;
	}
	return resultUser;
}

//test 

/*getAllUser(function(userlist){
	for(var i=0;i<userlist.length;i++)
		console.log(userlist[i].name);
});

insertUser("0009","吴彦祖",'123','wuyanzu@qq.com',"13675452131",'1');

getUserById(1,function(user){
	user.name="大庆";
	updateUser(user);
	console.log(user.id);
})

getUserByNameAndPwd("大庆","123",function(resultUser){
	if(resultUser){
		console.log(resultUser.name);
	}else{
		console.log("error");
	}

});

deleteUser(10);

updateUser('123','123','123',1,function(result){
	console.log("success");
})*/

exports.getAllUser = getAllUser;
exports.insertUser = insertUser;
exports.getUserById = getUserById;
exports.getUserByNameAndPwd = getUserByNameAndPwd;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;