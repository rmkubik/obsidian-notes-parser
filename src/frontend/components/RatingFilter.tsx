import React, { useCallback } from "react";
import styled from "styled-components";
import {
  ratingOrderingRaw,
  ratingSymbolToText,
  ratingTextToSymbol,
} from "../data/ratings";
import { useGridFilter } from "ag-grid-react";

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

const RatingFilter = ({ model, onModelChange, getValue }) => {
  const doesFilterPass = useCallback(
    ({ node }) => {
      // filtering logic
      return model?.includes(ratingSymbolToText(getValue(node))) ?? true;
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
                const newModel = model.filter((item) => item !== value);
                onModelChange(newModel.length === 0 ? null : newModel);
              } else {
                onModelChange(model ? [...model, value] : [value]);
              }
            }}
          />
          {ratingTextToSymbol(rating)}
        </label>
      ))}
    </RatingFilterStyled>
  );
};

export default RatingFilter;
