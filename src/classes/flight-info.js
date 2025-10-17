/**
 * FlightInfo クラス - フライトに関する情報を保持・取得するためのデータモデル。
 *
 * @class FlightInfo
 * @param {string} airlineCode - 航空会社コード（例: "NH", "JL"）
 * @param {string} airlineName - 航空会社名（例: "ANA", "Japan Airlines"）
 * @param {string} flightNumber - フライト番号（例: "1234"）
 * @param {string} departureAirport - 出発空港（名称またはIATAコード）
 * @param {string} arrivalAirport - 到着空港（名称またはIATAコード）
 * @param {string|Date} departureTime - 出発時刻（ISO文字列またはDateオブジェクト）
 * @param {string|Date} arrivalTime - 到着時刻（ISO文字列またはDateオブジェクト）
 * @param {number} price - 料金（数値）
 * @param {string} currency - 通貨コード（例: "JPY", "USD"）
 *
 * @property {string} airlineCode - 航空会社コード
 * @property {string} airlineName - 航空会社名
 * @property {string} flightNumber - フライト番号
 * @property {string} departureAirport - 出発空港
 * @property {string} arrivalAirport - 到着空港
 * @property {string|Date} departureTime - 出発時刻
 * @property {string|Date} arrivalTime - 到着時刻
 * @property {number} price - 価格
 * @property {string} currency - 通貨
 *
 * @example
 * // 例:
 * // const f = new FlightInfo('NH', 'ANA', '1234', 'HND', 'KIX', '2025-10-17T10:00:00Z', '2025-10-17T11:30:00Z', 12000, 'JPY');
 * // console.log(f.summary);
 *
 * @description
 * インスタンスはフライトの基本情報を保持します。summary ゲッターは一行の要約を返し、
 * toString ゲッターは日本語の多行フォーマットで詳細を返します。
 *
 * @memberof module:FlightInfo
 *
 * ---- ゲッターについて ----
 * @readonly
 * @name summary
 * @type {string}
 * @description 航空会社名・コード・フライト番号・出発・到着および時刻を一行で表した要約文字列を返します。
 *
 * @readonly
 * @name toString
 * @type {string}
 * @description 日本語ラベル付きの多行文字列を返します（航空会社コード、航空会社名、フライト番号、空港、時刻、価格など）。
 */
class FlightInfo {
  constructor(
    airlineCode,
    airlineName,
    flightNumber,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime
  ) {
    this.airlineCode = airlineCode;
    this.airlineName = airlineName;
    this.flightNumber = flightNumber;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
  }

  get summary() {
    return `${this.airlineName} (${this.airlineCode}) ${this.flightNumber}: ${this.departureAirport} (${this.departureTime}) -> ${this.arrivalAirport} (${this.arrivalTime})`;
  }

  get toString() {
    return `
      航空会社コード: ${this.airlineCode}
      航空会社名: ${this.airlineName}
      フライト番号: ${this.flightNumber}
      出発空港: ${this.departureAirport}
      到着空港: ${this.arrivalAirport}
      出発時刻: ${this.departureTime}
      到着時刻: ${this.arrivalTime}
    `;
  }
}

module.exports = { FlightInfo };
