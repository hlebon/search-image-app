import React from 'react';
import Header from './header'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'
import logo from '../img/love.svg';

class Home extends React.Component{
    state = {
        images: null
    }

    componentDidMount(){
        ImageAPI.fecthImages().then((images) => {
            this.setState({
                images
            })
        })
    }
    
    onSearchImage = (query) => {
        this.setState({
            images: null
        })
        ImageAPI.searchPhoto(query).then((images) => {
            this.setState({
                images: images.results
            })
        })
        console.table(this.state.images)
    }

    render(){
        const { images } = this.state
        console.table(images)
        return (
            <div>
                <Header 
                    searchImages={this.onSearchImage}
                />
                <section className={"section"}>
                    <div className={"items"}>
                    { images ? images.map((image) => 
                        {
                            return (
                                <div key={image.id} className={"item"}>{
                                    <div>
                                        <img src={image.urls.small} alt=""/>
                                        <div className={"item-info"}>
                                            <small>Author: <span>{image.user.name}</span></small>
                                            <div> <img src={logo} className={"heart"} alt=""/><span>{image.user.total_likes}</span></div>
                                        </div>
                                    </div>
                                    
                                }</div>
                            )
                        })
                    :   <div className="loader-container">
                            <div className="loader">
                                <div className="loading-box">
                                    <div className="loading-inner-box">
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;