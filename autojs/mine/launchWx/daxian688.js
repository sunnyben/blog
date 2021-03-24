import { clickSelectorCenter, swipeToFindWidget, clickCenter, 
  registEvent, doubleClickLocation, unlockMiui } from './utils'

registEvent()

unlockMiui()

sleep(1000);
app.launch("com.tencent.mm");

sleep(1000);
toast("返回到微信主界面");
// 点击微信按钮
click(50, 2300);
// while(!click("微信"));

sleep(1000);
// 两次双击回到顶部
doubleClickLocation(500, 100)

// 打开小程序页面
sleep(1000);
swipe(500, 1000, 500, 2000, 1000)

// // 点击查询按钮
// sleep(500);
// id('com.tencent.mm:id/k24').findOne(1000).click()

// // 输入搜索内容
// sleep(500);
// // setText("大仙")
// input(0, "大仙")

sleep(500);
clickSelectorCenter(text("大仙688"))


// 签到
const signIn = () => {
  // 点击我的
  sleep(2000);
  toast("进入签到页面");
  click(920, 2250)

  // 已签到时退出
  if(text("已签到").findOne(1000)) {
    toast("已完成签到");
    return
  }

  // 点击签到
  sleep(500);
  clickSelectorCenter(text("签到"))

  // 点击允许
  sleep(500);
  clickSelectorCenter(text("允许"))
}

// 去观看
const toWatchVideo = () => {
  // 观看视频 706 1292
  sleep(500);
  // clickSelectorCenter(text("去观看 0/2"))
  const selector = className('android.view.View').textMatches(/去观看 \d\/2/)
  if(!selector.exists()) {
    toast("已完成观看");
    return
  }
  toast("开始执行观看");

  clickSelectorCenter(selector)

  // 点击第一个视频
  sleep(500);
  click(600, 900)

  // 返回
  sleep(2000);
  back()

  // 点击第二个视频
  sleep(500);
  click(600, 1780)

  // 返回
  sleep(2000);
  back()

  // 返回
  sleep(1000);
  back()
}

// 去阅读
const toRead = () => {
  sleep(500);
  // clickSelectorCenter(text("去阅读 0/2"))

  const flag = clickSelectorCenter(className('android.view.View').textStartsWith('去阅读'))
  // if (id("tv_item_label").textMatches(/已签\d+天/).exists()) return true;
  
  if(!flag) {
    toast("已完成阅读");
    return 
  }

  toast("开始执行阅读");

  // 点击第一个
  sleep(500);
  click(600, 900)

  // 返回
  sleep(2000);
  back()

  // 点击第二个
  sleep(500);
  click(600, 1780)

  // 返回
  sleep(2000);
  back()

  // 返回
  sleep(1000);
  back()
}

// 去评论
const toComment = () => {
  sleep(500);
  const flag = clickSelectorCenter(className('android.view.View').textStartsWith('去评论'))

  if(!flag) {
    toast("已完成评论");
    return 
  }
  toast("开始执行评论");

  // 点击输入按钮
  sleep(500);
  click(600, 2280)

  // 写留言
  sleep(1000);
  // const isSuccess = setText("lala")
  const isSuccess = input("haha")
  toast("输入--" + isSuccess);

  // 第二次输入
  sleep(1000);
  input("haha22")

  // 第三次输入
  sleep(1000);
  input("haha33")

  sleep(1000);
  clickSelectorCenter(text('提交'))

  // 返回
  sleep(2000);
  back()
}

// 观看直播
const toWatchLive = () => {
  // 观看视频 706 1292
  sleep(500);
  // clickSelectorCenter(text("去观看 0/2"))
  const selector = className('android.view.View').textMatches(/去观看 \d\/1/)
  if(!selector.exists()) {
    toast("已完成直播");
    return
  }
  toast("开始执行直播");

  clickSelectorCenter(selector)

  // 点击允许
  sleep(500);
  clickSelectorCenter(text('允许'))

  // 返回
  sleep(2000);
  back()
}

// 签到
signIn()

// 点击仙玩法
sleep(1000);
click(680, 2250)

// let stepNum = 4
// let stepIndex = 0

// while(stepIndex < stepNum) {

// }

// 去观看
toWatchVideo()
 
// 去阅读 706  1514
toRead()

// 去评论  706 1740
toComment()

// 去观看直播 706  1965
toWatchLive()

// 返回微信
sleep(1000);
back()

sleep(1000);
exit()