export default class Response {
  constructor() {}

  static success(action, payload) {
    return {
      type: "success",
      action,
      reason: "",
      payload,
    };
  }

  static error(action, reason, payload) {
    return {
      type: "error",
      action,
      reason,
      payload,
    };
  }
}
