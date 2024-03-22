import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact, useGridFilter } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import styled from "styled-components";

function mapRating(rating) {
  switch (rating) {
    case "fav":
      return "⭐️";
    case "great":
      return "👍👍";
    case "good":
      return "👍";
    case "mid":
      return "😑";
    case "bad":
      return "👎";
    default:
      return "❔";
  }
}

function reverseRating(rating) {
  switch (rating) {
    case "⭐️":
      return "fav";
    case "👍👍":
      return "great";
    case "👍":
      return "good";
    case "😑":
      return "mid";
    case "👎":
      return "bad";
    case "❔":
      return "";
  }
}

const ratingOrderingRaw = ["fav", "great", "good", "mid", "bad", ""];
const ratingOrdering = ratingOrderingRaw.map(mapRating);

const RatingFilterStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  grid-gap: 0.25rem;

  label {
    padding: 0.25rem;
    border-radius: 6px;

    &:hover {
      background-color: white;
      cursor: pointer;
    }
  }
`;

const Grid = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/games");
      const games = await response.json();
      const mapped = games.map((game) => ({
        ...game,
        rating: mapRating(game.rating),
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
      // style={{ height: 500 }} // the grid will fill the size of the parent container
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
            filter: ({ model, onModelChange, getValue }) => {
              const doesFilterPass = useCallback(
                ({ node }) => {
                  // filtering logic
                  return model?.includes(reverseRating(getValue(node))) ?? true;
                },
                [model]
              );

              // register filter callbacks with the grid
              useGridFilter({ doesFilterPass });

              return (
                <RatingFilterStyled>
                  {ratingOrderingRaw.map((rating) => (
                    <label>
                      <input
                        name="rating-filter"
                        type="checkbox"
                        value={rating}
                        onChange={({ target: { value } }) => {
                          const doesModelContainValue = model?.includes(value);

                          if (doesModelContainValue) {
                            // remove the only matching value from model
                            const newModel = model.filter(
                              (item) => item !== value
                            );
                            onModelChange(
                              newModel.length === 0 ? null : newModel
                            );
                          } else {
                            onModelChange(model ? [...model, value] : [value]);
                          }
                        }}
                      />
                      {mapRating(rating)}
                    </label>
                  ))}
                </RatingFilterStyled>
              );
            },
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              const indexOfA = ratingOrdering.indexOf(valueA);
              const indexOfB = ratingOrdering.indexOf(valueB);

              return indexOfA - indexOfB;
            },
          },
          { field: "status" },
          { field: "tags", filter: true },
          { field: "content" },
        ]}
      />
    </div>
  );
};

export default Grid;
