const assert = require('assert'); //可引入其它的测试框架，但需要在 travis 中先设置，在测试运行前先安装对应的 npm 包
eval(require('../answer.js')+''); // 这样答案提交者不需要 export，只需要在代码中实现对应的函数即可
/*
test assertions. 
*/
