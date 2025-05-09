class myPromise {
  constructor(fn) {
    console.log("constructoor function get caled");
    this.promiseChain = [];
    this.handleError = () => {};
    // these two lines are very important
    // they bind onResolve and onReject function to the myPromise
    // object,so from now,whenever and from wherever this onnResolve
    // or onReject will be called,inside them,this always represent
    // to this myPromise object
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    fn(this.resolve, this.reject);
  }

  then(handleSuccess) {
    console.log("then method get called");
    this.promiseChain.push(handleSuccess);
    return this;
  }
  catch(handleError) {
    console.log("catch method get called");
    this.handleError = handleError;
    return this;
  }
  resolve(value) {
    console.log("onResolve get called");

    try {
      this.promiseChain.forEach((nextFunction) => {
        value = nextFunction(value);
      });
    } catch (error) {
      this.promiseChain = [];
      this.reject(error);
    }
  }

  reject(error) {
    console.log("onReject get called");
    this.handleError(error);
  }
}

module.exports = myPromise;
