export default class Response {
  constructor() {}

  static success(action, payload, reason = null) {
    const res = {
      type: "success",
      action,
      payload,
    };

    if (reason) {
      res.reason = reason;
    }

    return res;
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
