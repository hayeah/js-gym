// 创建两个可观察的对象
let o = observable({
    a: 1,
});

let o2 = observable({
    b: 2,
});

// 可以直接读取对象的属性
console.log(o.a);
// 1
console.log(o2.b);
// 2

// autorun 会先运行一次回调，分析可观察对象那些属性有被引用。
// o 是个可观察对象，每次 o.a 更改都要重新运行一次回调。
autorun(() => {
    // 回调 1 - o.a 有改动
    console.log(`a => ${o.a}`)
});

// o2 是个可观察对象，每次 o2.b 更改都要重新运行一次回调。
autorun(() => {
    // 回调 2 - o2.b 有改动
    console.log(`b => ${o2.b}`)
});


// 每次 o.a 或者 o2.b 更改都要重新运行一次回调。
autorun(() => {
    // 回调 3 - o.a 或者 o2.b 有改动
    console.log(`a + b => ${o.a + o2.b}`)
});

// 会触发回调 1, 2
o.a = 100;

// 会触发回调 2，3
o2.b = 200;

/*
输出：

1
2
a => 1
b => 2
a + b => 3
a => 100
a + b => 102
b => 200
a + b => 300
 */


function observable (obj) {
  let map = {}
  let handler = {
    get (target, key, receiver) {
      if (autorun.cb) {
        if (map[key] == null) {
          map[key] = []
        }
        map[key].push(autorun.cb)
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      if (target[key] === value) {
        return
      }
      Reflect.set(target, key, value, receiver)
      if (map[key]) {
        map[key].forEach(cb => cb())
      }
    }
  }

  return new Proxy(obj, handler)
}

function autorun (cb) {
  autorun.cb = cb
  cb()
  autorun.cb = null
}

autorun.cb = null
