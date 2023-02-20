export default class Logger {
  static log(message) {
    console.log(message);
  }

  static error(message) {
    console.error(message);
  }

  /**
   * @param {object} error
   * @param {string} errorMessage
   */
  static backendError(error, errorMessage = "backendError") {
    Logger.error(errorMessage);
    Logger.error("--------- ERROR --------------");
    Logger.error(error);
    Logger.error("--------- END ERROR -----------");
    Logger.error("");
  }
}
