import React from "react";

class ImageCard extends React.Component {
  state = {
    animate: ""
  };
  componentDidMount() {
    this.setState({
      animate: "onload"
    });
  }

  render() {
    const { image } = this.props;
    return (
      <div className={`card ${this.state.animate} loading`}>
        <img className="card-img-top" src={image.urls.small} alt="Card cap" />
        <div className="card-body">
          <div className="d-flex flex-row">
            <div className="p-1">
              <img
                src={image.user.profile_image.small}
                className="rounded-circle float-left"
                alt="profile"
              />
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCard;
