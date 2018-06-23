import React from "react";
import PropTypes from "prop-types";
import ImageCard from "./ImageCard";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faStar from "@fortawesome/fontawesome-free-solid/faStar";
import faHeart from "@fortawesome/fontawesome-free-solid/faHeart";

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

class Gallery extends React.Component {
  render() {
    const { filterBy, onDownloadImage, images, error, loading } = this.props;
    if (loading) return <Loading />;
    if (error) return <h1>Ups! hemos tenido un error!</h1>;
    return (
      <section id="gallery" className="container">
        {!images.length && <h1>Ups!, Intentalo de nuevo</h1>}
        {images.length > 0 && (
          <div className="card-columns">
            {images.map((image, index) => (
              <ImageCard image={image} key={image.id}>
                <div className="p-1">
                  <a href={image.user.links.html}>
                    <small className="text-muted">{image.user.name}</small>
                  </a>
                </div>
                <div className="ml-auto p1 d-flex flex-row">
                  <div className="p-1">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <div className="p-1 text-muted">
                    <small className="text-muted">{image.likes}</small>
                  </div>
                  <div className="p-1">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
              </ImageCard>
            ))}
          </div>
        )}
      </section>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  filterBy: PropTypes.string,
  onDownloadImage: PropTypes.func.isRequired
};

const styles = {
  img: {
    width: "400px",
    height: "250px"
  }
};

export default Gallery;
