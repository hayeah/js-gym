// 这是一个返回 Promise 的异步计算
function promiseReturn(value) {
  return Promise.resolve(value);
}

// async 函数用 yield 去等待异步计算的结果
async(function* () {
  let a = yield promiseReturn(1);
  let b = yield promiseReturn(2);
  let c = yield promiseReturn(3);

  return a + b + c;
}).then(result => {
  console.log(result);
});

function async (gen) {

  return new Promise(function (resolve, reject) {
    let g = gen()

    function next(data) {
      let result = g.next(data)
      if (result.done) {
        return resolve(result.value)
      }
      result.value.then(function(data) {
        next(data)
      })
    }

    next()
  })
}
