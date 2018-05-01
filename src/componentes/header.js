import React from "react";
import PropTypes from "prop-types";
import * as ImageAPI from "../help/api";

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
      <header>
        <img
          src={
            this.props.img.urls
              ? this.props.img.urls.regular
              : "https://fakeimg.pl/2000x1600/?text=Error"
          }
          alt="hero"
          style={styles.hero}
        />
        <div style={styles.containerForm}>
          <form
            onSubmit={this.handleOnSubmit}
            style={{
              color: `white`,
              textShadow: `0 1px 0 ${this.props.img.color}`
            }}
          >
            <h1>Welcome to Search Image App</h1>
            <h3>
              Beautiful Photos by <span>Unsplash</span>
            </h3>
            <input
              type="text"
              val={this.state.query}
              onChange={this.handleOnChange}
              required
            />
            <input type="submit" value="Buscar" />
          </form>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  searchImages: PropTypes.func.isRequired
};

const styles = {
  hero: {
    objectFit: "cover",
    height: "100vh",
    transformOrigin: "0 0",
    transformStyle: "preserve-3d",
    perspective: "100px",
    background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8))"
  },
  containerForm: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  form: {
    width: "50%",
    margin: "auto"
  }
};

export default Header;
