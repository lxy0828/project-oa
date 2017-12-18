export function Print (e) {
  console.log(e)
  let subOutputRankPrint = document.getElementById(e)
  console.log(subOutputRankPrint.innerHTML)
  let newContent = subOutputRankPrint.innerHTML
  let oldContent = document.body.innerHTML
  document.body.innerHTML = newContent
  window.print()
  window.location.reload()
  document.body.innerHTML = oldContent
  return false
}
