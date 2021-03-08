import { clickSelectorCenter, swipeToFindWidget, clickCenter, 
  registEvent, doubleClickLocation } from './utils'

registEvent()

app.launch("com.tencent.mm");
sleep(1000);

toast("返回到微信主界面");

// com.tencent.mm:id/ei （返回按钮）

// id('com.tencent.mm:id/dub').findOne(2000).click()

// 点击微信按钮
click(50, 2300);
// while(!click("微信"));
sleep(1000);

// 两次双击回到顶部
doubleClickLocation(50, 2300)
sleep(1000);
doubleClickLocation(50, 2300)

// swipe(500, 1800, 500, 800, 50)

// exit()

// 点击文件传输助手
// text('文件传输助手').findOne(2000).click()

const target = swipeToFindWidget(text('转转'), 15)

if (!target) {
  exit()
}

clickCenter(target)

sleep(2000);
back()

sleep(1000);
setText("测试lalal")

sleep(1000);
// 点击发送按钮
clickSelectorCenter(id('com.tencent.mm:id/ay5'))

sleep(1000);
back()
