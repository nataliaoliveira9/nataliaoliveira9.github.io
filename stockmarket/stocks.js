function createRows() {
  let prices = document
    .getElementById("stockPrices")
    .getElementsByTagName("tbody")[0];
  let periods = document.getElementById("periods").value;
  let pricesLength = document.getElementById("stockPrices").rows.length;

  // Creating metadata rows

  let chartSymbol = prices.insertRow();
  chartSymbol.insertCell().innerHTML = "Symbol:";
  chartSymbol.insertCell().setAttribute("id", "symbol");
  let chartCurrency = prices.insertRow();
  chartCurrency.insertCell().innerHTML = "Currency:";
  chartCurrency.insertCell().setAttribute("id", "currency");
  let chartExchange = prices.insertRow();
  chartExchange.insertCell().innerHTML = "Exchange:";
  chartExchange.insertCell().setAttribute("id", "exchange");

  // creating header row

  let header = prices.insertRow();
  header.classList.add("tableHeader");
  header.insertCell().innerHTML = "Date";
  header.insertCell().innerHTML = "Open";
  header.insertCell().innerHTML = "High";
  header.insertCell().innerHTML = "Low";
  header.insertCell().innerHTML = "Close";

  // Adding rows for data and adding classes to each columns

  for (let i = pricesLength; i < periods; i++) {
    let row = prices.insertRow();
    row.insertCell().classList.add("data");
    row.insertCell().classList.add("open");
    row.insertCell().classList.add("high");
    row.insertCell().classList.add("low");
    row.insertCell().classList.add("close");
  }
}

function getData() {
  let ticker = document.getElementById("ticker").value;
  let time = document.getElementById("time").value;
  let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=${time}&apikey=7227d36e03f248d28a281745ced26940`;
  let periods = document.getElementById("periods").value;

  // Fetching data from the API

  let stockData = fetch(url);
  stockData
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      showData(d);
    });

  // Putting the newly created cells into an array

  let timeRange = Array.apply(null, document.querySelectorAll(".data"));
  let open = Array.apply(null, document.querySelectorAll(".open"));
  let high = Array.apply(null, document.querySelectorAll(".high"));
  let low = Array.apply(null, document.querySelectorAll(".low"));
  let close = Array.apply(null, document.querySelectorAll(".close"));

  function showData(d) {
    let symbol = d.meta.symbol;
    let currency = d.meta.currency;
    let exchange = d.meta.exchange;

    document.getElementById("symbol").innerText = symbol;
    document.getElementById("currency").innerText = currency;
    document.getElementById("exchange").innerText = exchange;

    // Putting fetched data into the new cells

    for (i = 0; i < periods; i++) {
      timeRange[i].innerText = d.values[i].datetime;
      open[i].innerText = `$${Number(d.values[i].open).toFixed(2)}`;
      high[i].innerText = `$${Number(d.values[i].high).toFixed(2)}`;
      low[i].innerText = `$${Number(d.values[i].low).toFixed(2)}`;
      close[i].innerText = `$${Number(d.values[i].close).toFixed(2)}`;
    }

    /*
     ** In a typical stock chart, the oldest data should appear on the left and newest data should appear on the right.
     ** To do this, we should create new arrays with the oldest data at the start of the array and the newest data
     ** at the end. We will create empty arrays first and then use the unshift() method to reverse data order.
     */

    let dataTime = [];
    let dataOpen = [];
    let dataHigh = [];
    let dataLow = [];
    let dataClose = [];

    for (let i = 0; i < periods; i++) {
      dataTime.unshift(d.values[i].datetime);
      dataOpen.unshift(d.values[i].open);
      dataHigh.unshift(d.values[i].high);
      dataLow.unshift(d.values[i].low);
      dataClose.unshift(d.values[i].close);
    }

    // Chart Settings

    const data = {
      labels: dataTime,
      datasets: [
        {
          label: symbol,

          data: dataClose,
          backgroundColor: ["rgba(130, 247, 255, 0.2)"],
          borderColor: ["rgba(130, 247, 255, 1)"],
          borderWidth: 2,
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    };

    // Create a new chart

    let myChart = new Chart(document.getElementById("myChart"), config);

    // Clear button with remove all table rows and destroy the new chart

    const clearBtn = document.querySelector("#clear");
    clearBtn.addEventListener("click", () => {
      myChart.destroy();
      document
        .getElementById("stockPrices")
        .getElementsByTagName("tbody")[0].innerHTML = "";
      document.getElementById("stockChart").innerHTML = "";
      document.getElementById("results").classList.add("hide");
      document.getElementById("ticker").value = "";
      document.getElementById("periods").value = "";
      document.getElementById("time").value = "none";
    });
  }
}

// Submit button to create table rows, fetch data and create the chart

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", () => {
  document
    .getElementById("stockPrices")
    .getElementsByTagName("tbody")[0].innerHTML = "";
  document.getElementById("stockChart").innerHTML = "";

  createRows();
  document.getElementById("results").classList.remove("hide");

  let div = document.getElementById("stockChart");
  let canvas = document.createElement("canvas");
  canvas.id = "myChart";
  div.appendChild(canvas);

  getData();
});

// Back to previous page button

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.history.go(-1);
  return false;
});
