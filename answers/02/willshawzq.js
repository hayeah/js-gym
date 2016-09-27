function timeout(ms) {
	return new Promise((resolve, reject) => setTimeout(() => resolve(new Date()), ms));
}
(async () => {
    let i = 0;
    while (true) {
        i++;
        // 等待 1 秒钟，接着执行下一行
        let now = await timeout(1000);
        console.log(`${i} - ${now}`);
    }
})();
