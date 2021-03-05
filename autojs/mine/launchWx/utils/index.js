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