// miui解锁
export const unlockMiui = () => {
  //息屏状态将屏幕唤醒
  if (!device.isScreenOn()) {
    device.wakeUp();//唤醒设备
    sleep(1000); // 等待屏幕亮起


    //miui锁屏滑动不能唤出密码输入 通过下拉通知栏点击时间进入密码解锁
    swipe(500, 30, 500, 1000, 300);

    sleep(1000);

    //点击时间
    click(224, 244);

    //解锁 密码0401
    //     desc(0).findOne().click();
    //     desc(4).findOne().click();
    //     desc(0).findOne().click();
    //     desc(1).findOne().click();

    //等待解锁完成，返回并退出

    // back();
    sleep(1000);

    // 执行密码手势
    gesture(1000, [241, 1225], [236, 1457], [554, 1457], [798, 1457], [796, 1780])
  }
}

// 点击文字元素
export const clickByTextDesc = (energyType,paddingY) => {
  var clicked = false;
  if(descEndsWith(energyType).exists()){
      descEndsWith(energyType).find().forEach(function(pos){
          var posb=pos.bounds();
          if(posb.centerX()<0 || posb.centerY()-paddingY<0){
              return false;
          }
          //toastLog(pos.id());
          var str = pos.id();
          if(str != null){
              if(str.search("search") == -1){
                  click(posb.centerX(),posb.centerY()-paddingY);
                   //toastLog("get it 1");
                   clicked = true;   
              }
          }else{
              click(posb.centerX(),posb.centerY()-paddingY);
              //toastLog("get it 2");
              clicked = true;
          }
          sleep(100);
      });
  }
  
  if(textEndsWith(energyType).exists() && clicked == false){
      textEndsWith(energyType).find().forEach(function(pos){
          var posb=pos.bounds();
          if(posb.centerX()<0 || posb.centerY()-paddingY<0){
              return false;
          }
          //toastLog(pos.id());
          var str = pos.id();
          if(str != null){
              if(str.search("search") == -1){
                  click(posb.centerX(),posb.centerY()-paddingY); 
                  //toastLog("get it 3"); 
                  clicked = true;  
              }
          }else{
              click(posb.centerX(),posb.centerY()-paddingY);
              //toastLog("get it 4");
              clicked = true;
          }
          sleep(100);
      });
  }
  
  return clicked;
}


//获取截图
export const getCaptureImg = () => {    
  //captureScreen("/storage/emulated/0/DCIM/Screenshots/1.png");
  //sleep(500);
  if(!requestScreenCapture()){
      toast("toast-请求截图失败");
      exit();
  }

  toast("toast-截图开始");
  var img0 = captureScreen();
  sleep(100);
  if(img0==null || typeof(img0)=="undifined"){
      toastLog("截图失败,脚本退出");
      exit();
  }else{
     return img0;
  }
}