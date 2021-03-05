/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./launchWx/tbTest.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./common/Maid.js":
/*!************************!*\
  !*** ./common/Maid.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Maid(packageName) {\n  var _this = this;\n\n  this.packageName = packageName;\n\n  if (packageName && !getAppName(packageName)) {\n    toast(\"找不到此应用, 无法提供服务\");\n    this.sleep(1000);\n    exit();\n  }\n\n  this.click = function (x, y) {\n    return click(x, y);\n  };\n\n  this.clickCenter = function (widget) {\n    if (!widget) return false;\n    var rect = widget.bounds();\n    return click(rect.centerX(), rect.centerY());\n  };\n\n  this.clickSelectorCenter = function (selector) {\n    if (!selector) return false;\n    var widget = selector.findOne(2000);\n    return this.clickCenter(widget);\n  };\n\n  this.clickMulti = function (points, interval) {\n    points.forEach(function (point) {\n      this.click(point[0], point[1]);\n      this.sleep(interval);\n    }.bind(this));\n  };\n\n  this.clickMultiCenter = function (widgets) {\n    if (!widgets || widgets.length == 0) return;\n    var points = [];\n    widgets.forEach(function (widget) {\n      var rect = widget.bounds();\n      points.push([rect.centerX(), rect.centerY()]);\n    });\n    this.clickMulti(points);\n  };\n\n  this.clickIdCenter = function (idStr) {\n    if (!idStr) return false;\n    return this.clickSelectorCenter(id(idStr));\n  };\n\n  this.clickTextCenter = function (str) {\n    if (!str) return false;\n    return this.clickSelectorCenter(text(str));\n  };\n\n  this.clickRegTextCenter = function (str) {\n    if (!str) return false;\n    return this.clickSelectorCenter(textMatches(str));\n  };\n\n  this.clickDescCenter = function (str) {\n    if (!str) return false;\n    return this.clickSelectorCenter(desc(str));\n  };\n\n  this.clickRegDescCenter = function (str) {\n    if (!str) return false;\n    return this.clickSelectorCenter(descMatches(str));\n  };\n\n  this.clickClassCenter = function (classNameStr) {\n    if (!className) return false;\n    return this.clickSelectorCenter(className(classNameStr));\n  }; // index表示第几个文字, 从1开始\n\n\n  this.clickNTextCenter = function (str, index) {\n    if (!str) return false;\n    var widgets = text(str).find();\n    if (!widgets) return false;\n    index--;\n\n    for (var i = 0; i < widgets.length; i++) {\n      var widget = widgets[i];\n      if (i == index) return this.clickCenter(widget);else continue;\n    }\n\n    return false;\n  };\n\n  this.pageUp = function (counter, time) {\n    if (counter && time) {\n      for (var i = 0; i < counter; i++) {\n        scrollUp();\n\n        _this.sleep(time);\n      }\n    } else {\n      scrollUp();\n    }\n  };\n\n  this.pageDown = function (counter, time) {\n    if (counter && time) {\n      for (var i = 0; i < counter; i++) {\n        scrollDown();\n\n        _this.sleep(time);\n      }\n    } else {\n      scrollDown();\n    }\n  };\n\n  this.swipe = function (x1, y1, x2, y2, duration) {\n    swipe(x1, y1, x2, y2, duration);\n  };\n\n  this.sleep = function (second) {\n    sleep(second * 1000);\n  };\n\n  this.back = function () {\n    back();\n  };\n\n  this.home = function () {\n    home();\n  };\n\n  this.shell = function (command) {\n    shell(command, true);\n  };\n\n  this.launch = function () {\n    launch(this.packageName);\n  };\n\n  this.waitForActivity = function (activityName) {\n    waitForActivity(activityName);\n  };\n\n  this.launchActivity = function (activityName) {\n    shell(\"am start -n \" + this.packageName + \"/\" + activityName, true);\n    waitForActivity(activityName);\n  };\n\n  this.kill = function () {\n    shell(\"am force-stop \" + this.packageName, true);\n  };\n\n  this.before = function (ignoreSleep) {\n    var source = engines.myEngine().source.toString();\n    source = source.replace(\"/storage/emulated/0/脚本/\", \"\");\n    toast(\"开始执行[\" + source + \"]...\");\n    var WIDTH = Math.min(device.width, device.height);\n    var HEIGHT = Math.max(device.width, device.height);\n    setScreenMetrics(WIDTH, HEIGHT);\n    if (!ignoreSleep) this.sleep(random() * 10); //随机睡眠[0-10]秒, 使签到\\打卡时间不固定\n  };\n\n  this.after = function () {\n    var source = engines.myEngine().source.toString();\n    source = source.replace(\"/storage/emulated/0/脚本/\", \"\");\n    toast(\"结束执行[\" + source + \"]...\");\n    exit();\n  };\n\n  this.getCaptureImg = function () {\n    var img = captureScreen();\n\n    if (!img || typeof img == \"undifined\") {\n      console.log(\"截图失败,退出脚本\");\n      exit();\n    } else {\n      return img;\n    }\n  };\n}\n\nmodule.exports = Maid;\n\n//# sourceURL=webpack:///./common/Maid.js?");

/***/ }),

/***/ "./common/Unlock.js":
/*!**************************!*\
  !*** ./common/Unlock.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//解锁\nfunction Unlock() {\n  this.unlock = function () {\n    if (device.isScreenOn()) {\n      return;\n    } //点亮屏幕\n\n\n    device.wakeUp();\n    sleep(1000); //滑动屏幕到输入密码界面\n\n    swipe(500, 1900, 500, 1000, 1000);\n    sleep(1000);\n    click(821, 883);\n    sleep(500);\n    click(544, 614);\n    sleep(500);\n    click(538, 878);\n    sleep(500);\n    click(810, 1131);\n    sleep(500);\n    click(558, 1414);\n    sleep(500);\n    click(542, 1150);\n    sleep(500);\n  };\n}\n\nmodule.exports = Unlock;\n\n//# sourceURL=webpack:///./common/Unlock.js?");

/***/ }),

/***/ "./launchWx/tbTest.js":
/*!****************************!*\
  !*** ./launchWx/tbTest.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("auto.waitFor();\n\nvar Maid = __webpack_require__(/*! ../common/Maid.js */ \"./common/Maid.js\");\n\nvar maid = new Maid(\"com.taobao.taobao\");\n\nvar Unlock = __webpack_require__(/*! ../common/Unlock.js */ \"./common/Unlock.js\");\n\nvar unlock = new Unlock();\nmaid.before();\nunlock.unlock();\nmaid.sleep(2);\nmaid.kill();\nmaid.sleep(1);\ntoast(\"打开应用\");\nmaid.shell(\"am broadcast -a com.jozein.xedgepro.PERFORM -e data 4383024334022314330286474707A3F2F2D61627B65647E2D6E24716F62616F6E236F6D6F2160707F247D616C6C6D277962756C6563737F247A626D223031383F296E6465687F296E6465687E28647D6C6F3574707162716D6D35273245223232716E6765627F5265736B6564737F5E6164796675652232352331452232347370723138393F51313139363F51313932333522323527344623707D6D31623134313E213E29636F6E6376753E283623736D6D313030373E286F6D656F59636F6E6E2C696E676A626E246624696371626C656E41667D395543532F247A6263294E64756E647B3071636B6167656D336F6D6E24716F62616F6E24716F62616F6B336F6D607F6E656E647D336F6D6E24716F62616F6E24716F62616F6F236F6D6E24716F62616F6E22627F677375627E22427F6773756271436479667964797B335E22756665627275627D386474707523314522364522364D6E24716F62616F6E236F6D652236496E6465687E28647D6B335E25525C4F525546454255425F5F425947494E4D38647470737523314522364522364D61627B65647E2D6E24716F62616F6E236F6D652236416070752236447D616C6C6D277962756C656373752236447A626D22303138352236496E646568752236496E6465687E28647D6C6523364574707162716D6523344522353732452235323232716E6765627F5265736B6564737F5E6164796675652235323235223533314522353232347370723138393F51313139363F51313932333522353232352235373445223633707D65233441623134313E213E29636F6E6376753E2835223633736D652334413030373E286F6D656F59636F6E6E2C696E676A626E2465223634696371626C656E4166752334495543552233352236447A626B324E26627F6D6F5E416679676164796F6E61436479667964797D347275756B356E64602165747F6A637D25254635224735293835254535214545293445254635224735293835254935283735293135254535224835283130206020602\");\nwaitForActivity(\"com.taobao.browser.BrowserActivity\");\nmaid.sleep(10);\nmaid.clickRegDescCenter(\"签到\\+.*\"); //金币签到\n\nmaid.sleep(2);\nscrollUp();\nmaid.click(540, 987); //收金币按钮\n\nmaid.sleep(2);\n\nif (desc(\"取消\").exists()) {\n  maid.clickDescCenter(\"取消\"); //取消庄园大奖赛弹窗\n}\n\nmaid.sleep(3);\nscrollUp();\nclick(995, 1127); //领水滴按钮\n\nmaid.sleep(2);\nmaid.clickDescCenter(\"打卡\"); //领水滴弹出页打卡\n\nmaid.sleep(2);\nmaid.clickClassCenter(\"android.widget.Button\"); //关闭弹出页\n\nmaid.sleep(2);\nmaid.clickTextCenter(\"每日打卡\"); //领水滴弹出页打卡\n\nmaid.sleep(2);\nmaid.click(543, 589); //每日打卡(水滴)\n\nmaid.sleep(2);\nmaid.kill();\nmaid.after();\n\n//# sourceURL=webpack:///./launchWx/tbTest.js?");

/***/ })

/******/ });