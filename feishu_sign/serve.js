/*
 * @Author: joby.sun
 * @Date: 2019-11-05 19:51:05
 * @LastEditors: joby.sun
 * @LastEditTime: 2019-11-05 19:51:31
 */
let express = require("express");
let app = express();
var bodyParser = require('body-parser')
var db = require('./utils/db.js');
// let routes = require("./routes/user.js");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const routes = {
	users: require('./routes/users'),
	charts: require('./routes/charts'),
	// instruments: require('./routes/instruments'),
	// orchestras: require('./routes/orchestras'),
	// Add more routes here...
	// items: require('./routes/items'),
};


//设置允许跨域访问该服务.
app.all("*",function (req,res,next) {
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    next();
});

function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

db.run("CREATE TABLE IF NOT EXISTS t_user (id TEXT unique, name TEXT)");

// 添加列
//db.run("ALTER TABLE t_user ADD COLUMN create_time varchar(255)")

// for (const [routeName, routeController] of Object.entries(routes)) {
// 	if (routeController.getAll) {
// 		app.get(
// 			`/testApi/${routeName}`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getAll)
// 		);
// 	}
// 	if (routeController.getAllData) {
// 		app.get(
// 			`/testApi/${routeName}/getAllData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getAllData)
// 		);
// 	}
// 	if (routeController.getById) {
// 		app.get(
// 			`/testApi/${routeName}/getById`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getById)
// 		);
// 	}
// 	if (routeController.create) {
// 		app.post(
// 			`/testApi/${routeName}/create`,
// 			makeHandlerAwareOfAsyncErrors(routeController.create)
// 		);
//   }
//   if (routeController.update) {
// 		app.post(
// 			`/testApi/${routeName}/update`,
// 			makeHandlerAwareOfAsyncErrors(routeController.update)
// 		);
//   }
//   if (routeController.del) {
// 		app.post(
// 			`/testApi/${routeName}/del`,
// 			makeHandlerAwareOfAsyncErrors(routeController.del)
// 		);
// 	}

// 	if (routeController.getBarData) {
// 		app.get(
// 			`/testApi/${routeName}/getBarData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getBarData)
// 		);
// 	}

// 	if (routeController.getBarData) {
// 		app.get(
// 			`/testApi/${routeName}/getBarData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getBarData)
// 		);
// 	}

// 	if (routeController.getBarLineData) {
// 		app.get(
// 			`/testApi/${routeName}/getBarLineData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getBarLineData)
// 		);
// 	}

// 	if (routeController.getLineData) {
// 		app.get(
// 			`/testApi/${routeName}/getLineData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getLineData)
// 		);
// 	}

// 	if (routeController.getPieData) {
// 		app.get(
// 			`/testApi/${routeName}/getPieData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getPieData)
// 		);
// 	}
// 	if (routeController.optionsList) {
// 		app.get(
// 			`/testApi/${routeName}/optionsList`,
// 			makeHandlerAwareOfAsyncErrors(routeController.optionsList)
// 		);
// 	}
// 	if (routeController.options) {
// 		app.get(
// 			`/testApi/${routeName}/options`,
// 			makeHandlerAwareOfAsyncErrors(routeController.options)
// 		);
// 	}
// 	if (routeController.getOptionsData) {
// 		app.get(
// 			`/testApi/${routeName}/getOptionsData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getOptionsData)
// 		);
// 	}
// 	if (routeController.treeData) {
// 		app.get(
// 			`/testApi/${routeName}/treeData`,
// 			makeHandlerAwareOfAsyncErrors(routeController.treeData)
// 		);
// 	}
// 	if (routeController.getTreeChild) {
// 		app.get(
// 			`/testApi/${routeName}/getTreeChild`,
// 			makeHandlerAwareOfAsyncErrors(routeController.getTreeChild)
// 		);
// 	}
// 	if (routeController.addNode) {
// 		app.post(
// 			`/testApi/${routeName}/addNode`,
// 			makeHandlerAwareOfAsyncErrors(routeController.addNode)
// 		);
// 	}
// 	// if (routeController.update) {
// 	// 	app.put(
// 	// 		`/api/${routeName}/:id`,
// 	// 		makeHandlerAwareOfAsyncErrors(routeController.update)
// 	// 	);
// 	// }
// 	// if (routeController.remove) {
// 	// 	app.delete(
// 	// 		`/api/${routeName}/:id`,
// 	// 		makeHandlerAwareOfAsyncErrors(routeController.remove)
// 	// 	);
// 	// }
// }

  
// //   app.get('/hello', function (req, res) {
// //       console.log('------/hello-----', new Date().getTime())
// //       res.json({a: 123321})
// //   });

// //   app.get('/getUserById', function (req, res) {
// //     console.log('------/hello-----', new Date().getTime())
// //     res.json({a: 123321})
// // });
 
app.listen(8018, ()=>{
    console.log("8018");
})