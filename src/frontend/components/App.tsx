import React from "react";
import GameGrid from "./GameGrid";
import { BrowserRouter, Route, Routes } from "react-router";
import BookGrid from "./BookGrid";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<h1>Hi</h1>} />
        <Route path="app">
          <Route index element={<GameGrid />} />
          <Route path="games">
            <Route index element={<GameGrid />} />
          </Route>
          <Route path="books">
            <Route index element={<BookGrid />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
