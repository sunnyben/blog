auto.waitFor();
var Maid = require("../common/Maid.js");
var maid = new Maid("com.taobao.taobao");
var Unlock = require("../common/Unlock.js");
var unlock = new Unlock();
maid.before();
unlock.unlock();
maid.sleep(2);


maid.kill();
maid.sleep(1);

toast("打开应用");

maid.shell("am broadcast -a com.jozein.xedgepro.PERFORM -e data 4383024334022314330286474707A3F2F2D61627B65647E2D6E24716F62616F6E236F6D6F2160707F247D616C6C6D277962756C6563737F247A626D223031383F296E6465687F296E6465687E28647D6C6F3574707162716D6D35273245223232716E6765627F5265736B6564737F5E6164796675652232352331452232347370723138393F51313139363F51313932333522323527344623707D6D31623134313E213E29636F6E6376753E283623736D6D313030373E286F6D656F59636F6E6E2C696E676A626E246624696371626C656E41667D395543532F247A6263294E64756E647B3071636B6167656D336F6D6E24716F62616F6E24716F62616F6B336F6D607F6E656E647D336F6D6E24716F62616F6E24716F62616F6F236F6D6E24716F62616F6E22627F677375627E22427F6773756271436479667964797B335E22756665627275627D386474707523314522364522364D6E24716F62616F6E236F6D652236496E6465687E28647D6B335E25525C4F525546454255425F5F425947494E4D38647470737523314522364522364D61627B65647E2D6E24716F62616F6E236F6D652236416070752236447D616C6C6D277962756C656373752236447A626D22303138352236496E646568752236496E6465687E28647D6C6523364574707162716D6523344522353732452235323232716E6765627F5265736B6564737F5E6164796675652235323235223533314522353232347370723138393F51313139363F51313932333522353232352235373445223633707D65233441623134313E213E29636F6E6376753E2835223633736D652334413030373E286F6D656F59636F6E6E2C696E676A626E2465223634696371626C656E4166752334495543552233352236447A626B324E26627F6D6F5E416679676164796F6E61436479667964797D347275756B356E64602165747F6A637D25254635224735293835254535214545293445254635224735293835254935283735293135254535224835283130206020602");
waitForActivity("com.taobao.browser.BrowserActivity");
maid.sleep(10);
maid.clickRegDescCenter("签到\+.*"); //金币签到
maid.sleep(2);

scrollUp();

maid.click(540, 987); //收金币按钮
maid.sleep(2);
if (desc("取消").exists()) {
    maid.clickDescCenter("取消"); //取消庄园大奖赛弹窗
}
maid.sleep(3);
scrollUp();

click(995, 1127); //领水滴按钮
maid.sleep(2);


maid.clickDescCenter("打卡"); //领水滴弹出页打卡
maid.sleep(2);



maid.clickClassCenter("android.widget.Button"); //关闭弹出页
maid.sleep(2);
maid.clickTextCenter("每日打卡"); //领水滴弹出页打卡
maid.sleep(2);

maid.click(543, 589); //每日打卡(水滴)
maid.sleep(2);

maid.kill();
maid.after();