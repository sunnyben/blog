var express = require('express')
var http = require("http")
var axios = require("axios");
var qs = require('qs');
var urlencode = require('urlencode');
var fs = require('fs');
const moment = require('moment')
const log4js = require('./util/Log4J');
const logger = log4js.getLogger();
const errLog = log4js.getLogger('err');
const recordLog = log4js.getLogger('record');

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const APP_ID = "cli_9e0857d38077d00d"
const APP_SECRET = "RDnxCTHA7kbedWXTexasnhtNvemKPGq5"
const APP_VERIFICATION_TOKEN = "BvFssVAXpyExHztjwKAigeaJLzkBm8Rb"

const handle_request_url_verify = (res, post_obj) => {
  const challenge = post_obj.challenge
  const rsp = {'challenge': challenge}
  res.json(rsp)
  return
}

const get_tenant_access_token = () => {
  const url = "http://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/"
  const headers = {
    "Content-Type" : "application/json"
  }
  const req_body = {
      "app_id": APP_ID,
      "app_secret": APP_SECRET
  }
  const opt = {  
    url,  
    method:'post',  
    // json: true,
    headers:{  
        "Content-Type": 'application/json'
    },
    data: req_body
  }  
  return new Promise((resolve, reject) => {
    axios(opt).then((rsp_body) => {
      const rsp_dict = rsp_body.data
      // rsp_dict.data = JSON.parse(rsp_dict.data)
      if(rsp_dict.code === 0) {
        resolve(rsp_dict.tenant_access_token) 
      } else {
        resolve('') 
      }
    })
  })
  
}

getUserInfo = (self, token, open_id) => {
  const url = "https://open.feishu.cn/open-apis/contact/v1/user/batch_get"
  headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
  req_body = {
    "open_ids": open_id
  }
  const opt = {
    url,  
    method:'get',  
    // json: true,
    headers,
    params: req_body
  }
  axios(opt).then((rsp_body) => {
  })
}

const send_message = (self, token, open_id, text, open_message_id) => {
  const url = "http://open.feishu.cn/open-apis/message/v4/send/"
  headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
  req_body = {
    "open_id": open_id,
    "msg_type": "text",
    "root_id": open_message_id,
    "content": {
        "text": text
        // "text": 'lalala'
    }
  }
  const opt = {
    url,  
    method:'post',  
    // json: true,
    headers,
    data: req_body
  }
  axios(opt).then((rsp_body) => {
    if(rsp_body.data.code === 0) {
      // logger.info(rsp_body.data.data);
      recordLog.info(open_id + '-' + text);
    } else {
      errLog.error(rsp_body.data.msg);
    }
    // const rsp_dict = rsp_body.data
  }).catch((err) => {
    errLog.error(err);
  })
}

const getBaiduToken = () => {
  const url = 'https://aip.baidubce.com/oauth/2.0/token'
  // grant_type： 必须参数，固定为client_credentials；
  // client_id： 必须参数，应用的API Key；
  // client_secret： 必须参数，应用的Secret Key；
  req_body = {
    "grant_type": 'client_credentials',
    "client_id": "Ajm8jYOHoscDSaEdneMRogEb",
    "client_secret": "ItdQHVnefiueKKl5rfOHeHMGo25UtKwV"
  }
  const opt = {
    url,  
    method:'post',  
    data: qs.stringify(req_body),
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }
  return axios(opt).then((rsp_body) => {
    const rsp_dict = rsp_body.data
    
    return rsp_dict.access_token
  }).catch((err) => {
    errLog.error('getBaiduToken--', err);
  })
}

// iVBORw0KGgoAAAANSUhEUgAAACUAAAAWCAMAAABwrqUyAAAApVBMVEX19fb4+Pn8/P3////5+fn29vf7+/z7+/v19vb9/f35+vr29/j6+vv39/jz9PX09fb5+fr+/v76+vr09PX8/Pz19vf7/Pz6+/v4+fn09fX29/f9/f73+Pj9/v78/f3Q09e/w8itsbiPlZ6Qlp+jqK+Znqbw8PLT1dn+/v+usrm0uL7g4uSeo6uRlp/u7/GYnqbN0NSTmaKPlp7h4+WprbTGyc7Mz9OCVivmAAABYUlEQVR4Ab2Qb5OTMBCHN+xFCC0JATw4L2oKFAzxH4r3/T+aSUinjI4zvrqdTsksT579sQAkQV8PFN9AmrH8dM4oLULPdbngHErwZ1nRuhYMS8hY8/YR2gYaKf2bThSP7gEyLZ5qWkn0XfLEJE1pi0WRv8N7Ac8e2O5LEZ8FwaJT5DkHQuWBOvt/5+OCIjYg2jOteE1KTo8uxTrg0CWYAkMXnVR1TZwmYUeKpqINp/fQIs1d4O4w6kZlH+Cj9qcku/RDH2tUvqWvU6SAnS4zKykXGcVPk1G42GiwnxcTqaEfvgyu+t58vd5UwWG/WTQ6TpSX781+w4nsgspM7uegdUZUY8DgNPc/wv05UtMYKJ9JO8T4iGDXXWoCpVfrBjnK+ESewtnhMC4xi6cm89Nsv64vZv+2QIWJVh9cLxrtpqZt+5NCfXeNmwrB1V8uPLrCLv9J2dWvKFLzbfVH6n/q9anfovIsyV2Xt1UAAAAASUVORK5CYII=
const imageToText = async (imageStr) => {
  let url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic'
  const access_token = await getBaiduToken()
  url = url + '?access_token=' + access_token
  const req_body = {
    "image": imageStr
  }
  const opt = {
    url,  
    method:'post',  
    data: qs.stringify(req_body),
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }
  return axios(opt).then((rsp_body) => {
    const rsp_dict = rsp_body.data
    logger.info('调用百度图片文本识别');
    if(rsp_dict.words_result) {
      let totalStr = ''
      rsp_dict.words_result.forEach((item) => {
        totalStr += (item.words + '\n')
      })
      return totalStr
    }
  }).catch((err) => {
    errLog.error('imageToText--', err);
  })
}

  const decodeFunc = function(bytes){
      var bString = "";
      for(var i = 0, len = bytes.length; i < len; ++i){
            bString+= String.fromCharCode(bytes[i]);
      }
      return btoa(bString);
  }

  const randomCode = (length) => {
    var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var LOWER = UPPER.toLocaleLowerCase()
    var DIGITS = '0123456789'
    var ALPHA_NUMBER = UPPER + LOWER + DIGITS
    // 字符串转成数组
    var symbols = []
    for (let i = 0; i < ALPHA_NUMBER.length; i++) {
      // symbols[i] = ALPHA_NUMBER.charAt(i)
      symbols.push(ALPHA_NUMBER.charAt(i))
    }
    // 随机拼接字符串
    var stateCode = ''
    for (let i = 0; i < length; i++) {
      stateCode += symbols[Math.floor((Math.random() * symbols.length))]
    }
    return stateCode
  }

const handle_image = (req, res, info, token, open_id, open_message_id) => {
  const imageKey = info.image_key
  const url = "https://open.feishu.cn/open-apis/image/v4/get"
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
  const params = {
    image_key: imageKey
  }
  const opt = {
    url,  
    method:'get',  
    // json: true,
    headers,
    responseType: "arraybuffer", 
    params
  }
  axios(opt).then(async (rsp_body) => {
    const data = rsp_body.data
    
    // const buffer = new Buffer(data, 'binary');

    const buffer = Buffer.from(data);
    let str = buffer.toString('base64')

    // 保存图片
    const dateStr = `${moment().format('YYYYMMDD')}`
    const fileName = `${moment().format('YYYYMMDDHHmmss')}` + randomCode(6)
    
    if(!fs.existsSync(dateStr) ) {
      fs.mkdir(dateStr, () => {
        fs.writeFile(dateStr + '/' + fileName + '.png', data, (err, data) => {
          if (err) {
              throw err;
          }
        });
      })
    } else {
      // fs.writeFile(dateStr + '/' + fileName + '.png', data, 'buffer');
      fs.writeFile(dateStr + '/' + fileName + '.png', data, (err, data) => {
        if (err) {
            throw err;
        }
      });
    }
    // fs.writeFileSync('avatar.png', str, 'binary');

    // str = decodeFunc(data)
    let text = await imageToText(str)
    // text = decodeFunc(data)
    send_message(res, token, open_id, text, open_message_id)
    res.json('')
  }).catch((err) => {
    errLog.error('handle_image--', err);
  })
}

const handle_message = async (req, res, event) => {
  // 此处只处理 text 类型消息，其他类型消息忽略
  const msg_type = event.msg_type
  
  // 调用发消息 API 之前，先要获取 API 调用凭证：tenant_access_token
  const access_token = await get_tenant_access_token()

  // getUserInfo(res, access_token, event.open_id)

  if(msg_type != "text" && msg_type != "image") {
    send_message(res, access_token, event.open_id, '抱歉，我无法识别你发送的指令，请输入图片，我们将为您输出图片中包含的文字信息', event.open_message_id)
    res.json('')
    return
  }
  
  if(access_token == '') {
    res.json('')
  } else {
    if(msg_type == "image") {
      handle_image(req, res, event, access_token, event.open_id, event.open_message_id)
      return
    }
    send_message(res, access_token, event.open_id, event.text, event.open_message_id)
    res.json('')
  }

}

app.post('/', function (req, res, next) {
  const params = req.body
  const token = params.token
  if(token != APP_VERIFICATION_TOKEN) {
    res.json('')
    return
  }
  const type = params.type
  if("url_verification" == type) {   // 验证请求 URL 是否有效
    handle_request_url_verify(res, params)
  } else if("event_callback" == type) { // 事件回调
    const event = params.event
    if(event.type === 'message') {
      handle_message(req, res, event)
      return
    }
  }
  return
  // res.json(req.body)
})
 
app.listen(8001, ()=>{
    console.log("8001");
})