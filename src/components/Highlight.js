import React from "react";

const Highlight = ({ children }) => {
  return (
    <div className="highlight">
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default Highlight;
