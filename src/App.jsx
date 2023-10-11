import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./pages/Homepage/Homepage";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import CategoryArticle from "./pages/CategoryArticle/CategoryArticle";
import Auth from "./pages/Auth/Auth";
import AddArticle from "./pages/AddArticle/AddArticle";

function App() {

  return (
    <BrowserRouter>
    
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addArticle" element={<AddArticle />} />
        <Route path="/category/:categoryName" element={<CategoryArticle />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
