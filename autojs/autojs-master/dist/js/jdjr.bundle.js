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
/******/ 	return __webpack_require__(__webpack_require__.s = "./京东金融-早起-付款.js");
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

/***/ "./京东金融-早起-付款.js":
/*!***********************!*\
  !*** ./京东金融-早起-付款.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// TODO 考虑与打卡合并\nauto.waitFor();\n\nvar Maid = __webpack_require__(/*! ./common/Maid.js */ \"./common/Maid.js\");\n\nvar maid = new Maid(\"com.jd.jrapp\");\n\nvar Unlock = __webpack_require__(/*! ./common/Unlock.js */ \"./common/Unlock.js\");\n\nvar unlock = new Unlock();\nmaid.before();\nunlock.unlock();\nmaid.sleep(2);\nmaid.kill();\nmaid.sleep(2);\nmaid.shell(\"am broadcast -a com.jozein.xedgepro.PERFORM -e data 43830233030236F6D6E2A646E2A6271607070236F6D6E2A646E2A627160707E2D61696E6E2163636F657E647E2D656E25796E2D41696E6D456143647966796479702165747F6A637D25254435224145214345254435224835293345254935283735293135254835293545283440206020602\");\nwaitForActivity(\"com.jd.jrapp.main.account.me.ui.MainMeActivity\");\nmaid.sleep(5);\nmaid.clickTextCenter(\"早起打卡\");\nmaid.sleep(5);\n\nif (desc(\"查看详细规则\").exists()) {\n  maid.click(558, 1752); // 规则弹窗关闭\n\n  maid.sleep(1);\n}\n\nmaid.clickDescCenter(\"支付 1 元参与挑战\");\nmaid.sleep(4);\nmaid.clickIdCenter(\"jdpay_payinfo_txt_pay\"); //立即支付\n\nmaid.sleep(2); // 密码不同需要自定义\n\nvar pwdPoints = [[899, 1838], [525, 1707], [553, 1827], [881, 1959], [573, 2081], [551, 1980]];\nmaid.clickMulti(pwdPoints, 1);\nmaid.sleep(6);\nmaid.kill();\nmaid.after();\n\n//# sourceURL=webpack:///./%E4%BA%AC%E4%B8%9C%E9%87%91%E8%9E%8D-%E6%97%A9%E8%B5%B7-%E4%BB%98%E6%AC%BE.js?");

/***/ })

/******/ });