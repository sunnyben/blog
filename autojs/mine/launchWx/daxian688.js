import { clickSelectorCenter, swipeToFindWidget, clickCenter, 
  registEvent, doubleClickLocation } from './utils'

registEvent()

app.launch("com.tencent.mm");
sleep(1000);

toast("返回到微信主界面");

// 点击微信按钮
click(50, 2300);
// while(!click("微信"));
sleep(1000);

// 两次双击回到顶部
doubleClickLocation(50, 2300)
sleep(1000);
doubleClickLocation(50, 2300)

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


// 点击我的
sleep(1000);
click(920, 2250)

// 点击签到
sleep(500);
clickSelectorCenter(text("签到"))

// 点击允许
sleep(500);
clickSelectorCenter(text("允许"))

// 点击仙玩法
sleep(1000);
click(680, 2250)

// 去观看
const toWatchVideo = () => {
  // 观看视频 706 1292
  sleep(500);
  // clickSelectorCenter(text("去观看 0/2"))
  clickSelectorCenter(className('android.view.View').textStartsWith('去观看'))

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

  clickSelectorCenter(className('android.view.View').textStartsWith('去阅读'))
  // if (id("tv_item_label").textMatches(/已签\d+天/).exists()) return true;
  
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

// 去观看
toWatchVideo()

// 去阅读 706  1514
toRead()

// 去评论  706 1740

// 去观看 706  1965

sleep(1000);
exit()