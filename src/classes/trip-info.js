const { FlightInfo } = require("./flight-info.js");

/**
 * @class TripInfo
 * @param {FlightInfo} goFlightInfo
 * @param {FlightInfo} backFlightInfo
 * @param {number} price
 *
 * @property {FlightInfo} goFlightInfo
 * @property {FlightInfo} backFlightInfo
 * @property {number} price
 */
class TripInfo {
  constructor(goFlightInfo, backFlightInfo, price) {
    this.goFlightInfo = goFlightInfo;
    this.backFlightInfo = backFlightInfo;
    this.price = price;
  }

  get toString() {
    return ```
        行く飛行機： ${this.goFlightInfo.toString()},
        戻る飛行機： ${this.backFlightInfo.toString()}
    ```;
  }
}

module.exports = { TripInfo };
