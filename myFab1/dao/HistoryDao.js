var util = require('./DBUtil');
var History_Table = require('../domain/History_Table');

//sql语句
var sql = {
    insertHistoryData : 'insert into history_table(tagId, tagName, value, timestamp) values(?,?,?,?)',
    getHistoryData: 'select * from history_table where tag_id = ? and timestamp between ? and ? order by timestamp asc'
    /*
    updateUser :'update history_table set userId=?,phone=? where id=?',
    getUserById:'select * from user_info where id=?',
    getAllUser : 'select * from user_info',
    deleteUser : 'delete from user_info where id =?',
    getUserByNameAndPwd:'select * from user_info where name=? and password=?'*/

}

function getHistoryData(tagId, beginTime, endTime, callback){
    util.exeSql(sql.getHistoryData,[tagId, beginTime, endTime],function(result){
        //var resultUser = getUserFromResult(result);
        //callback(result);
        var hisrotylist = null;
        if(result.length>0){
            hisrotylist = new Array();
            for(var i=0;i<result.length;i++){
                var history = new History_Table();
                history.id = result[i].id;
                history.tagId = result[i].tagId;
                history.tagName = result[i].tagName;
                history.value = result[i].value;
                history.timestamp = result[i].timestamp;
                hisrotylist[i]=history;
            }

            callback(hisrotylist);
        }else{
            callback(null);
        }
    });
};
/*
function getUserByNameAndPwd(name,password,callback){
    util.exeSql(sql.getUserByNameAndPwd,[name,password],function(result){
        var resultUser = getUserFromResult(result);
        callback(resultUser);
    });

}*/

/*
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

        /!*for(var i=0;i<userlist.length;i++)
            console.log("inner "+userlist[i].name);*!/

    });
}*/

function insertHistoryData(tagId,tagName,value,timestamp,callback){
    util.exeSql(sql.insertHistoryData(),[tagId, tagName, value, timestamp],
        function(result){
            callback("success");
        });
}
/*
function updateUser(userId,phone,id,callback){
    util.exeSql(sql.updateUser,[userId,phone,id],function(result){
        callback("success");
    });
}*/
/*
function deleteUser(id,callback){
    util.exeSql(sql.deleteUser,id,function(result){
        callback("success");
    });

}*/
/*
function getUserFromResult(result){
    var resultUser=null;
    if(result && result.length>0){
        resultUser = new HistoryTable();
        resultUser.id = result[0].id;
        resultUser.tagId = result[0].tagId;
        resultUser.tagName = result[0].tagName;
        resultUser.value = result[0].value;
        resultUser.timestamp = result[0].timestamp;
    }
    return resultUser;
}*/

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
/*
exports.getAllUser = getAllUser;*/
exports.insertHistoryData = insertHistoryData;
exports.getHistoryData = getHistoryData;/*
exports.getUserByNameAndPwd = getUserByNameAndPwd;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;*/