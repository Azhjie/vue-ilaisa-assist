/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 大小写字母+数字*/ // 主要用于护照
export function validatAlphabetsNumber(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}
/**
 * validate email
 * @param str
 * @returns {boolean}
 */
export function Email(str) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(str)
}

/**
 * validate Idcard
 * @param str
 * @returns {boolean}
 */
export function Idcard(str) {
  const re = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return re.test(str)
}

/**
 * validate Phone
 * @param str
 * @returns {boolean}
 */
export function Phone(str) {
  const { code_area } = this.$store.getters.country
  let re = ''
  if (code_area !== '') {
    re = /^\d{6,11}$/
  } else {
    re = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/
  }
  return re.test(str)
}

/**
 * validate 正浮点
 * @param str
 * @returns {boolean}
 */
export function Pfp(str) {
  const re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
  return re.test(str)
}

/**
 * validate 正整数 非零
 * @param str
 * @returns {boolean}
 */
export function Pinteger(str) {
  const re = /^[1-9]\d*$/
  return re.test(str)
}

/**
 * validate 数字
 * @param str
 * @returns {boolean}
 */
export function NumberValidate(str) {
  const re = /^[0-9]*$/
  return re.test(str)
}

/**
 * validate 字母 数字 特殊字符 最少2种组合，不能有空格和中文
 */
export function loginPwd(str) {
  const re = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/
  return re.test(str)
}

/**
 *
 * 连号 连续检测 112233 111222 123456 654321 都不能通过
 */
export function lianhao(str) {
  if (!str) return false
  var arr = str.split('')
  return arr.every((item, index) => {
    if (+item < +arr[index + 1]) {
      return +item + 1 === (+arr[index + 1] || +item + 1)
    } else if (item === arr[index + 1]) {
      return item === arr[index + 1] || item
    } else {
      return +item - 1 === (+arr[index + 1] || +item - 1)
    }
  })
}

