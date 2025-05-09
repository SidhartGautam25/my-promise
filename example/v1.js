const myPromise = require("../lib/typeeOne/index");

function fakeApi() {
  const user = {
    name: "navneet",
    job: "implementing promises",
  };
  if (Math.random() > 0.08) {
    return {
      data: user,
      statusCode: 200,
    };
  } else {
    const error = {
      statusCode: 404,
      error: "user dont exist",
    };

    return error;
  }
}

function callingFakeApi() {
  return new myPromise((resolve, reject) => {
    console.log("i am get called");
    setTimeout(() => {
      const res = fakeApi();
      if (res.statusCode == 404) {
        reject(res);
      } else {
        resolve(res.data);
      }
    }, 0);
  });
}

callingFakeApi()
  .then((user) => {
    console.log("this is the first then");
    return user;
  })
  .then((user) => {
    console.log("user is ", user);
    return user.name;
  })
  .then((name) => {
    console.log("name of the user is ", name);
  })
  .catch((err) => {
    console.log("some error occured ", err);
  });
