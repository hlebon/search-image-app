import React from 'react';
import Header from './header'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'
import logo from '../img/love.svg';

function splitArrayByN (array, n) {

    array.map( x => {
        return x;
    })
    let results = []
    let start = 0;
    let end = n;
    while( start <= array.length){
        results.push(array.slice(start, end))
        start = end
        end = end + n
    }

    return results
}

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
        let images1, images2
        if(images){
            [ images1, images2 ] = splitArrayByN(images, 5)
        }
        
        


        console.table(images)
        return (
            <div>
                <Header 
                    searchImages={this.onSearchImage}
                />
                <section className={"section"}>
                    <div className={"items1"}>
                    { images &&
                    images1.map( image => {
                        return (
                            <div key={image.id} className={"item"}>
                                <div>
                                    <img src={image.urls.small} alt=""/>
                                    <div className={"item-info"}>
                                        <small>Author: <span>{image.user.name}</span></small>
                                        <div>
                                            <img src={logo} className={"heart"} alt=""/>
                                            <span>{image.user.total_likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}    
                    </div>
                    <div className={"items2"}>
                    { images &&
                    images2.map( image => {
                        return (
                            <div key={image.id} className={"item"}>
                                <div>
                                    <img src={image.urls.small} alt=""/>
                                    <div className={"item-info"}>
                                        <small>Author: <span>{image.user.name}</span></small>
                                        <div>
                                            <img src={logo} className={"heart"} alt=""/>
                                            <span>{image.user.total_likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}    
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;