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
            headerImage: values.getRandomPhoto
          },
          () => {
            this.setState({
              loading: false
            });
          }
        );
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

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
        this.setState(
          {
            images: images.results,
            filterBy: query
          },
          () => {
            this.setState({
              loadingGallery: false
            });
          }
        );
      })
      .catch(error => {
        this.setState({
          loadingGallery: false,
          error: true
        });
      });
  };

  onListPhotos = async parameters => {
    this.setState({
      loadingGallery: true,
      filterBy: parameters.orderBy
    });
    try {
      const images = await ImageAPI.fecthImages(parameters);
      this.setState(
        {
          images
        },
        () => {
          this.setState({
            loadingGallery: false
          });
        }
      );
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    if (this.state.loading) return <Loading />;
    const filters = ["popular", "oldest", "lastest"];
    return (
      <div>
        <Header
          onSearchImages={this.onSearchImage}
          img={this.state.headerImage}
          search={this.state.displayHeader}
        />
        <Info
          onListPhotos={this.onListPhotos}
          filterBy={this.state.filterBy}
          filters={filters}
        />
        <Gallery
          loading={this.state.loadingGallery}
          error={this.state.error}
          images={this.state.images}
          onDownloadImage={this.onDownloadImage}
        />
      </div>
    );
  }
}

export default Home;
