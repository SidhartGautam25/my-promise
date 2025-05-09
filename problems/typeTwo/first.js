const promise = require("../../index");

const myPromise = promise.promise_1;

const my_p = new myPromise((resolve, reject) => {
  resolve(1);
});

console.log("my p is ", my_p);

my_p
  .then((val) => {
    console.log(" My First then:", val);
    return val + 1;
  })
  .then((val) => {
    console.log("My Second then:", val);
  });

const p = new Promise((resolve, reject) => {
  resolve(1);
});

p.then((val) => {
  console.log("first then: ", val);
  return val + 1;
}).then((val) => {
  console.log("second then : ", val);
});

// in our myPromise case,nothing will get printed, and this is very very
// problematic. now the question arise why nothing get printed ??
// and the answer is becuase none of the function passed to then block
// get called. now this is surprising , as resolve internally do this stuff.
// it is the job of resolve to call the functions passed to then block
// but the thing is, resolve get those fucntion from the queue.
// and at the time when resolve get called, the funny thing is that the
// queue is actually empty.now this is happening because function passed to
// mypromise get called before then method get executed.and this is happening
// because function passed to myPromise is syncronous,and hence the resolve
// inside it get execured as soon as the function inside myPromise
// get called and it get called before then.
