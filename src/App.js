import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import _ from "lodash";

const calculate = function (tradeHistory) {
  // group contracts
  const groupedTrades = _.groupBy(tradeHistory, "conract");

  // filter the contracts starting with PH
  const phTrades = _.pickBy(groupedTrades, (value, key) =>
    _.startsWith(key, "PH")
  );

  let info = [];
  for (const group in phTrades) {
    let totalTransactionCost = 0;
    let totalTransactionAmount = 0;

    for (const conract of phTrades[group]) {
      totalTransactionCost += (conract.price * conract.quantity) / 10;
      totalTransactionAmount += conract.quantity / 10;
    }
    let averagePrice = totalTransactionCost / totalTransactionAmount;

    // get date info from grouped contract
    const year = +("20" + group.slice(2, 4));
    const month = +group.slice(4, 6);
    const day = +group.slice(6, 8);
    const hour = +group.slice(-2);

    // create a date object and format it using locale string
    const date = new Date(year, month - 1, day, hour);

    info.push({
      date,
      cost: totalTransactionCost.toFixed(2),
      amount: totalTransactionAmount.toFixed(2),
      average: averagePrice.toFixed(2),
    });
  }

  // sort the array by date
  info.sort(function (a, b) {
    let keyA = new Date(a.date),
      keyB = new Date(b.date);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  return info;
};

function App() {
  const [dataTable, setDataTable] = useState([]);

  const now = new Date();
  let today = now.toISOString().slice(0, 10);
  console.log(today);

  useEffect(() => {
    fetch(
      `/transparency/service/market/intra-day-trade-history?endDate=${today}&startDate=${today}`
    )
      .then((response) => response.json())
      .then((data) => {
        const info = calculate(data.body.intraDayTradeHistoryList);
        setDataTable(info);
      })
      .catch((err) => console.log(err));
  }, []);

  const column = [
    { heading: "Tarih", value: "date" },
    { heading: "Toplam İşlem Miktarı (MWh)", value: "amount" },
    { heading: "Toplam İşlem Tutarı (TL)", value: "cost" },
    { heading: "Ağırlıklı Ortalama Fiyat (TL/MWh)", value: "average" },
  ];

  return (
    <div className="App">
      <h1>Sonuç Tablosu</h1>
      <Table data={dataTable} column={column} />
    </div>
  );
}

export default App;
