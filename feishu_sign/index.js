var fs = require('fs');
var file = 'test.db';//这里写的就是数据库文件的路径
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// 建表
db.run("CREATE TABLE IF NOT EXISTS t_user (id TEXT unique, name TEXT)");
//增
var sql1 = db.prepare(`insert into t_user (id,name) values (${(Math.random()).toFixed(6) * 1000000},"hzq");`);
sql1.run();
//改
var sql3 = db.prepare("update t_user set name = 'winston' where id = 215799");
sql3.run();
//删
var sql2 = db.prepare("delete from t_user where id = 558349");
//console.log(sql2);
sql2.run();
//查一个表的所有数据
db.all(`select * from t_user`, (err,res) => {
  if(!err)
    console.log(JSON.stringify(res));
  else
    console.log(err);
});
//查一条数据
db.each("select * from t_user",function(err,row){
  console.log(row);
})

