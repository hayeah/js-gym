(async () => {
    let i = 0;
    while (true) {
        i++;
        // 等待 1 秒钟，接着执行下一行
        let now = await timeout(1000);
        console.log(`${i} - ${now}`);
    }
})();

/*
输出：

1 - Fri Sep 09 2016 15:09:35 GMT+0800 (HKT)
2 - Fri Sep 09 2016 15:09:36 GMT+0800 (HKT)
3 - Fri Sep 09 2016 15:09:37 GMT+0800 (HKT)
4 - Fri Sep 09 2016 15:09:38 GMT+0800 (HKT)
5 - Fri Sep 09 2016 15:09:39 GMT+0800 (HKT)
6 - Fri Sep 09 2016 15:09:40 GMT+0800 (HKT)
7 - Fri Sep 09 2016 15:09:41 GMT+0800 (HKT)
8 - Fri Sep 09 2016 15:09:42 GMT+0800 (HKT)
9 - Fri Sep 09 2016 15:09:43 GMT+0800 (HKT)
10 - Fri Sep 09 2016 15:09:44 GMT+0800 (HKT)
*/


function timeout (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date())
    }, ms)
  })
}
