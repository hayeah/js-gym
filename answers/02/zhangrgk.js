const timeout = ms => new Promise(resolve => setTimeout(() => resolve(new Date()), ms));

(function* () {
  let i = 0;
  while (true) {
    i++;
    // 等待 1 秒钟，接着执行下一行
    console.log(timeout(1000).then(time => yield* time));
  }
})();
