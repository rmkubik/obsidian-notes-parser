import React from "react";
import GameGrid from "./GameGrid";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import BookGrid from "./BookGrid";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<h1>Hi</h1>} />
        <Route path="app">
          <Route
            index
            element={
              <ul>
                <li>
                  <Link to="/app/games">Games database</Link>
                </li>
                <li>
                  <Link to="/app/books">Books database</Link>
                </li>
              </ul>
            }
          />
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
