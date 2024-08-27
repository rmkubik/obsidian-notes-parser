import {
  autoPlacement,
  autoUpdate,
  FloatingOverlay,
  FloatingPortal,
  shift,
  useClick,
  useDismiss,
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
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [shift({ padding: 20 }), autoPlacement()],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <>
      <ReferenceStyled ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </ReferenceStyled>
      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay
            style={{
              background: "rgba(0,0,0,0.6)",
              // TODO: probably should change the relative zindex of the grid itself so our stuff doesn't
              // conflict somehow?
              zIndex: 3, // AG grid header items use some zindex, we need popovers to render above them
            }}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {renderFloating({ isOpen, setIsOpen })}
            </div>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
