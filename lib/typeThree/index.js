// possible states
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class myPromise {
  constructor(fn) {
    this.state = PENDING;
    this.queue = [];
    doResolve(this, fn);
  }

  then(onFulfilled, onRejected) {
    const promise = new myPromise(() => {});
    handle(this, { promise, onFulfilled, onRejected });
    return promise;
  }
}

function handle(promise, handler) {
  while (promise.value instanceof myPromise && promise.state !== REJECTED) {
    promise = promise.value;
  }

  if (promise.state === PENDING) {
    promise.queue.push(handler);
  } else {
    handleResolved(promise, handler);
  }
}

function handleResolved(promise, handler) {
  setImmediate(() => {
    const cb =
      promise.state === FULFILLED ? handler.onFulfilled : handler.onRejected;
    if (typeof cb !== "function") {
      if (promise.state === FULFILLED) {
        fulfill(handler.promise, promise.value);
      } else {
        reject(handler.promise, promise.value);
      }
      return;
    }

    try {
      const ret = cb(promise.value);
      fulfill(handler.promise, ret);
    } catch (err) {
      reject(handler.promise, err);
    }
  });
}

// fulfill with `value`
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

// reject with `reason`
function reject(promise, reason) {
  promise.state = REJECTED;
  promise.value = reason;
  finale(promise);
}

function finale(promise) {
  var length = promise.queue.length;
  for (var i = 0; i < length; i += 1) {
    handle(promise, promise.queue[i]);
  }
}

// creates the fulfill/reject functions that are arguments of the resolver
function doResolve(promise, resolver) {
  let called = false;

  function wrapFulfill(value) {
    if (called) {
      return;
    }
    called = true;
    fulfill(promise, value);
  }

  function wrapReject(reason) {
    if (called) {
      return;
    }
    called = true;
    reject(promise, reason);
  }

  try {
    resolver(wrapFulfill, wrapReject);
  } catch (err) {
    wrapReject(err);
  }
}

module.exports = myPromise;
