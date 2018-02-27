import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component{
    state = {
        query: ""
    }

    handleOnChange = (event) => {
        const query = event.target.value
        this.setState({
            query
        })
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault()
        event.target.reset()
        this.props.searchImages(this.state.query)
    }

    render(){
        return (
            <header className="App-header">
                <form onSubmit={this.handleOnSubmit}>
                    <h1 className="App-title">Welcome to Search Image App</h1>
                    <h3>Beautiful Photos by <span className="unsplash">Unsplash</span></h3>
                    <input type="text" val={this.state.query} onChange={this.handleOnChange} required/>
                    <input type="submit" value="Buscar"/>
                </form>
            </header>
        )
    }
}

Header.propTypes = {
    searchImages: PropTypes.func.isRequired
}

export default Header