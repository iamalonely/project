import axios from 'axios';
import { Loading, Message, MessageBox } from 'element-ui'
import { getToken, removeToken, removeRoutes } from '@/utils/auth'

let loadingInstance
axios.defaults.timeout = 30000
console.log(process.env, process.env.VUE_APP_BASEURL)
let fetch = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  // baseURL: '/api',
  // baseURL:'http://192.168.51.67:8085',
  ourConfig : 0
})

const NO_LOADING = 1

const requst = (config) => {
  const ourConfig = config.ourConfig
  // config.headers['X-Authorization'] = 'ac736945-7318-448f-a6e2-193afd37c6fb'
  config.headers['Authorization'] = getToken()
  if (!(ourConfig & NO_LOADING)) {
    // loadingInstance = Loading.service({background: 'rgba(0, 0, 0, 0.3)'})
  }
  return config
}

const response = (response) => {
  const ourConfig = response.config.ourConfig
  const data = response.data
  if (!(ourConfig & NO_LOADING)) {
    loadingInstance.close()
  }
  if(data.code===200){
    return data.data
  }
  if (data.code === 500) {
    Message(data.msg)
    return Promise.reject(response)
  }
  return data.data
}

const resError = (error) => {
  if (loadingInstance) {
    loadingInstance.close()
  }
  try {
    Message('服务器异常')
  } catch {
  }
  return Promise.reject(error)
}


fetch.interceptors.request.use(requst)
fetch.interceptors.response.use(response, resError)

export const fecthGet = (url, params, config) =>
  fetch.get(url, { params, ourConfig: config });

export const fecthPost = (url, params, config) =>
  fetch.post(url, params, { ourConfig: config });

export const fecthPut = (url, params, config) =>
fetch.put(url, params, { ourConfig: config });

export const fecthDel = (url, params, config) =>
  fetch.delete(url, { params, ourConfig: config });

export const exportFile = (method = 'get',url, params, filename) => {
  let data
  if (method === 'get') {
    data = 'data'
  } else {
    data = 'params'
  }
  console.log(process.env.VUE_APP_BASEURL)
  return axios({
    method: method,
    url: process.env.VUE_APP_BASEURL + url,
    [data]: params || {},
    headers: {
      Authorization: getToken()
    },
    responseType: 'blob'
  }).then(res => {
    const blob = new Blob([res.data], {type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    if (IEVersion() === -1) {
      // 兼容不同浏览器的URL对象
      const url = window.URL || window.webkitURL || window.moxURL;
      // 创建下载链接
      const downloadHref = url.createObjectURL(blob);
      // 创建a标签并为其添加属性
      let downloadLink = document.createElement('a');
      downloadLink.href = downloadHref;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      // 触发点击事件执行下载
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    return res
  })
}
/**
 * 判断浏览器类型（IE类型和非IE）
 */
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';//edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1;//不是ie浏览器
  }
}