import React from "react";
import { useState } from "react";

interface Props {
  maxChars?: number;
  onClick: () => void;
  children: React.ReactNode;
}

const ExpandableText: React.FC<Props> = ({ children, maxChars = 50 }) => {
  const [expanded, setExpanded] = useState(false);

  // if (children.length <= maxChars) return <p>{children}</p>;

  // const text = expanded ? children : `${children.substring(0, maxChars)}...`;
  const toggle = () => {
    setExpanded(!expanded);
  };

  const textContent = React.Children.toArray(children).join("");

  const displayText = expanded
    ? textContent
    : `${textContent.substring(0, maxChars)}...`;

  return (
    <div>
      {displayText}
      {textContent.length > maxChars && (
        <button onClick={toggle}>{expanded ? "Less" : "More"}</button>
      )}
    </div>
  );
  // {/* {expandable && children}
};

export default ExpandableText;
