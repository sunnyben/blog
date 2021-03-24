import {
  clickSelectorCenter, swipeToFindWidget, clickCenter,
  registEvent, doubleClickLocation, unlockMiui,
  closeAllApp
} from './utils'

toast("开始执行脚本");
registEvent()

sleep(500);
unlockMiui()


// 打开微信
sleep(1000);
app.launch("com.tencent.mm");


// 记录日志
const logReq = () => {
  sleep(1000);
  toast("开始请求");
  http.get("http://192.168.110.205:8199/getTopData?matchingTeamMode=2&seasonId=1", {}, function(res, err){
    log(res.body.json().data.length);
  });
}

// 关闭微信外的所有app
sleep(1000);
closeAllApp()

// 打开飞书
sleep(1000);
app.launch("com.ss.android.lark");


// 进入消息页面
sleep(1500);
clickSelectorCenter(id("com.ss.android.lark:id/feed_tab"))

// 双击消息回到顶部
sleep(1000);
clickSelectorCenter(id("com.ss.android.lark:id/feed_tab"))
sleep(100);
clickSelectorCenter(id("com.ss.android.lark:id/feed_tab"))
toast("回到顶部");
// for(let i=0;i<5;i++) {
//   sleep(200);
//   swipe(500, 1000, 500, 1500, 100)
// }
// sml_move(500, 400, 500, 2000, 300)
// sml_move(400, 1800, 800, 230, 1000);
//randomSwipe(500, 400, 500, 2000)
sleep(1000);
const target = swipeToFindWidget(text('展开'), 15, -1)

// swipe(500, 1000, 500, 1500, 100)

// 展开快捷应用
sleep(1000);
swipe(500, 1000, 500, 1500, 500)

// 点击打卡应用
// clickSelectorCenter(id("com.ss.android.lark:id/shortcut_item_container"))

if (text("打卡")) {
  sleep(1000);
  clickSelectorCenter(text("打卡"))
} else {
  toast("打卡不存在");
  exit();
}

// 点击去打卡
if (text("去打卡")) {
  sleep(1000);
  clickSelectorCenter(text("去打卡"))
} else {
  toast("去打卡不存在");
  exit();
}

const toSign = (typeStr='上班') => {
  // 点击上下班打卡
  if (text(typeStr + "打卡")) {
    sleep(1000);
    clickSelectorCenter(text(typeStr + "打卡"))
  } else {
    toast(typeStr + "打卡不存在");
    return
  }

  // 更新打卡
  if (text("更新打卡")) {
    sleep(1000);
    clickSelectorCenter(text("更新打卡"))
    sleep(1000);
    clickSelectorCenter(text("确定"))
    sleep(1000);
    clickSelectorCenter(text("确定"))
    sleep(1000);
    clickSelectorCenter(text("知道了"))
  } else {
    toast("更新打卡不存在");
    return
  }
}

// toSign('上班')


// 退出
toast("脚本运行结束");
sleep(1000);
exit();