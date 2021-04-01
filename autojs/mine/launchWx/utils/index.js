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
    const redmi_k20pro = [[241, 1225], [236, 1457], [554, 1457], [798, 1457], [796, 1780]]
    const redmi_10x = [[241, 1425], [236, 1657], [554, 1657], [798, 1657], [796, 1980]]

    let currentGesture = redmi_k20pro
    if (device.model === 'M2003J15SC') {
      currentGesture = redmi_10x
    }
    log('currentGesture--', currentGesture)

    gesture(1000, ...currentGesture)
  }
}

// 清除所有应用
export const closeAllApp = () => {
  // 打开应用管理手势
  sleep(1000);
  gesture(1000, [540, 2330], [540, 1840], [540, 1840], [540, 1840])

  sleep(1000);
  clickSelectorCenter(id("com.miui.home:id/clearAnimView"))
}


// 点击文字元素
export const clickByTextDesc = (energyType, paddingY) => {
  var clicked = false;
  if (descEndsWith(energyType).exists()) {
    descEndsWith(energyType).find().forEach(function (pos) {
      var posb = pos.bounds();
      if (posb.centerX() < 0 || posb.centerY() - paddingY < 0) {
        return false;
      }
      //toastLog(pos.id());
      var str = pos.id();
      if (str != null) {
        if (str.search("search") == -1) {
          click(posb.centerX(), posb.centerY() - paddingY);
          //toastLog("get it 1");
          clicked = true;
        }
      } else {
        click(posb.centerX(), posb.centerY() - paddingY);
        //toastLog("get it 2");
        clicked = true;
      }
      sleep(100);
    });
  }

  if (textEndsWith(energyType).exists() && clicked == false) {
    textEndsWith(energyType).find().forEach(function (pos) {
      var posb = pos.bounds();
      if (posb.centerX() < 0 || posb.centerY() - paddingY < 0) {
        return false;
      }
      //toastLog(pos.id());
      var str = pos.id();
      if (str != null) {
        if (str.search("search") == -1) {
          click(posb.centerX(), posb.centerY() - paddingY);
          //toastLog("get it 3"); 
          clicked = true;
        }
      } else {
        click(posb.centerX(), posb.centerY() - paddingY);
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
  if (!requestScreenCapture()) {
    toast("toast-请求截图失败");
    exit();
  }

  toast("toast-截图开始");
  var img0 = captureScreen();
  sleep(100);
  if (img0 == null || typeof (img0) == "undifined") {
    toastLog("截图失败,脚本退出");
    exit();
  } else {
    return img0;
  }
}

export const clickCenter = function (widget) {
  if (!widget)
    return false;
  let rect = widget.bounds();
  return click(rect.centerX(), rect.centerY());
};

export const clickSelectorCenter = function (selector) {
  if (!selector)
    return false;
  let widget = selector.findOne(2000);
  return clickCenter(widget);
};

// 滑动查找组件
export const swipeToFindWidget = (selector, times = 10, dir = 1) => {
  let i = 0;
  let target = null;
  while (i < times) {
    target = selector.findOne(1000)
    if (target) {
      break;
    }
    if (dir == 1) {
      swipe(500, 2000, 500, 300, 200)
    } else {
      swipe(500, 300, 500, 2000, 200)
    }

    sleep(500)
    i++
  }
  return target
}

// 脚本手动退出
export const registEvent = (keyCode = "volume_up") => {
  threads.start(function () {
    //启用按键监听
    events.observeKey();
    //监听音量上键按下
    events.onKeyDown(keyCode, function (event) {
      toast("脚本手动退出");
      exit();
    });
  });
}

export const doubleClickLocation = (x, y) => {
  click(x, y);
  sleep(20);
  click(x, y);
}

export const deviceInfoLog = () => {
  log('device.width---', device.width)
  log('device.height---', device.height)
  log('device.brand---', device.brand)
  log('device.device---', device.device)
  log('device.model---', device.model)
  log('device.product---', device.product)
}

// 是否非工作日
export const checkHoliday = () => {
  const holidayList = [
    '1-1','1-2','1-3',
    '4-3','4-4','4-5',
    '5-1','5-2','5-3','5-4','5-5',
    '6-12','6-13','6-14',
    '9-19','9-20','9-21',
    '10-1','10-2','10-3','10-4','10-5','10-6','10-7', 
  ]
  const wordWeekend = [
    '4-25', '5-8','9-18','9-26','10-9'
  ]
  const today = new Date()

  const todayStr = `${today.getMonth() + 1}-${today.getDate()}`
  if(holidayList.indexOf(todayStr) !== -1) {
    return true
  }
  if(wordWeekend.indexOf(todayStr) !== -1) {
    return false
  }
  const weekDay = today.getDay()
  if(weekDay === 0 || weekDay === 6) {
    return true
  }
  return false
}

// 循环判断控件是否存在
export const widgetExist = (widget, times = 10, interval = 500) => {
  let isExist = false
  let curTime = 0
  while(!(isExist || curTime > times)) {
    const flag = widget.exists()
    if(flag) {
      isExist = true
    }
    curTime++
    sleep(interval)
  }
  return isExist
}