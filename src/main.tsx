import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GifsApp } from "./GifsApp";
import { BrowserRouter } from "react-router-dom";

// import { MyCounterApp } from "./counter/components/MyCounterApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/react_GifExpertApp/">
      <GifsApp />
      {/* <MyCounterApp /> */}
    </BrowserRouter>
  </StrictMode>
);
