export default class Response {
  constructor() {}

  static success(action, payload) {
    return {
      type: "success",
      action,
      payload,
    };
  }

  static error(action, reason, payload = null) {
    const res = {
      type: "error",
      action,
      reason,
    };

    if (payload) {
      res.payload = payload;
    }

    return res;
  }
}
