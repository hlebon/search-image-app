import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as ImageAPI from "../help/api";

const Hero = glamorous("header", { propsAreCssOverrides: true })({
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
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8)),url(https://cssanimation.rocks/levelup/public/images/background.jpg) no-repeat bottom",
    backgroundSize: "cover",
    content: "",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1
  }
});

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
    console.log(this.props.img);
    return (
      <Hero>
        <div style={{ width: "600px" }}>
          <form>
            <div className="form-group">
              <label>Buscar</label>
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
