import React, { Component } from 'react'
import './App.css';
import NewUser from './users/createUser'

class App extends Component{
  constructor(props){
    super()
    this.state = {
      img_url: ''
    }
  }
  submitPhoto = (e) => {
    e.preventDefault()
    console.log(e)
    let file = e.target[0].files[0]
    let reader = new FileReader()
    let url = reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      this.setState({
        img_url: [reader.result]
      })
    }.bind(this)

    console.log('URL: ' ,url)

  }
  
  render(){
    return(
      <>
      {/* <h1>Hello World!</h1>
      <form onSubmit={this.submitPhoto}>
        <input type="file"></input>
        <input type="submit" value="Submit"/>
      </form>
      <img src={this.state.img_url} alt="uploaded text"/> */}
      <NewUser/>
      </>
    )
  }
}

export default App;
