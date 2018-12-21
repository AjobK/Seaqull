export function scrollTo (scrollToClass) {
  const element = document.getElementsByClassName(scrollToClass)[0]
  let counter = 0
  let amount = 60
  let usableOffset = (element.offsetTop - window.pageYOffset) / amount
  let trans = setInterval(function (e) {
    ++counter
    if (counter <= amount) {
      if (window.pageYOffset + usableOffset < element.offsetTop) {
        window.scrollBy(0, usableOffset)
      } else {
        window.scrollBy(0, element.offsetTop)
        clearInterval(trans)
      }
    } else {
      clearInterval(trans)
    }
  }, (1000 / amount) / 10)
}
