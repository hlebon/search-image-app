import React, { Component } from "react";

class Info extends Component {
  state = {};

  render() {
    return (
      <div
        className="p-3 mb-2 text-white d-flex flex-row"
        style={{ backgroundColor: "#3f51b5" }}
      >
        <div className="container d-flex flex-row">
          <div>
            <button
              onClick={this.props.displaySearch}
              type="button"
              className="btn btn-outline-light"
            >
              Nueva Busqueda
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
