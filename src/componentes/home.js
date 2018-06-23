import React from "react";
import Header from "./header";
import Gallery from "./gallery";
import Info from "./Info";
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
    loadingGallery: false,
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

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  updateBgImage = () => {
    this.intervalId = setInterval(() => {
      ImageAPI.getRandomPhoto()
        .then(values => {
          this.setState({
            headerImage: values
          });
        })
        .catch(e => {
          console.log(e);
        });
    }, 6000000);
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
      loadingGallery: true
    });
    ImageAPI.searchPhoto(query)
      .then(images => {
        images.total > 0;
        this.setState({
          images: images.results,
          loadingGallery: false,
          filterBy: query
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loadingGallery: false,
          error: true
        });
      });
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div>
        <Header
          onSearchImages={this.onSearchImage}
          img={this.state.headerImage}
          search={this.state.displayHeader}
        />
        <Gallery
          loading={this.state.loadingGallery}
          error={this.state.error}
          filterBy={this.state.filterBy}
          images={this.state.images}
          onDownloadImage={this.onDownloadImage}
        />
      </div>
    );
  }
}

export default Home;
