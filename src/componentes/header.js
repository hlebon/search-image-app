import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "react-emotion";
import * as ImageAPI from "../help/api";

const bounce = keyframes`
0% {
  opacity: 0;
  transform: translateY(-4rem);
}
100% {
  opacity: 1;
  transform: none;
}
`;

// emotion
const Hero = styled("div")(props => ({
  alignItems: "center",
  backgroundColor: "#333",
  display: props.search ? "flex" : "none",
  fontSize: "18px",
  height: "75vh",
  justifyContent: "center",
  overflow: "hidden",
  perspective: "100px",
  position: "relative",
  textAlign: "center",
  transformStyle: "preserve-3d",
  "&::before": {
    animation: `${bounce} 4s ease-out forwards`,
    background: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)),url(${
      props.heroImage
    }) no-repeat bottom`,
    backgroundSize: "cover",
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1
  },
  "&::after": {
    background: "#F9FCFF",
    content: '""',
    height: "40rem",
    left: "-5%",
    position: "absolute",
    right: "-5%",
    top: "90%",
    transformOrigin: "0 0",
    transform: "rotateZ(-4deg)"
  }
}));

class Header extends React.Component {
  state = {
    query: ""
  };

  handleOnChange = event => {
    const query = event.target.value;
    this.setState({
      query
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    event.target.reset();
    this.props.onSearchImages(this.state.query);
  };

  render() {
    const { urls } = this.props.img;
    const img = urls
      ? urls.regular
      : "https://cssanimation.rocks/levelup/public/images/background.jpg";
    return (
      <Hero heroImage={img} search={this.props.search}>
        <div style={{ width: "600px" }}>
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <h1 style={{ color: "white", textShadow: "0 1px 2px white" }}>
                Buscar
              </h1>
              <input
                value={this.state.query}
                onChange={this.handleOnChange}
                type="text"
                className="form-control"
                placeholder="naturaleza, verano, mascotas.. "
                style={{ padding: ".775rem .85rem" }}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="button">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </Hero>
    );
  }
}

Header.defaultProps = {
  search: true
};

Header.propTypes = {
  onSearchImages: PropTypes.func.isRequired,
  search: PropTypes.bool
};

export default Header;
