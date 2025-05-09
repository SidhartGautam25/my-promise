const promise = require("../../index");

const myPromise = promise.promise_1;

new myPromise((res) => res(42)).then((val) => console.log(val));
console.log("after");
// here val get printed before after
// but ideally "after" should be printed first,as myPromise.then() should
// be asyncronous. and hence syncronous function should get printed
// first
