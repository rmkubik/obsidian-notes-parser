import {
  FloatingPortal,
  useClick,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import React, { useState } from "react";
import styled from "styled-components";

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

const ReferenceStyled = styled.div`
  cursor: pointer;
`;

const Popover: React.FC = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <>
      <ReferenceStyled ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </ReferenceStyled>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              backgroundColor: "white",
              maxWidth: "400px",
              padding: "0.5rem",
            }}
            {...getFloatingProps()}
          >
            <PopoverStyled>
              <button onClick={() => setIsOpen(false)}>X</button>
              {value.map((item) => (
                <div>{item}</div>
              ))}
            </PopoverStyled>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
