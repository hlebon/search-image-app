import React from 'react';
import Header from './header'
import * as ImageAPI from '../helps/api'
import '../styles/grid.css'

class Home extends React.Component{
    state = {
        images: []
    }

    buscarImg = () => {
        ImageAPI.fecthImages().then((images) => {
            this.setState({
                images
            })
        })
    }
    
    onSearchImage = (query) => {
        this.buscarImg()
        console.table(this.state.image)
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
                        { images.map((image) => {
                            return (
                                <div key={image.id} className={"item"}>{
                                    <img src={image.urls.small} alt=""/>
                                }</div>
                            )
                        }) }
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;