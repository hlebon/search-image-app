import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

function splitArrayInTwo (array) {
    if(array.length >= 2){
        const mitad = array.length / 2
        const n = mitad.toString().includes(".") ? parseInt(mitad.toString().split(".")[0],10) + 1 : mitad
        const results = [array.slice(0, n), array.slice(n)]
        return results
    }else {
        return [array]
    }   
}

class Gallery extends React.Component{
    state = {
        isModalOpen: false,
        img: null
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    openModal = (img) => {
        this.setState({
            isModalOpen: true,
            img
        })

        console.log(this.img)
    }

    render(){
        const { filterBy, onDownloadImage } = this.props
        const images = splitArrayInTwo(this.props.images)
        return(
            <section className="section">
                <div className="section-info-bar">
                    {
                        filterBy && 
                        <p>Filter: {filterBy}, Total de resultados: {this.props.images.length}</p>
                    }
                </div>
                    {
                        images.map( (image, index) => {
                        return (
                            <div key={index} className={`items`}>
                            { 
                                image.map( value => {
                                return ( 
                                    <div key={value.id} className={"item"} onClick={() => this.openModal(value)}>
                                        <img src={value.urls.small} alt=""/>
                                        <div className={"item-info"}>
                                            <div>
                                                <div>{value.user.name}</div>
                                                <div>See on <a href={value.user.links.html} target="_blank">unsplash</a></div>
                                                <div>
                                                    <a href={value.urls.full} download onClick={(e) => onDownloadImage(value.id)}>download</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )})
                            }
                            </div>
                            )
                        })
                    }
                    <Modal
                        className="modal"
                        overlayClassName="overlay"
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Modal"
                    >
                        { this.state.isModalOpen &&
                        <div className="modal-body">
                            <img src={this.state.img.urls.regular} alt=""/>
                            <div className="modal-info">
                                <img src={this.state.img.user.profile_image.medium} alt=""/>
                                <p>Name: {this.state.img.user.name}</p>
                                <p>Location: {this.state.img.user.location}</p>
                                <p>twitter: {this.state.img.user.twitter_username}</p>
                                <p>instagram: {this.state.img.user.instagram_username}</p>
                                <p>fotos: {this.state.img.user.total_photos}</p>
                                <p>Likes: {this.state.img.user.total_likes}</p>
                            </div>
                        </div>
                        }
                        
                    </Modal>
            </section>
        )
    }
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
    filterBy: PropTypes.string,
    onDownloadImage: PropTypes.func.isRequired
}

export default Gallery