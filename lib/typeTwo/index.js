class myPromise {
  constructor(fn) {
    this.promiseChain = [];
    this.handleError = () => {};

    // the only diffrence from type 1 is that we are now defining
    // onResolve and onReject as arrow function and so now we
    // dont lost our this and our this will point to the class
    // myPromise object
    this.onResolve = (value) => {
      let val = value;

      try {
        this.promiseChain.forEach((nextFunction) => {
          val = nextFunction(val);
        });
      } catch (error) {
        this.promiseChain = [];
        this.onReject(error);
      }
    };

    this.onReject = (error) => {
      this.handleError(error);
    };

    fn(this.onResolve, this.onReject);
  }

  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    return this;
  }

  catch(handleError) {
    this.handleError = handleError;
    return this;
  }
}

module.exports = myPromise;
