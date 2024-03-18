import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

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

const ratingOrderingRaw = ["fav", "great", "good", "mid", "bad", ""];
const ratingOrdering = ratingOrderingRaw.map(mapRating);

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
      {/* Something seems to be wrong with the typing on this component */}
      {/* @ts-expect-error */}
      <AgGridReact
        rowData={data}
        columnDefs={[
          {
            field: "name",
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            },
          },
          { field: "filePath" },
          {
            field: "rating",
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              const indexOfA = ratingOrdering.indexOf(valueA);
              const indexOfB = ratingOrdering.indexOf(valueB);

              return indexOfA - indexOfB;
            },
          },
          { field: "status" },
          { field: "tags" },
          { field: "content" },
        ]}
      />
    </div>
  );
};

export default Grid;
