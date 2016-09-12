function async(gen) {
  let it = gen()
  let next = it.next()
  let iterator = (next) => {
    if (next.done)
      return Promise.resolve(next.value)
    return next.value
      .then((value) => {
        return iterator(it.next(value))
      })
      .catch(it.throw)
  }
  return iterator(next)
}

exports.async = async
