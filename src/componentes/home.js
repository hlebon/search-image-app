import React from 'react';
import Header from './header'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'

function splitArrayByN (array) {
    if(array.length >= 2){
        const mitad = array.length / 2
        const n = mitad.toString().includes(".") ? parseInt(mitad.toString().split(".")[0],10) + 1 : mitad
        const results = [array.slice(0, n), array.slice(n)]
        return results
    }else {
        return [array]
    }   
}

const Loading = (props) => {
    return (
        <div className="loader-container">
            <div className="loading-box">
                <div className="loading-inner-box">
                </div>
            </div>
        </div>
    )
}


class Home extends React.Component{
    state = {
        images: [],
        loading: false,
        hasError: false,
        filterBy: ""
    }

    componentDidMount(){
        ImageAPI.fecthImages().then((images) => {
            console.log(images)
            this.setState({
                images
            })
        })
    }

    componentDidCatch(error, info){
        this.setState({
            hasError: true
        })
    }

    onDownloadImage = (id, event) => {
        console.log(event)
        ImageAPI.getPhoto(id).then(data => {
            console.log(data)
        })
    }
    
    onSearchImage = (query) => {
        this.setState({
            loading: true
        })
        ImageAPI.searchPhoto(query).then((images) => {
                this.setState({
                    images: images.results,
                    loading: false
                })
        })
    }

    render(){
        const images = splitArrayByN(this.state.images)
        return (
            <div>
                <Header 
                    searchImages={this.onSearchImage}
                />
                <section className={"section"}>
                    <div className="section-info-bar">
                        <p>Filter: {this.state.filterBy}</p>
                    </div>

                    {   this.state.loading && 
                        <Loading/>
                    }
                    { 
                        images.map( (image, index) => {
                        return (
                            <div key={index} className={`items`}>
                            { image.map( value => {
                                return ( 
                                <div key={value.id} className={"item"}>
                                    <img src={value.urls.small} alt=""/>
                                    <div className={"item-info"}>
                                        <div>
                                            <small>Author: <span>{value.user.name}</span></small>
                                        </div>
                                        <div>
                                            <a href={value.urls.full} download onClick={(e) => this.onDownloadImage(value.id, e)}>download</a>
                                        </div>
                                        <div>
                                            <p>See on unsplash: </p>
                                            <span>{value.user.total_likes}</span>
                                        </div>
                                    </div>
                                </div>
                                )})
                            }
                            </div>
                            )
                        })
                    }
                </section>
            </div>
        )
    }
}

export default Home;