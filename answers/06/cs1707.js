'use strict'

function Immutable (arr) {
  let result = arr.slice()

  addPropertyTo(result, 'set', function (i, v) {
    return [ ...this.slice(0, i), v, ...this.slice(i + 1) ]
  })

  let methods = ['map', 'filter', 'slice', 'concat', 'reduce', 'reduceRight']
  methods.forEach( method => {
    addPropertyTo(result, method, function () {
      return Immutable(Array.prototype[method].apply(this, arguments))
    })
  })
  Object.freeze(result)
  return result
}

function addPropertyTo (target, name, value) {
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: false,
    writable: false,
    value
  })
}

/*
不可变数组可以像普通数组一样读取元素
*/
var a = Immutable([0, 1, 2]);
console.log(a[0]);
// 0
console.log(a[1]);
// 1
console.log(a[2]);
// 2

/*
“修改” 不可变数组会创建全新的数组
*/
var a = Immutable([0, 1, 2]);
console.log(a.set(0, -1));
// [-1, 1, 2]
console.log(a.set(1, 10));
// [0, 10, 2]
console.log(a.set(2, 20));
// [0, 1, 20]
console.log(a);
// [0, 1, 2]

/*
你需要让  "map", "filter", "slice", "concat", "reduce", "reduceRight" 这些函数都能工作，并返回不可变数组。
*/
var a = Immutable([0, 1, 2]).map(x => x * 2);
console.log(a.set(1, 20));
// [0, 20, 4]
console.log(a);
// [0, 2, 4]

a[0] = 10;
