import {unlockMiui} from './utils'
var Maid = require("../common/Maid.js");
var maid = new Maid("com.tencent.mm");

auto(); // 自动打开无障碍服务

// 解锁
unlockMiui()

maid.sleep(5);
toast("打开应用");
app.launch("com.tencent.mm");

maid.sleep(2);

// maid.kill();

// app.launch("com.tencent.mm");

// maid.sleep(2);
// maid.launchActivity("com.tencent.mm");

// maid.sleep(2);
// waitForActivity("com.tencent.mm.plugin.sns.ui.SnsTimeLineUI");


// for(var i = 0; i < 100; i++){
//   //点击位置(500, 1000), 每次用时1毫秒
//   press(500, 1000, 1);
// }

// 点击通讯录
// maid.sleep(2);
// maid.clickTextCenter("通讯录");

// 点击朋友圈的返回按钮
maid.sleep(2);
// maid.clickIdCenter('com.tencent.mm:id/ei')
// id('com.tencent.mm:id/ei').find()