import {
  FloatingPortal,
  useClick,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import React, { useState } from "react";

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
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            onClick={() => setIsOpen(false)}
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              backgroundColor: "white",
              maxWidth: "400px",
              padding: "0.5rem",
            }}
            {...getFloatingProps()}
          >
            {value}
          </div>{" "}
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
