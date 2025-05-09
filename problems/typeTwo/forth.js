// first of all, spelling of fourth is fourth and not forth
// now come to the point
// our myPromise doesnt understand thenable things

const myPromise = require("../../lib/typeeOne");

// first thenable aare objects or functions which have then method
// so promises are thenable but not all thenable are promises

const thenable = {
  then: (resolve) => {
    setTimeout(() => resolve("done!"), 1000);
  },
};

Promise.resolve(thenable).then((data) => console.log(data));
// Logs: done! (after 1 second)

myPromise.resolve(thenable).then((data) => {
  console.log(data);
});
// the first problem is -> error will show that resolve is not a function
// and even if we ignore the error , no data will get printed
// as thenable are not handled in our myPromise
