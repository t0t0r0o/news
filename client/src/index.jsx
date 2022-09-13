import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./containers/Home/home";
import News from "./containers/News/news";
import Weather from "./containers/Weather/weather";
import Stock from "./containers/Stock/stock";

// import css
require(process.env.REACT_APP_CSS_URL + "/index/index.css");


function Initialize() {
  
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/news" element={<News />}></Route>
      <Route exact path="/weather" element={<Weather />}></Route>
      <Route exact path="/stock" element={<Stock />}></Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Initialize />
    </BrowserRouter>
  </React.StrictMode>
);
