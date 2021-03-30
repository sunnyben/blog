import {
  clickSelectorCenter, swipeToFindWidget, clickCenter,
  registEvent, doubleClickLocation, unlockMiui,
  closeAllApp, deviceInfoLog, checkHoliday
} from './utils'

toast("开始执行脚本");
registEvent()

sleep(500);
unlockMiui()

const isHoliday = checkHoliday()
if(isHoliday) {
  sleep(2000);
  toast("非工作日，脚本终止执行");
  exit()
}


// 打开小米商城
sleep(1000);
app.launch("com.xiaomi.market");


// 记录日志
const logReq = () => {
  sleep(1000);
  toast("开始请求");
  http.get("http://192.168.110.205:8199/getTopData?matchingTeamMode=2&seasonId=1", {}, function (res, err) {
    log(res.body.json().data.length);
  });
}

// 关闭微信外的所有app
sleep(1000);
closeAllApp()

// 打开飞书
sleep(1000);
app.launch("com.ss.android.lark");

const toSMSTop = () => {
  // 进入消息页面
  sleep(2000);
  clickSelectorCenter(id("com.ss.android.lark:id/feed_tab"))

  // 双击消息回到顶部
  sleep(1000);
  clickSelectorCenter(id("com.ss.android.lark:id/feed_tab"))
  sleep(100);
  clickSelectorCenter(id("com.ss.android.lark:id/feed_tab"))
  toast("回到顶部");

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
    sleep(3000);
    clickSelectorCenter(text("去打卡"))
    toast("去打卡");
  } else {
    toast("去打卡不存在");
    exit();
  }
}

const toAppPageSign = () => {
  // 进入消息页面
  sleep(2000);
  id("com.ss.android.lark:id/app_center_tab").waitFor()
  clickSelectorCenter(id("com.ss.android.lark:id/app_center_tab"))

  sleep(2000);
  // const target = swipeToFindWidget(text('打卡'), 15, -1)

  toast("daka" + text("打卡").exists());
  if (text("打卡").exists()) {
    sleep(1000);
    // clickSelectorCenter(text("打卡"))
    click("打卡")
  } else {
    toast("打卡不存在");
    exit();
  }
}

const makeSure = () => {
  sleep(1000);
  clickSelectorCenter(text("确定"))
  sleep(1000);
  clickSelectorCenter(text("确定"))
  sleep(1000);
  clickSelectorCenter(text("知道了"))
}


const toSign = (typeStr = '上班') => {
  sleep(5000);
  // 点击上下班打卡
  if (text(typeStr + "打卡").exists()) {
    sleep(1000);
    clickSelectorCenter(text(typeStr + "打卡"))
    makeSure()
  } else {
    text("更新打卡").waitFor()
    toast('更新打卡' + text("更新打卡").exists());
    // 更新打卡
    if (text("更新打卡").exists()) {
      sleep(1000);
      clickSelectorCenter(text("更新打卡"))
      makeSure()
    } else {
      toast("更新打卡不存在");
      return
    }
  }
}


toAppPageSign()

const currentHour = new Date().getHours()
let signType = '下班'
if(currentHour < 13) {
  signType = '上班'
}

toSign(signType)


// 退出
sleep(1000);
toast("脚本运行结束");
exit();