function async(gen) {
  let g = gen();
  let iter = (v) => g.next(v);
  return new Promise((resolve, reject) => {
    function next(v) {
      let { value, done } = iter(v);
      return done ? resolve(value) : value.then(d => next(d));
    };
    next();
  });
};

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
