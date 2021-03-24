let express = require("express");
let app = express();

async function getBarData(req, resp) {
	// setTimeout(() => {
	// 	resp.status(200).json({
	// 		status: -1,
	// 		message: 'error',
	// 	})
	// }, 2000)

	setTimeout(() => {
		resp.status(200).json({
			status: 0,
			message: 'success',
			data: {
				"columns": [
					"迭代",
					"需求数",
					"平均开发周期"
				],
				"list": [
					[
						"5月版本",
						5,
						1
					],
					[
						"6月版本",
						26,
						34
					],
					[
						"7月版本(2次用研)",
						104,
						7
					],
					[
						"9月版本",
						38,
						8
					],
					[
						"10.28职业技能玩法版",
						7,
						16
					],
					[
						"12.3日版本",
						12,
						38
					]
				]
			}
		});
	}, 2000)
};

async function getPieData(req, resp) {
	resp.status(200).json({
		status: 0,
		message: 'success',
		data: {
			"columns": [
				"直接访问",
				"邮件营销",
				"联盟广告",
				"视频广告",
				"视频广告",
				"搜索引擎",
			],
			"list": [
				['直接访问', 335],
				['邮件营销', 310],
				['联盟广告', 234],
				['视频广告', 135],
				['搜索引擎', 1548],
			]
		}
	});
};

async function getLineData(req, resp) {
	const randomList = []
	for (let i = 0; i < 12; i++) {
		randomList.push((Math.random() * 100).toFixed(2))
	}
	setTimeout(() => {
		resp.status(200).json({
			status: 0,
			message: 'success',
			data: {
				"columns": [
					"迭代",
					"需求数",
					"平均开发周期"
				],
				"list": [
					[
						"5月版本",
						5,
						1
					],
					[
						"6月版本",
						26,
						34
					],
					[
						"7月版本(2次用研)",
						104,
						7
					],
					[
						"9月版本",
						38,
						8
					],
					[
						"10.28职业技能玩法版",
						7,
						16
					],
					[
						"12.3日版本",
						12,
						38
					]
				]
			}
		});
	}, 1000)

};


async function getBarLineData(req, resp) {
	resp.status(200).json({
		status: 0,
		message: 'success',
		data: {
			"columns": [
				"负责人",
				"延期次数",
				"延期天数"
			],
			"list": [
				[
					"xiaoqing.hou",
					41,
					153.0
				],
				[
					"chace.hu",
					34,
					88.0
				],
				[
					"yoyee.li",
					32,
					101.0
				],
				[
					"ronald.chen",
					27,
					96.0
				],
				[
					"ckeung.lin",
					26,
					65.0
				],
				[
					"nicolas.huang",
					26,
					110.0
				],
				[
					"Damon.su",
					24,
					114.0
				],
				[
					"aoki.chen",
					21,
					105.0
				],
				[
					"Leno.li",
					21,
					40.0
				],
				[
					"hangyu.xia",
					19,
					167.0
				],
				[
					"george.qin",
					19,
					49.0
				],
				[
					"jacob.niu",
					18,
					70.0
				],
				[
					"tom.pang",
					18,
					40.0
				],
				[
					"gaven.yang",
					17,
					110.0
				],
				[
					"junjie.wang",
					16,
					31.0
				],
				[
					"adam.lai",
					15,
					62.0
				],
				[
					"gail.liu",
					15,
					27.0
				],
				[
					"zhemin.zhang",
					14,
					64.0
				],
				[
					"recio.xu",
					11,
					26.0
				],
				[
					"john.xiong",
					8,
					123.0
				],
				[
					"gandalf.huang",
					4,
					31.0
				],
				[
					"leo.li",
					4,
					9.0
				],
				[
					"cinne.yang",
					4,
					24.0
				],
				[
					"tao.jiang",
					4,
					11.0
				],
				[
					"marvin.wu",
					3,
					6.0
				],
				[
					"cc.li",
					2,
					35.0
				],
				[
					"jason.rao",
					1,
					10.0
				],
				[
					"kang.fang",
					1,
					1.0
				],
				[
					"dingkun.deng",
					1,
					2.0
				]
			]
		}
	});
};

module.exports = {
	getBarData,
	getBarLineData,
	getLineData,
	getPieData,
};


// module.exports = app
