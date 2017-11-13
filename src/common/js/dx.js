export function DX (money) {
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let cnIntRadice = ['', '拾', '佰', '仟']
  let cnIntUnits = ['', '万', '亿', '兆']
  let cnDecUnits = ['角', '分', '毫', '厘']
  let cnInteger = '整'
  let cnIntLast = '元'
  let maxNum = 999999999999999.9999
  let integerNum
  let decimalNum
  let chineseStr = ''
  let parts
  if (money === '') { return '' }
  money = parseFloat(money)
  if (money >= maxNum) {
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0
    var IntLen = integerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  if (decimalNum !== '') {
    var decLen = decimalNum.length
    for (var l = 0; l < decLen; l++) {
      var v = decimalNum.substr(l, 1)
      if (v !== '0') {
        chineseStr += cnNums[Number(v)] + cnDecUnits[l]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}
