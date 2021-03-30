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
/******/ 	return __webpack_require__(__webpack_require__.s = "./launchWx/xwTest.js");
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

/***/ "./launchWx/utils/index.js":
/*!*********************************!*\
  !*** ./launchWx/utils/index.js ***!
  \*********************************/
/*! exports provided: unlockMiui, closeAllApp, clickByTextDesc, getCaptureImg, clickCenter, clickSelectorCenter, swipeToFindWidget, registEvent, doubleClickLocation, deviceInfoLog, checkHoliday */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unlockMiui\", function() { return unlockMiui; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeAllApp\", function() { return closeAllApp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickByTextDesc\", function() { return clickByTextDesc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCaptureImg\", function() { return getCaptureImg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickCenter\", function() { return clickCenter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clickSelectorCenter\", function() { return clickSelectorCenter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"swipeToFindWidget\", function() { return swipeToFindWidget; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"registEvent\", function() { return registEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"doubleClickLocation\", function() { return doubleClickLocation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deviceInfoLog\", function() { return deviceInfoLog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkHoliday\", function() { return checkHoliday; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// miui解锁\nvar unlockMiui = function unlockMiui() {\n  //息屏状态将屏幕唤醒\n  if (!device.isScreenOn()) {\n    device.wakeUp(); //唤醒设备\n\n    sleep(1000); // 等待屏幕亮起\n    //miui锁屏滑动不能唤出密码输入 通过下拉通知栏点击时间进入密码解锁\n\n    swipe(500, 30, 500, 1000, 300);\n    sleep(1000); //点击时间\n\n    click(224, 244); //解锁 密码0401\n    //     desc(0).findOne().click();\n    //     desc(4).findOne().click();\n    //     desc(0).findOne().click();\n    //     desc(1).findOne().click();\n    //等待解锁完成，返回并退出\n    // back();\n\n    sleep(1000); // 执行密码手势\n\n    var redmi_k20pro = [[241, 1225], [236, 1457], [554, 1457], [798, 1457], [796, 1780]];\n    var redmi_10x = [[241, 1425], [236, 1657], [554, 1657], [798, 1657], [796, 1980]];\n    var currentGesture = redmi_k20pro;\n\n    if (device.model === 'M2003J15SC') {\n      currentGesture = redmi_10x;\n    }\n\n    log('currentGesture--', currentGesture);\n    gesture.apply(void 0, [1000].concat(_toConsumableArray(currentGesture)));\n  }\n}; // 清除所有应用\n\nvar closeAllApp = function closeAllApp() {\n  // 打开应用管理手势\n  sleep(1000);\n  gesture(1000, [540, 2330], [540, 1840], [540, 1840], [540, 1840]);\n  sleep(1000);\n  clickSelectorCenter(id(\"com.miui.home:id/clearAnimView\"));\n}; // 点击文字元素\n\nvar clickByTextDesc = function clickByTextDesc(energyType, paddingY) {\n  var clicked = false;\n\n  if (descEndsWith(energyType).exists()) {\n    descEndsWith(energyType).find().forEach(function (pos) {\n      var posb = pos.bounds();\n\n      if (posb.centerX() < 0 || posb.centerY() - paddingY < 0) {\n        return false;\n      } //toastLog(pos.id());\n\n\n      var str = pos.id();\n\n      if (str != null) {\n        if (str.search(\"search\") == -1) {\n          click(posb.centerX(), posb.centerY() - paddingY); //toastLog(\"get it 1\");\n\n          clicked = true;\n        }\n      } else {\n        click(posb.centerX(), posb.centerY() - paddingY); //toastLog(\"get it 2\");\n\n        clicked = true;\n      }\n\n      sleep(100);\n    });\n  }\n\n  if (textEndsWith(energyType).exists() && clicked == false) {\n    textEndsWith(energyType).find().forEach(function (pos) {\n      var posb = pos.bounds();\n\n      if (posb.centerX() < 0 || posb.centerY() - paddingY < 0) {\n        return false;\n      } //toastLog(pos.id());\n\n\n      var str = pos.id();\n\n      if (str != null) {\n        if (str.search(\"search\") == -1) {\n          click(posb.centerX(), posb.centerY() - paddingY); //toastLog(\"get it 3\"); \n\n          clicked = true;\n        }\n      } else {\n        click(posb.centerX(), posb.centerY() - paddingY); //toastLog(\"get it 4\");\n\n        clicked = true;\n      }\n\n      sleep(100);\n    });\n  }\n\n  return clicked;\n}; //获取截图\n\nvar getCaptureImg = function getCaptureImg() {\n  //captureScreen(\"/storage/emulated/0/DCIM/Screenshots/1.png\");\n  //sleep(500);\n  if (!requestScreenCapture()) {\n    toast(\"toast-请求截图失败\");\n    exit();\n  }\n\n  toast(\"toast-截图开始\");\n  var img0 = captureScreen();\n  sleep(100);\n\n  if (img0 == null || typeof img0 == \"undifined\") {\n    toastLog(\"截图失败,脚本退出\");\n    exit();\n  } else {\n    return img0;\n  }\n};\nvar clickCenter = function clickCenter(widget) {\n  if (!widget) return false;\n  var rect = widget.bounds();\n  return click(rect.centerX(), rect.centerY());\n};\nvar clickSelectorCenter = function clickSelectorCenter(selector) {\n  if (!selector) return false;\n  var widget = selector.findOne(2000);\n  return clickCenter(widget);\n}; // 滑动查找组件\n\nvar swipeToFindWidget = function swipeToFindWidget(selector) {\n  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;\n  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;\n  var i = 0;\n  var target = null;\n\n  while (i < times) {\n    target = selector.findOne(1000);\n\n    if (target) {\n      break;\n    }\n\n    if (dir == 1) {\n      swipe(500, 2000, 500, 300, 200);\n    } else {\n      swipe(500, 300, 500, 2000, 200);\n    }\n\n    sleep(500);\n    i++;\n  }\n\n  return target;\n}; // 脚本手动退出\n\nvar registEvent = function registEvent() {\n  var keyCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"volume_up\";\n  threads.start(function () {\n    //启用按键监听\n    events.observeKey(); //监听音量上键按下\n\n    events.onKeyDown(keyCode, function (event) {\n      toast(\"脚本手动退出\");\n      exit();\n    });\n  });\n};\nvar doubleClickLocation = function doubleClickLocation(x, y) {\n  click(x, y);\n  sleep(20);\n  click(x, y);\n};\nvar deviceInfoLog = function deviceInfoLog() {\n  log('device.width---', device.width);\n  log('device.height---', device.height);\n  log('device.brand---', device.brand);\n  log('device.device---', device.device);\n  log('device.model---', device.model);\n  log('device.product---', device.product);\n}; // 是否非工作日\n\nvar checkHoliday = function checkHoliday() {\n  var holidayList = ['1-1', '1-2', '1-3', '4-3', '4-4', '4-5', '5-1', '5-2', '5-3', '5-4', '5-5', '6-12', '6-13', '6-14', '9-19', '9-20', '9-21', '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'];\n  var wordWeekend = ['4-25', '5-8', '9-18', '9-26', '10-9'];\n  var today = new Date();\n  var todayStr = \"\".concat(today.getMonth() + 1, \"-\").concat(today.getDate());\n\n  if (holidayList.indexOf(todayStr) !== -1) {\n    return true;\n  }\n\n  if (wordWeekend.indexOf(todayStr) !== -1) {\n    return false;\n  }\n\n  var weekDay = today.getDay();\n\n  if (weekDay === 0 || weekDay === 6) {\n    return true;\n  }\n\n  return false;\n};\n\n//# sourceURL=webpack:///./launchWx/utils/index.js?");

/***/ }),

/***/ "./launchWx/xwTest.js":
/*!****************************!*\
  !*** ./launchWx/xwTest.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./launchWx/utils/index.js\");\n\n\nvar Maid = __webpack_require__(/*! ../common/Maid.js */ \"./common/Maid.js\");\n\nvar maid = new Maid(\"com.tencent.mm\");\nauto(); // 自动打开无障碍服务\n// 解锁\n\nObject(_utils__WEBPACK_IMPORTED_MODULE_0__[\"unlockMiui\"])();\nmaid.sleep(3);\ntoast(\"打开应用\");\napp.launch(\"com.tencent.mm\");\nmaid.sleep(2); // maid.kill();\n// app.launch(\"com.tencent.mm\");\n// maid.sleep(2);\n// maid.launchActivity(\"com.tencent.mm\");\n// maid.sleep(2);\n// waitForActivity(\"com.tencent.mm.plugin.sns.ui.SnsTimeLineUI\");\n// for(var i = 0; i < 100; i++){\n//   //点击位置(500, 1000), 每次用时1毫秒\n//   press(500, 1000, 1);\n// }\n// 点击通讯录\n// maid.sleep(2);\n// maid.clickTextCenter(\"通讯录\");\n// 点击朋友圈的返回按钮\n\nmaid.sleep(2); // maid.clickIdCenter('com.tencent.mm:id/ei')\n// id('com.tencent.mm:id/ei').find()\n\n//# sourceURL=webpack:///./launchWx/xwTest.js?");

/***/ })

/******/ });