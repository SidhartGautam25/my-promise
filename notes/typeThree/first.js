// we will see type three of our promise
function then(onFulfilled, onRejected) {
  const promise = new myPromise(() => {});
  handle(this, { promise, onFulfilled, onRejected });
  return promise;
}

// const p = new APromise((res) => res(p));
//  --> This should be not allowed
//  --> This would cause an infinite loop that a promise
//      is not resolved with itself
function fulfill(promise, value) {
  if (value === promise) {
    return reject(promise, new TypeError("failed"));
  }
  if (value && (typeof value === "object" || typeof value === "function")) {
    let then;
    try {
      then = value.then;
    } catch (err) {
      return reject(promise, err);
    }

    // promise
    if (then === promise.then && promise instanceof myPromise) {
      promise.state = FULFILLED;
      promise.value = value;
      return finale(promise);
    }

    // thenable
    if (typeof then === "function") {
      return doResolve(promise, then.bind(value));
    }
  }

  // primitive
  promise.state = FULFILLED;
  promise.value = value;
  finale(promise);
}
