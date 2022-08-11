import React from "react";
import Api from "./components/Api";
import Home from "./routes/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./routes/About";
import { Box, Tabs, Tab } from "@mui/material";

function App() {
  return (
    <Router>
      <Link to="/" style={{ padding: 5 }}>
        Home
      </Link>
      <Link to="/about" style={{ padding: 5 }}>
        About
      </Link>
      <Link to="/voos" style={{ padding: 5 }}>
        Voos
      </Link>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/voos" element={<Api />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
