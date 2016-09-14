function objectAssign() {
  var target = arguments[0]
  for (var i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] === 'object' && arguments[i] != null) {
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          target[key] = arguments[i][key]
        }
      }
    }
  }
  return target
}

objectAssign({foo: 0}, {bar: 1})
//=> {foo: 0, bar: 1}

// 多个对象
objectAssign({foo: 0}, {bar: 1}, {baz: 2})
//=> {foo: 0, bar: 1, baz: 2}

// 覆盖已存在的 key
objectAssign({foo: 0}, {foo: 1}, {foo: 2})
//=> {foo: 2}

// 忽略 null 和 undefined
objectAssign({foo: 0}, null, {bar: 1}, undefined)
//=> {foo: 0, bar: 1}
