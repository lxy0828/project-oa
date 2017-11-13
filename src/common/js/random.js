export function getRandomNum (el) {
  let rand = Math.floor(Math.random() * 900) + 100
  let time = new Date()
  let year = time.getFullYear()
  let month = (time.getMonth() + 1) > 0 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
  let day = (time.getDate()) > 0 ? (time.getDate()) : ('0' + (time.getDate()))
  let hour = (time.getHours()) > 0 ? (time.getHours()) : ('0' + (time.getHours()))
  let min = (time.getMinutes()) > 0 ? (time.getMinutes()) : ('0' + time.getMinutes())
  let second = (time.getSeconds()) > 0 ? (time.getSeconds()) : ('0' + time.getSeconds())
  let num = el + year + month + day + hour + min + second + rand
  return num
}
