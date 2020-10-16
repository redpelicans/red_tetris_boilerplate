const rejectTimeout = (errMsg) =>
  new Promise((resolve, reject) => {
    setTimeout(reject, 5000, errMsg);
  });

export const promiseTimeout = (callback, errMsg) =>
  Promise.race([callback(), rejectTimeout(errMsg)]);
