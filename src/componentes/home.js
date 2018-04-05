import React from 'react';
import Header from './header'
import Gallery from './gallery'
import ErrorBoundary from './errorBoundary'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'



const Loading = (props) => {
    return (
        <React.Fragment>
            <div className="loader-container">
                <div className="loading-box">
                    <div className="loading-inner-box">
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


class Home extends React.Component{
    state = {
        images: [],
        headerImage: {},
        loading: true,
        filterBy: null,
        error: false,
        errorMessage: ""
    }

    componentDidMount(){
        ImageAPI.getInitialData()
        .then(values => {
            this.setState({
                images: values.getRandomImages,
                headerImage: values.getRandomPhoto,
                loading: false
            })
        })
        .catch(error => {
            this.setState({
                error: true,
                errorMessage: "It's not you, it's me... try later"
            })
        })
    }

    onDownloadImage = (id, event) => {
        ImageAPI.getPhoto(id).then(data => {
            console.log(data)
        }).catch(error => {
            this.setState({
                error: true,
                errorMessage: "Ups! download problems."
            })
        })
    }
    
    onSearchImage = (query) => {
        this.setState({
            loading: true
        })
        ImageAPI.searchPhoto(query).then((images) => {
            console.log(images)
                this.setState({
                    images: images.results,
                    loading: false,
                    filterBy: query,
                    error: false,
                    errorMessage: ""
                })
        }).catch(error => {
            console.log(error)
            this.setState({
                loading: false,
                error: true,
                errorMessage: "Cannot establish connection, try later :)"
            })
        })
    }

    render(){
        console.log("loading", this.state.loading)
        if(this.state.loading){
            return <Loading/>
        }
        return (
            <div>
                <Header searchImages={this.onSearchImage} img={this.state.headerImage}/>
                <Gallery filterBy={this.state.filterBy} images={this.state.images} onDownloadImage={this.onDownloadImage} />
            </div>
        )
    }
}

export default Home;