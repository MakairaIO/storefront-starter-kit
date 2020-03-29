export default function throttle(fn, threshhold = 250) {
  let last, deferTimer

  return function () {
    let now = +new Date(),
      args = arguments

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer)

      deferTimer = setTimeout(function () {
        last = now
        fn.apply(this, args)
      }, threshhold)
    } else {
      last = now

      fn.apply(this, args)
    }
  }
}
