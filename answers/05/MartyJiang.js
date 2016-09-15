function objectAssign(target, ...sources) {
  return sources
    .filter(obj => obj && typeof obj === 'object')
    .reduce((target, obj) => {
      Object.keys(obj).forEach(k => target[k] = obj[k])
      return target
    }, target)
}
