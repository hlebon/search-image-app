import React from 'react'
import PropTypes from 'prop-types'
import Heart from '../img/heart'

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
    render(){
        const { filterBy, onDownloadImage } = this.props
        const images = splitArrayInTwo(this.props.images)
        return(
            <section className="section">
                <div className="section-info-bar">
                    {
                        filterBy && 
                        <p>Palabra clave: <span>{filterBy}</span>, Resultados: <span>{`${this.props.images.length} imagenes`}</span></p>
                    }
                </div>
                    {
                        images.map( (image, index) => {
                        return (
                            <div key={index} className={`items`}>
                            { 
                                image.map( value => {
                                return ( 
                                    <div key={value.id} className={"item"}>
                                        <img src={value.urls.small} alt=""/>
                                        <div className={"item-info"}>
                                            <div>
                                                <div>
                                                    <img src={value.user.profile_image.small} alt="foto"/>  
                                                    <div>{value.user.name}</div>
                                                </div>
                                                <div>
                                                    <a href={value.urls.full} download onClick={(e) => onDownloadImage(value.id)}>Download</a>
                                                </div>
                                                <div>
                                                    <Heart/>
                                                    <div style={{color: value.color, marginLeft: "5px"}}>{value.likes}</div>
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
            </section>
        )
    }
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
    filterBy: PropTypes.string,
    onDownloadImage: PropTypes.func.isRequired
}

const styles = {
    img: {
        width: '400px',
        height: '250px'
    }
}

export default Gallery