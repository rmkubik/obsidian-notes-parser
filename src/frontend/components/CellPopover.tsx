import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import Popover from "./Popover";
import convertMarkdownToHtml from "../convertMarkdownToHtml";
import formatTimestampAsDate from "../formatDate";

const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const PopoverStyled = styled.div`
  max-width: 550px;
  padding: 0.5rem 1rem;

  background-color: white;
  border: 1px solid lightgray;
  border-radius: 6px;

  max-height: 80vh;

  button {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    margin: 16px;
    border: none;
    background: none;
    font-size: 1.2rem;
    text-shadow: 1px 1px 2px black;
  }

  .title {
    margin-bottom: 0;
    margin-right: 3rem; // Allowance for the close button
  }

  .category {
    font-style: italic;
  }

  .scrollable {
    overflow: auto;
    max-height: 60vh;

    ${({ isArray, isDateList }) =>
      isArray && !isDateList
        ? `  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;`
        : ""}
  }

  ul {
    list-style: none;
    padding: 0;
  }

  h2 {
    margin: 0.2rem;
  }
`;

const DateList = ({ timestamps }: { timestamps: string[] }) => {
  const sortedDates = useMemo(() => {
    return timestamps
      .map((timestamp) => new Date(timestamp).getTime())
      .sort((a, b) => b - a);
  }, [timestamps]);

  // split timestamps by mo/yr
  // add headers
  const monthSeparatedDates = useMemo(() => {
    const sortedTimestamps = timestamps
      .map((timestamp) => new Date(timestamp).getTime())
      .sort((a, b) => b - a);

    const timestampsByMonth = {};

    sortedTimestamps.forEach((timestamp) => {
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const monthId = `${month}-${year}`;
      if (!timestampsByMonth[monthId]) {
        timestampsByMonth[monthId] = [];
      }

      timestampsByMonth[monthId].push(timestamp);
    });

    return Object.entries(timestampsByMonth).sort(([monthIdA], [monthIdB]) => {
      const [monthA, yearA] = monthIdA.split("-").map(parseInt);
      const [monthB, yearB] = monthIdB.split("-").map(parseInt);

      const yearDiff = yearA - yearB;

      if (yearDiff !== 0) return yearDiff;

      return monthA - monthB;
    });
  }, [timestamps]);

  return monthSeparatedDates.map(([monthId, timestamps]) => {
    const [month, year] = monthId.split("-");

    return (
      <div>
        <h2>{`${monthNames[month]} ${year}`}</h2>
        <ul>
          {timestamps.map((timestamp) => (
            <li>{formatTimestampAsDate(timestamp)}</li>
          ))}
        </ul>
      </div>
    );
  });
};

const Markdown = ({ content }: { content: string }) => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    async function renderMarkdown() {
      const newHtml = await convertMarkdownToHtml(content);
      setHtml(newHtml);
    }

    renderMarkdown();
  }, [content]);

  if (!html) return null;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const PopoverContent = ({ title, category, value, setIsOpen, isDateList }) => (
  <PopoverStyled isArray={Array.isArray(value)} isDateList={isDateList}>
    <h1 className="title">{title}</h1>
    <span className="category">{category}</span>
    <button onClick={() => setIsOpen(false)}>❌</button>
    <div className="scrollable">
      {isDateList ? (
        <DateList timestamps={value} />
      ) : Array.isArray(value) ? (
        value.map((item) => <Markdown content={item} />)
      ) : (
        <Markdown content={value} />
      )}
    </div>
  </PopoverStyled>
);

const CellPopover = ({ value, colDef, data, isDateList = false }) => {
  return (
    <Popover
      renderFloating={({ isOpen, setIsOpen }) => (
        <PopoverContent
          value={value}
          setIsOpen={setIsOpen}
          title={data.name}
          category={colDef.field}
          isDateList={isDateList}
        />
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
        {Array.isArray(value) ? value.join(", ") : value}
      </div>
    </Popover>
  );
};

export default CellPopover;
