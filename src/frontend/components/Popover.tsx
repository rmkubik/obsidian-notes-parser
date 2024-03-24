import {
  FloatingPortal,
  useClick,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import React, { useState, Children, cloneElement, ReactNode } from "react";
import styled from "styled-components";

const ReferenceStyled = styled.div`
  cursor: pointer;
`;

const Popover: React.FC = ({ children, renderFloating }) => {
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
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {renderFloating({ isOpen, setIsOpen })}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
