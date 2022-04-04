import React, { useEffect } from "react";

function App() {
  const today = new Date();
  let date = today.toISOString().slice(0, 10);
  console.log(date);

  useEffect(() => {
    fetch(
      `/transparency/service/market/intra-day-trade-history?endDate=${date}&startDate=${date}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  });

  return <div></div>;
}

export default App;
