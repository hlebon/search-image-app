import React from 'react';
import Header from './header'
import Gallery from './gallery'
import ErrorBoundary from './errorBoundary'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'



const Loading = (props) => {
    return (
        <React.Fragment>
        {
        props.loading && 
            <div className="loader-container">
                <div className="loading-box">
                    <div className="loading-inner-box">
                    </div>
                </div>
            </div>
        }
        </React.Fragment>
    )
}


class Home extends React.Component{
    state = {
        images: [],
        loading: false,
        filterBy: null
    }

    componentDidMount(){
        ImageAPI.fecthImages().then((images) => {
            console.log(images)
            this.setState({
                images
            })
        })
    }

    onDownloadImage = (id, event) => {
        ImageAPI.getPhoto(id).then(data => {
            console.log(data)
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
                    filterBy: query
                })
        })
    }

    render(){
        return (
            <div>
                <Loading loading={this.state.loading}/>
                <Header searchImages={this.onSearchImage}/>
                <ErrorBoundary>
                    <Gallery filterBy={this.state.filterBy} images={this.state.images} onDownloadImage={this.onDownloadImage} />
                </ErrorBoundary>
            </div>
        )
    }
}

export default Home;