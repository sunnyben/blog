import { unlockMiui, clickByTextDesc, getCaptureImg } from './utils'
var Maid = require("../common/Maid.js");
var maid = new Maid("com.tencent.mm");


var morningTime = "07:18";//自己运动能量生成时间
var startTime = "07:00";
var endTime = "7:35";
var screen_width = 1080;  //设置屏幕的宽度，像素值
var screen_height = 2340; //设置屏幕的高度，像素值

auto(); // 自动打开无障碍服务

// 解锁
unlockMiui()


sleep(2000);
// app.launch("org.autojs.autojs");
// launchApp("支付宝");

// sleep(2000);
// const img = getCaptureImg()

// toast('截图颜色--' + images.pixel(img, 500, 1000));
// exit()


function openAlipay() {
  //launchApp("Alipay");

  launchApp("支付宝");
  toastLog("等待支付宝启动");
  //sleep(3000);
  var i = 0;
  while (!textEndsWith("扫一扫").exists() && !descEndsWith("扫一扫").exists() && i <= 5) {
    sleep(2000);
    i++;
  }
  toastLog("第" + i + "次尝试进入支付宝主页");
  if (i >= 5) {
    toastLog("没有找到支付宝首页");
    sleep(1000);
    clickByTextDesc("首页", 0);
    return false;
  }
  return true;
}

//从支付宝主页进入蚂蚁森林我的主页
function enterMyMainPage() {
  //五次尝试蚂蚁森林入
  var i = 0;
  swipe(screen_width * 0.5, screen_height * 0.5, screen_width * 0.5, screen_height * 0.25, 500);
  sleep(500);
  swipe(screen_width * 0.5, screen_height * 0.25, screen_width * 0.5, screen_height * 0.5, 500);
  while (!textEndsWith("蚂蚁森林").exists() && !descEndsWith("蚂蚁森林").exists() && i <= 5) {
    sleep(1000);
    i++;
  }
  if (i >= 5) {
    toastLog("没有找到蚂蚁森林入口，尝试中");
    clickByTextDesc("首页", 0);
    sleep(2000);
    swipe(screen_width * 0.5, screen_height * 0.3, screen_width * 0.5, screen_height * 0.7, 1000);
    sleep(2000);
    swipe(screen_width * 0.5, screen_height * 0.3, screen_width * 0.5, screen_height * 0.7, 1000);
    sleep(2000);
  }
  clickByTextDesc("蚂蚁森林", 0);

  //等待进入自己的主页,10次尝试
  sleep(3000);
  i = 0;
  while (!textEndsWith("种树").exists() && !descEndsWith("种树").exists() && i <= 10) {
    sleep(1000);
    i++;
  }
  toastLog("第" + i + "次尝试进入自己主页");
  if (i >= 10) {
    toastLog("进入自己能量主页失败");
    return false;
  }

  //收自己能量
  //clickByTextDesc("克",0);
  for (var row = screen_height * 0.256; row < screen_height * 0.376; row += 80)
    for (var col = screen_width * 0.185; col < screen_width * 0.815; col += 80) {
      click(col, row);
    }
  toastLog("自己能量收集完成");
  sleep(100);
  return true;
}

//进入排行榜
function enterRank() {
  toastLog("进入排行榜");
  sleep(2000);
  swipe(screen_width * 0.5, screen_height * 0.8, screen_width * 0.5, screen_height * 0.1, 500);
  sleep(500);
  swipe(screen_width * 0.5, screen_height * 0.8, screen_width * 0.5, screen_height * 0.1, 500);
  toastLog("查看更多好友");
  sleep(500);
  clickByTextDesc("查看更多好友", 0);

  //等待排行榜主页出现
  sleep(3000);
  return true;
}

//在排行榜页面,循环查找可收集好友
function enterOthers() {
  sleep(1000);
  var i = 1;
  var ePoint = getHasEnergyfriend(1);

  //不断滑动，查找好友
  while (ePoint == null) {
    //如果到了收取自己能量的时间，先收取自己能量
    if (myEnergyTime()) {
      return false;
    }
    swipe(screen_width * 0.5, screen_height * 0.7, screen_width * 0.5, screen_height * 0.1, 500);
    sleep(1000);
    ePoint = getHasEnergyfriend(1);
    i++;


    //如果连续15次都未检测到可收集好友,无论如何停止查找 
    if (i > 15) {
      toastLog("程序可能出错,连续" + i + "次未检测到可收集好友");
      return false;
    }
  }

  //找到好友
  //进入好友页面,10次尝试
  click(ePoint.x, ePoint.y + 20);
  sleep(3000);
  i = 0;
  while (!textEndsWith("你收取TA").exists() && !descEndsWith("你收取TA").exists() && i <= 10) {
    sleep(1000);
    i++;
  }
  toastLog("第" + i + "次尝试进入好友主页");
  if (i >= 10) {
    toastLog("进入好友能量主页失败");
    return false;
  }

  //收能量
  //clickByTextDesc("克",0);
  for (var row = screen_height * 0.256; row < screen_height * 0.376; row += 80)
    for (var col = screen_width * 0.185; col < screen_width * 0.815; col += 80) {
      click(col, row);
    }

  //等待返回好友排行榜
  back();

  //返回排行榜成功，继续
  enterOthers();

}

function myEnergyTime(){
  var now =new Date();
  var hour=now.getHours();
  var minu=now.getMinutes();
  var mytime=morningTime.split(":");
  
  if(mytime[0]==hour && (mytime[1]==minu || mytime[1]==minu-1) ){
      return true;
  }else{
      return false;
  }   
}

//从排行榜获取可收集好友的点击位置
function  getHasEnergyfriend(type) {
  var img = getCaptureImg();
  //getCaptureImg();
  //var img = images.read("/storage/emulated/0/DCIM/Screenshots/2.png");
  var p=null;
  if(type==1){
      // 区分倒计时和可收取能量的小手
      p = images.findMultiColors(img, "#ffffff",[[0, -35, "#1da06d"],[0, 23, "#1da06d"]], {
          region: [1043,200 , 1, screen_height-300]
      });
  }
  if(p!=null){
      toastLog("找到好友");
      return p;
  }else {
      //toastLog("此页没有找到可收能量的好友");
      return null;
  }
}

//结束后返回主页面
function whenComplete() {
  toastLog("结束");
  back();
  sleep(1500);
  back();
}

maid.sleep(3);
toast("打开支付宝");
openAlipay()
enterMyMainPage()
//进入排行榜
if (enterRank()) {
  //进入好友主页，收好友能量
  enterOthers();
}
whenComplete();
