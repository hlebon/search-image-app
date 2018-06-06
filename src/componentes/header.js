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
  display: "flex",
  fontSize: "18px",
  height: "100vh",
  justifyContent: "center",
  overflow: "hidden",
  perspective: "100px",
  position: "relative",
  textAlign: "center",
  transformStyle: "preserve-3d",
  "&::before": {
    animation: `${bounce} 2s ease-out forwards`,
    background: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8)),url(${
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
    this.props.searchImages(this.state.query);
  };

  render() {
    const { urls, color = "white" } = this.props.img;
    const img = urls
      ? urls.img
      : "https://cssanimation.rocks/levelup/public/images/background.jpg";
    return (
      <Hero heroImage={this.props.img.urls.full}>
        <div style={{ width: "600px" }}>
          <form>
            <div className="form-group">
              <label style={{ color: color }}>Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="naturaleza, verano, mascotas.. "
              />
            </div>
          </form>
        </div>
      </Hero>
    );
  }
}

Header.propTypes = {
  searchImages: PropTypes.func.isRequired
};

export default Header;
