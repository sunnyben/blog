var fs = require('fs');
var file = 'signLog.db';//这里写的就是数据库文件的路径
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

module.exports = db