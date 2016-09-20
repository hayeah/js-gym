const objectAssign = (t, ...args) => Object.keys(args).reduce((s, i) => Object.keys(args[i] || {}).reduce((sum, k) => {
  sum[k] = args[i][k];
  return sum;
}, s), t);

console.log(objectAssign({foo: 0}, {bar: 1}))
//=> {foo: 0, bar: 1}

// 多个对象
console.log(objectAssign({foo: 0}, {bar: 1}, {baz: 2}))
//=> {foo: 0, bar: 1, baz: 2}

// 覆盖已存在的 key
console.log(objectAssign({foo: 0}, {foo: 1}, {foo: 2}))
//=> {foo: 2}

// 忽略 null 和 undefined
console.log(objectAssign({foo: 0}, null, {bar: 1}, undefined))
//=> {foo: 0, bar: 1}