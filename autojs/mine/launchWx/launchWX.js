// launch("com.tencent.mm");

function enterWechatMoment() {
  setScreenMetrics(1080,2340);

  app.launch("com.tencent.mm");
  //确保返回到微信主界面
  sleep(1000);
  toast("返回到微信主界面");
  click(50,2300);

  // // 连续按多次返回，确保回到网协主界面 
  // for (var i = 0; i < 5; i++) {
  //     click(50,140);
  //     sleep(100);
  // }

  sleep(1000);
  toast("点微信 发现");
  // 点微信 发现
  click(600,2300);
  sleep(1000);

  // 点朋友圈入口
  click(300,300);
  sleep(1000);

  // 打开点赞弹窗
  id('com.tencent.mm:id/kn').findOne(2000).click()

  sleep(1000);

  // 关闭点赞弹窗
  id('com.tencent.mm:id/kn').findOne(2000).click()
}

// 截图准备
function prepare() {
  // 滑动刷新朋友圈
  var isSuccess = swipe(500, 300, 500, 1600, 500)
  toast("滑动--" + isSuccess);
  sleep(2000);

  // toast("requestScreenCapture--"+ requestScreenCapture());
  if(!requestScreenCapture()){
      tLog("请求截图失败");
      toast("toast-请求截图失败");
      exit();
  }
  var image = captureScreen();

  var color = images.pixel(image, 500, 500)
  toast("color");
  sleep(2000);
}

// 点赞
function clickLike() {
  sleep(1000);
  var image = captureScreen();
  var arrs = [-1];
  var x = 991;
  var buttonColor = -11048043;

  // 函数返回此次点赞是否成功，如果没找到点赞按钮或者已点赞返回false，做法是否继续的判断
  var isSucceed = true;

  // 扫描出点赞评论按钮的位置，两个点的ARGB颜色为-11048043 
  for(var y = 250; y < 1920; y++) {
      var color = images.pixel(image, x, y);

      // 白色 背景色，跳过
      if (color == -1) {
          continue;
      }
      if (color == buttonColor) {
          // 按下评论点赞按钮  
          click(x, y)
          sleep(1000);

          // 重新截图，找到点赞心形按钮的位置
          var clickimage = captureScreen();

          // 如果这个点的颜色是-1，表示这条朋友圈已经点过赞了，返回点赞失败false
          if (images.pixel(clickimage, 496, y) != -1) {
              // 点赞
              click(523, y);
          } else {
              isSucceed = false;
          }
          sleep(2000);
          // 往下滑动到下一条朋友圈的位置  
          swipe(550, y+200, 550, 150, 200);
          return isSucceed;
      }
  }

  // 如果执行到这，可能是某条朋友圈评论太多，一屏里没有点赞评论按钮，就滑动大半屏再试一次
  swipe(550, 1600, 550, 150, 200);
  return false;
}


function registEvent() {
  //启用按键监听
  events.observeKey();
  //监听音量上键按下
  events.onKeyDown("volume_down", function(event){
      toast("脚本手动退出");
      exit();
  });
}

//程序主入口
function start(){ 
  toast("脚本启动--");
  
  //注册音量键上被按下时退出脚本的执行  
  registEvent();

  // 确保进入微信朋友圈
  enterWechatMoment();
  // prepare();

}
start();