import React from 'react';
import Header from './header'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'
import logo from '../img/love.svg';

function splitArrayByN (array) {
    if(array.length >= 2){
        console.log(array)
        const mitad = array.length / 2
        const n = mitad.toString().includes(".") ? parseInt(mitad.toString().split(".")[0]) + 1 : mitad
        const results = [array.slice(0, n), array.slice(n)]
        console.log(results)
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
        hasError: false
    }

    componentDidMount(){
        ImageAPI.fecthImages().then((images) => {
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
        console.log(this.state.hasError)
        if(this.state.hasError){
            alert("Something went wrong")
        }

        const images = splitArrayByN(this.state.images)
        console.table(images)
        return (
            <div>
                <Header 
                    searchImages={this.onSearchImage}
                />
                <section className={"section"}>
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
                                        <small>Author: <span>{value.user.name}</span></small>
                                        <div>
                                            <img src={logo} className={"heart"} alt=""/>
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