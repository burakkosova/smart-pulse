import React, { useEffect } from "react";
import _ from "lodash";

const calculate = function (tradeHistory) {
  // group contracts
  const groupedTrades = _.groupBy(tradeHistory, "conract");

  // filter the contracts starting with PH
  const phTrades = _.pickBy(groupedTrades, (value, key) =>
    _.startsWith(key, "PH")
  );

  // let info = [];
  let info = new Map();
  for (const group in phTrades) {
    let totalTransactionCost = 0;
    let totalTransactionAmount = 0;

    for (const conract of phTrades[group]) {
      totalTransactionCost += (conract.price * conract.quantity) / 10;
      totalTransactionAmount += conract.quantity / 10;
    }
    let averagePrice = totalTransactionCost / totalTransactionAmount;

    // info.push({
    //   [group]: [totalTransactionCost, totalTransactionAmount, averagePrice],
    // });

    info.set(group, [
      totalTransactionCost,
      totalTransactionAmount,
      averagePrice,
    ]);
  }

  console.log(info);
};

function App() {
  const today = new Date();
  let date = today.toISOString().slice(0, 10);
  console.log(date);

  useEffect(() => {
    fetch(
      `/transparency/service/market/intra-day-trade-history?endDate=${date}&startDate=${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        calculate(data.body.intraDayTradeHistoryList);
      })
      .catch((err) => console.log(err));
  });

  return <div></div>;
}

export default App;
