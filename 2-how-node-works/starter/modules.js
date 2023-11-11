// console.log(arguments);
// console.log(require("module").wrapper);

const Calc = require("./test-module-1");

const calc1 = new Calc();

console.log("18 + 9 = ", calc1.add(18, 9));
