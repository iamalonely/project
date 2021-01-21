export const isClass = (obj) => {
  if (obj === null) return 'Null';
  if (obj === undefined) return 'Undefined';
  return Object.prototype.toString.call(obj).slice(8, -1);
}
export const isNull = (value) => {
  if (value === null || value === undefined) return true
  return false
}
export const isDate = (value) => {
  if (isNull(value)) return false
  return vue instanceof Date
}

export const deepClone = (obj) => {
  let result
  if (obj instanceof Array) {
    result = []
  } else if (obj instanceof Object) {
    result = {}
  } else {
    return obj
  }
  for( let key in obj) {
    const copy = obj[key];
    if (isClass(copy) === 'Object') {
      result[key] = deepClone(copy);// 递归调用
    } else if (isClass(copy) === 'Array') {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result
}

export const formatDateByDate = (date, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  if (date instanceof Date) {
    let format = fmt
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    Object.entries(o).forEach(([key, value]) => {
      if (new RegExp(`(${key})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? value : `00${value}`.substr(`${value}`.length))
      }
    })
    return format
  } else {
    return date
  }
}
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 格式化时间戳
export const formatDate = (stamp, fmt = 'yy-MM-dd HH:mm') => {
  if (!stamp) {
    return '';
  }
  const date = new Date(+stamp * 1000);
  const resTime = formatDateByDate(date, fmt);
  return resTime;
};
/**
 * 验证手机号
 * @param {number} tel 手机号码
 * @returns {boolean} 是否正确
 */
export const verifyTel = (tel) => {
  const reg = /^1[3-9]\d{9}$/;
  if (!tel) {
    clearpop('请填写手机号！');
    return false;
  }
  if (!reg.test(tel)) {
    clearpop('请填写正确的手机号');
    return false;
  }
  return true;
};

export const formatMoney = (value) => {
  const money = parseInt((value * 1000), 10) / 1000;
  if (isNaN(money)) {
    return 0;
  }
  const moneyStr = money.toString();
  if (moneyStr.indexOf('.') > -1 && moneyStr.length - moneyStr.indexOf('.') > 3) {
    return Number(money.toFixed(2));
  }
  return money;
};
export const formatNum = (value) => {
  const arr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  return arr[value]
}
/**
 * 文本复制
 * @param {String} string 要复制的文本
 */
export const copyString = (string) => {
  const textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.top = 0;
  textarea.style.left = 0;
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.background = 'transparent';
  textarea.style.color = 'transparent';

  textarea.value = string;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    Message.success('复制成功');
  } catch (err) {
    Message.error('复制失败');
  }
  document.body.removeChild(textarea);
};
// Vue plugin
export const MyPlugin = {
  install(Vue) {
    // 验证手机号
    Vue.prototype.$verifyTel = verifyTel;
    // 格式化日期
    Vue.prototype.$formatDate = formatDate;
    Vue.prototype.$formatDateByDate = formatDateByDate;
    Vue.filter('formatDateByDate', formatDateByDate);
    Vue.filter('formatDate', formatDate);
    Vue.filter('formatNum', formatNum);
    // 复制文本
    Vue.prototype.$copyString = copyString;
    // 格式化金额
    Vue.prototype.$formatMoney = formatMoney;
    Vue.filter('formatMoney', formatMoney);
    /**
     * @describe 注册一个全局自定义指令 处于节约性能的角度考虑，只在元素bind的时候执行一次，
     * @author ZhangHong
     * @date 2018/6/13 0013 10:00
     * @demo <button v-rights="100"></button>
     */
    Vue.directive('rights', {
      bind(el, binding) {
        const rightsId = binding.value;
        if (!hasPermission(rightsId)) {
          if (el.parentNode) el.parentNode.removeChild(el);
        }
      },
    });
  },
};