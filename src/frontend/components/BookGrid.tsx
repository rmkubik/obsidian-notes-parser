import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ratingOrdering, ratingTextToSymbol } from "../data/ratings";
import RatingFilter from "./RatingFilter";
import CellPopover from "./CellPopover";
import last from "../last";

const BookGrid = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/books");
      const books = await response.json();
      const mapped = books.map((book) => ({
        ...book,
        rating: ratingTextToSymbol(book.rating),
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
          // { field: "filePath" },
          {
            field: "rating",
            filter: RatingFilter,
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              const indexOfA = ratingOrdering.indexOf(valueA);
              const indexOfB = ratingOrdering.indexOf(valueB);

              return indexOfA - indexOfB;
            },
          },
          { field: "status", filter: true },
          { field: "tags", filter: true, cellRenderer: CellPopover },
          {
            field: "content",
            cellRenderer: CellPopover,
          },
          {
            field: "links",
            filter: true,
            cellRenderer: CellPopover,
          },
          {
            field: "reads",
            filter: true,
            cellRenderer: CellPopover,
            cellRendererParams: { isDateList: true },
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
              const sortedA: number[] = valueA
                .map((string) => new Date(string).getTime())
                .sort((a, b) => a - b);
              const sortedB: number[] = valueB
                .map((string) => new Date(string).getTime())
                .sort((a, b) => a - b);

              const mostRecentTimeA = last(sortedA) ?? 0;
              const mostRecentTimeB = last(sortedB) ?? 0;

              return mostRecentTimeA - mostRecentTimeB;
            },
          },
        ]}
      />
    </div>
  );
};

export default BookGrid;
