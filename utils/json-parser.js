const fs = require("fs");
const { FlightInfo } = require("../src/classes/flight-info");
const { TripInfo } = require("../src/classes/trip-info");

/**
 * フライト情報のJSONをパースし、価格が安い順にソートして
 * 上位5件を新しいJSON文字列として返します。
 *
 * @param {string} jsonString - APIから返された生のJSON文字列。
 * @returns {string|null} 上位5件のフライト情報を含むJSON文字列。エラーの場合はnull。
 */
function getTop5CheapestFlights(jsonString) {
  try {
    // 1. JSON文字列をパース
    const apiResponse = JSON.parse(jsonString);

    // 2. 構造を検証し、flightOffers配列を取得
    if (!apiResponse.data || !Array.isArray(apiResponse.data.flightOffers)) {
      throw new Error(
        "無効なJSON構造です: data.flightOffersが見つからないか、配列ではありません。"
      );
    }
    const flightOffers = apiResponse.data.flightOffers;

    // 3. 価格（units）が安い順に並べ替え
    const sortedOffers = flightOffers.sort((a, b) => {
      const priceA = a.priceBreakdown?.total?.units || Infinity;
      const priceB = b.priceBreakdown?.total?.units || Infinity;
      return priceA - priceB;
    });

    // 4. 上位5件を取得
    const top5 = sortedOffers.slice(0, 5);

    const airlineMap = {};
    if (apiResponse.data.aggregation.airlines) {
      for (const airline of apiResponse.data.aggregation.airlines) {
        airlineMap[airline.iataCode] = airline.name;
      }
    }

    /**
     * @type {Array<TripInfo>}
     */
    return top5.map((offer) => {
      const goFlightInfo = new FlightInfo(
        offer.segments[0].legs[0].carriersData[0].code,
        offer.segments[0].legs[0].carriersData[0].name || "不明",
        offer.segments[0].legs[0].flightInfo.flightNumber,
        offer.segments[0].departureAirport.name,
        offer.segments[0].arrivalAirport.name,
        offer.segments[0].legs[0].departureTime,
        offer.segments[0].legs[0].arrivalTime,
        "TWD"
      );

      const backFlightInfo = new FlightInfo(
        offer.segments[1].legs[0].carriersData[0].code,
        offer.segments[1].legs[0].carriersData[0].name || "不明",
        offer.segments[1].legs[0].flightInfo.flightNumber,
        offer.segments[1].departureAirport.name,
        offer.segments[1].arrivalAirport.name,
        offer.segments[1].legs[0].departureTime,
        offer.segments[1].legs[0].arrivalTime,
        "TWD"
      );

      return new TripInfo(
        goFlightInfo,
        backFlightInfo,
        offer.priceBreakdown.total.units
      );
    });
  } catch (error) {
    console.error("JSONデータの処理中にエラーが発生しました:", error.message);
    return null;
  }
}

/**
 * ファイルを読み込み、上位5件のフライト情報を処理して表示します。
 * @param {string} filePath - 処理対象のファイルパス。
 */
function processFlightDataFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`ファイルの読み込みエラー: ${filePath}`, err);
      return;
    }

    const top5Json = getTop5CheapestFlights(data);

    if (top5Json) {
      console.log("--- 最安値トップ5のフライト情報 ---");
      console.log(top5Json);
    }
  });
}

// 他のファイルから関数をインポートして使用できるようにエクスポート
module.exports = { getTop5CheapestFlights, processFlightDataFile };
