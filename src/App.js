import React, { useEffect } from "react";

function App() {
  const today = new Date();
  let date = today.toISOString().slice(0, 10);
  console.log(date);

  useEffect(() => {
    fetch(
      `https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=${date}&startDate=${date}`,
      {
        method: "GET",
        // mode: "no-cors",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        headers: {
          "Content-Type": "application/xml",
        },
      }
    )
      .then((respone) => console.log(respone))
      // .then((response) => response.json())
      .catch((err) => console.log(err));
  });

  return <div></div>;
}

export default App;
