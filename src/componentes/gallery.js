import React from "react";
import PropTypes from "prop-types";
import Heart from "../img/heart";

class Gallery extends React.Component {
  render() {
    const { filterBy, onDownloadImage, images } = this.props;
    console.table(images);
    return (
      <section className="container">
        <div className="card-columns">
          {images.map((image, index) => {
            return (
              <div className="card" key={image.id}>
                <img
                  className="card-img-top"
                  src={image.urls.small}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {image.description ? image.description : "No description"}
                  </h5>
                  {image.user.bio && (
                    <p className="card-text">{image.user.bio}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="p-1">
                      <img
                        src={image.user.profile_image.small}
                        className="rounded-circle float-left"
                        alt="profile image"
                      />
                    </div>
                    <div className="p-1">
                      <a href={image.user.links.html}>
                        <small className="text-muted">{image.user.name}</small>
                      </a>
                    </div>
                    <div className="ml-auto p1 d-flex flex-row">
                      <div className="p-1 text-muted">
                        <small className="text-muted">{image.likes}</small>
                      </div>
                      <Heart />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
