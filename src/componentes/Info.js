import React, { Component } from "react";
import FilterLink from "./FilterLink";
class Info extends Component {
  render() {
    const { onListPhotos, filters, filterBy } = this.props;
    return (
      <div className="container d-flex p-3 mb-2">
        {filters.map((filter, index) => {
          const selected = filter.trim() === filterBy;
          return (
            <FilterLink
              selected={selected}
              key={index}
              makeRequest={() => onListPhotos({ orderBy: filter })}
            >
              {filter}
            </FilterLink>
          );
        })}
      </div>
    );
  }
}

export default Info;
