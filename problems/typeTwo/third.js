const promise = require("../../index");

const myPromise = promise.promise_1;

new myPromise((res, rej) => {
  res(1);
  rej("Error"); // should throw error at this
  res(2); // runs again!
});

// here rej get called even though res has been executed
// not only this,res can be called after rej which is also not fine
