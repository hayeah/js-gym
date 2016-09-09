function timeout(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(new Date()), ms);
  })
}