import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styled from "styled-components";
import { ratingOrdering, ratingTextToSymbol } from "../data/ratings";
import RatingFilter from "./RatingFilter";
import Popover from "./Popover";

const PopoverStyled = styled.div`
  padding: 0.5rem;
  max-width: 400px;
  padding: 0.5rem;
  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 6px;

  button {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`;

const PopoverContent = ({ value, setIsOpen }) => (
  <PopoverStyled>
    <button onClick={() => setIsOpen(false)}>X</button>
    {value.map((item) => (
      <div key={item}>{item}</div>
    ))}
  </PopoverStyled>
);

const Grid = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/games");
      const games = await response.json();
      const mapped = games.map((game) => ({
        ...game,
        rating: ratingTextToSymbol(game.rating),
      }));

      setData(mapped);
    }

    fetchData();
  }, []);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
    >
      <AgGridReact
        reactiveCustomComponents
        rowData={data}
        columnDefs={[
          {
            field: "name",
            filter: true,
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            },
          },
          { field: "filePath" },
          {
            field: "rating",
            filter: RatingFilter,
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              const indexOfA = ratingOrdering.indexOf(valueA);
              const indexOfB = ratingOrdering.indexOf(valueB);

              return indexOfA - indexOfB;
            },
          },
          { field: "status" },
          { field: "tags", filter: true },
          { field: "content" },
          {
            field: "links",
            cellRenderer: ({ value }) => (
              <Popover
                renderFloating={({ isOpen, setIsOpen }) => (
                  <PopoverContent value={value} setIsOpen={setIsOpen} />
                )}
              >
                <div
                  tabIndex="-1"
                  role="gridcell"
                  col-id="content"
                  className="ag-cell ag-cell-not-inline-editing ag-cell-normal-height ag-cell-value"
                  aria-colindex="6"
                  // style="left: 1000px; width: 200px;"
                >
                  {value.join(", ")}
                </div>
              </Popover>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Grid;
