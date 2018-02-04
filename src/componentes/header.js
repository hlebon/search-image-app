import React from 'react';

class Header extends React.Component{
    state = {
        query: ""
    }

    handleOnChange = (event) => {
        const query = event.target.value
        console.log(query.length, (query) ? "full" : "empty")
        this.setState({
            query
        })
    }
    
    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.searchImages(this.state.query)
        this.setState({
            query: ""
        })
    }

    render(){
        return (
            <header className="App-header">
                <form onSubmit={this.handleOnSubmit}>
                    <h1 className="App-title">Welcome to Search Image App</h1>
                    <h4>Beautiful Photos by <span className={"unsplash"}>Unsplash</span></h4>
                    <input type="text" val={this.state.query} onChange={this.handleOnChange} required/>
                    <input type="submit" value="Buscar"/>
                </form>
            </header>
        )
    }
}

export default Header