import React from "react";

function FilterLink({ children, makeRequest, selected }) {
  return (
    <a
      href="#"
      onClick={makeRequest}
      className="link"
      style={{ color: selected ? "#468c49" : "gray" }}
    >
      {children}
    </a>
  );
}

export default FilterLink;
