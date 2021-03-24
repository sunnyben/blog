var db = require('../utils/db.js');
let express = require("express");
let app = express();
const { getIdParam } = require('../utils/index');
const { getPcaData } = require('../utils/pca.js');

// app.get('/getUserById', function (req, res) {
//   // db.all(`select * from t_user`, (err,res) => {
//   //   if(!err)
//   //     console.log(JSON.stringify(res));
//   //   else
//   //     console.log(err);
//   // });
//   console.log('------/hello-----', new Date().getTime())
//   res.json({a: 123321})
// });



async function getAll(req, resp) {
	// const users = await models.user.findAll();
	let sqlStr = `select * from t_user`
	if (req.query.name) {
		sqlStr += (` where name like "%` + req.query.name + '%"')
	}
	sqlStr += (` order by create_time desc `)
	db.all(sqlStr, (err, res) => {
		if (!err) {
			const pageSize = +req.query.pageSize
			const pageNum = +req.query.pageNum
			let pageData = []

			if (res.length < pageSize * pageNum) {
				pageData = res.slice(pageSize * (pageNum - 1), pageSize * pageNum)
			} else {
				pageData = res.slice(pageSize * (pageNum - 1), pageSize * pageNum)
			}
			resp.status(200).json({
				status: 0,
				message: 'success',
				data: {
					data: pageData,
					pageNum,
					pageSize: res.length,
					totalPages: 1,
					totalSize: res.length,
				}
			});
		} else {
			resp.status(200).json({
				status: -1
			});
		}
	});
};

async function getAllData(req, resp) {
	// const users = await models.user.findAll();
	let sqlStr = `select * from t_user`
	if (req.query.name) {
		sqlStr += (` where name like "%` + req.query.name + '%"')
	}
	sqlStr += (` order by create_time desc `)
	db.all(sqlStr, (err, res) => {
		if (!err) {
			const pageSize = +req.query.pageSize
			const pageNum = +req.query.pageNum
			let pageData = res

			resp.status(200).json({
				status: 0,
				message: 'success',
				data: pageData
			});
		} else {
			resp.status(200).json({
				status: -1
			});
		}
	});
};


async function getById(req, resp) {
	const id = req.query.id
	db.get(`select * from t_user where id = ${id}`, (err, res) => {
		if (!err) {
			resp.status(200).json({
				status: 0,
				data: res
			});
		} else {
			resp.status(200).json({
				status: -1
			});
		}
	});
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		// await models.user.create(req.body);
		// res.status(201).end();
		let timestamp = new Date().getTime()
		var sql1 = db.prepare(`insert into t_user (id,name, create_time) values (${(Math.random()).toFixed(6) * 1000000},'${req.body.name}', ${timestamp});`);
		sql1.run();
		res.status(200).json({
			status: 0,
		});
	}

};

async function update(req, res) {
	//const id = getIdParam(req);
	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id) {
		// await models.user.update(req.body, {
		// 	where: {
		// 		id: id
		// 	}
		// });
		// res.status(200).end();
		var sql3 = db.prepare(`update t_user set name = '${req.body.name}' where id = ${req.body.id}`);
		sql3.run();
		res.status(200).json({
			status: 0,
		});
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function del(req, res) {
	const id = req.body.id;
	if (req.body.id) {
		var sql2 = db.prepare(`delete from t_user where id = ${req.body.id}`);
		sql2.run();
		res.status(200).json({
			status: 0,
		});
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}

};

async function options(req, res) {
	res.status(200).json({
		status: 0,
		data: [{
			value: 'a',
			label: 'a_label',
			extraValue: 'aa',
			extraLabel: 'aaa',
		},{
			value: 'b',
			label: 'b_label',
			extraValue: 'bb',
			extraLabel: 'bbb',
		},{
			value: 'c',
			label: 'c_label',
			extraValue: 'cc',
			extraLabel: 'ccc',
		},]
	});
}

async function optionsList(req, res) {
	const type = req.query.type;
	const province = req.query.province;
	const city = req.query.city;

	const pcaData = getPcaData()

	let data = []
	if (type === 'province') {
		data = pcaData
	} else if (type === 'city') {
		pcaData.some((item) => {
			if (province === item.name) {
				data = item.children
				return true
			}
			return false
		})
	} else if (type === 'area') {
		pcaData.some((item) => {
			if (province === item.name) {
				item.children.some((c) => {
					if (city === c.name) {
						data = c.children
						return true
					}
					return false
				})
				return true
			}
			return false
		})
	}

	data.forEach(_ => {
		_.value = _.name
		_.label = _.name
	})

	res.status(200).json({
		status: 0,
		data
	});

};

async function getOptionsData(req, res) {
	let data = {
		province: '广东省',
		city: '深圳市',
		area: '宝安区'
	}

	res.status(200).json({
		status: 0,
		data
	});
};



async function treeData(req, res) {
	res.status(200).json({
		status: 0,
		data: [{
			"title": "0-0",
			"children": [{
				"title": "0-0-0",
				"children": [{
					"title": "0-0-0-0",
					children: []
				}, {
					"title": "0-0-0-1",
					children: [],
				}, {
					"title": "0-0-0-2",
					children: []
				}]
			}, {
				"title": "0-0-1",
				"children": [{
					"title": "0-0-1-0",
				}, {
					"title": "0-0-1-1",
				}, {
					"title": "0-0-1-2",
				}]
			}, {
				"title": "0-0-2",
			}]
		}, {
			"title": "aaa",
			"children": [{
				"title": "aaa-1",
			}, {
				"title": "aaa-2",
			}, {
				"title": "aaa-3",
			}]
		}, {
			"title": "0-2",
		}]
	});
}

async function getTreeChild(req, res) {
	let data = []
	// if (Math.random() > 0.3) {
	// 	data = [{
	// 		"title": Math.floor(Math.random() * 10000) + '_child',
	// 	}, {
	// 		"title": Math.floor(Math.random() * 10000) + '_child',
	// 	}, {
	// 		"title": Math.floor(Math.random() * 10000) + '_child',
	// 	}]
	// }
	res.status(200).json({
		status: 0,
		data: []
	});
}

async function addNode(req, res) {
	if(req.body.tile && req.body.node) {

	}
	res.status(200).json({
		status: 0,
		data: req.body.tile
	});
}


module.exports = {
	getAll,
	getAllData,
	getById,
	create,
	update,
	del,
	options,
	optionsList,
	getOptionsData,
	treeData,
	getTreeChild,
	addNode,
};

// module.exports = app
