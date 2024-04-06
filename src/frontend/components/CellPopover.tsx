import React from "react";
import styled from "styled-components";
import Popover from "./Popover";

const PopoverStyled = styled.div`
  padding: 0.5rem;
  max-width: 400px;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 6px;

  ${({ isArray }) =>
    isArray
      ? `  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;`
      : ""}

  button {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`;

const PopoverContent = ({ value, setIsOpen }) => (
  <PopoverStyled isArray={Array.isArray(value)}>
    <button onClick={() => setIsOpen(false)}>X</button>
    {Array.isArray(value)
      ? value.map((item) => <div key={item}>{item}</div>)
      : value}
  </PopoverStyled>
);

const CellPopover = ({ value }) => {
  return (
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
        {Array.isArray(value) ? value.join(", ") : value}
      </div>
    </Popover>
  );
};

export default CellPopover;
