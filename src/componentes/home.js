import React from "react";
import Header from "./header";
import Gallery from "./gallery";
import * as ImageAPI from "../help/api";
import "../styles/grid.css";

const Loading = props => {
  return (
    <React.Fragment>
      <div className="loader-container">
        <div className="loading-box">
          <div className="loading-inner-box" />
        </div>
      </div>
    </React.Fragment>
  );
};

class Home extends React.Component {
  state = {
    images: [],
    headerImage: {},
    loading: true,
    filterBy: null,
    error: false
  };

  intervalId;

  componentDidMount() {
    this.setState({
      loading: true
    });
    ImageAPI.getInitialData()
      .then(values => {
        console.log(values);
        this.setState(
          {
            images: values.getRandomImages,
            headerImage: values.getRandomPhoto,
            loading: false
          },
          () => {
            this.updateBgImage();
          }
        );
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  componentWillMount() {
    clearInterval(this.intervalId);
  }

  updateBgImage = () => {
    this.intervalId = setInterval(() => {
      ImageAPI.getRandomPhoto()
        .then(values => {
          console.warn(values);
          this.setState({
            headerImage: values
          });
        })
        .catch(e => {
          console.log(e);
        });
    }, 600000);
  };

  onDownloadImage = (id, event) => {
    ImageAPI.getPhoto(id)
      .then(data => {})
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  onSearchImage = query => {
    this.setState({
      loading: true
    });
    ImageAPI.searchPhoto(query)
      .then(images => {
        this.setState({
          images: images.results,
          loading: false,
          filterBy: query,
          error: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        <Header
          searchImages={this.onSearchImage}
          img={this.state.headerImage}
        />
        {this.state.error ? (
          <h1>Soy yo, no tu :(</h1>
        ) : (
          <Gallery
            filterBy={this.state.filterBy}
            images={this.state.images}
            onDownloadImage={this.onDownloadImage}
          />
        )}
      </div>
    );
  }
}

export default Home;
