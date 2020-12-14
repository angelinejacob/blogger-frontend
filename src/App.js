import React, { Component } from 'react'
import './App.css';
import NewUser from './users/createUser'
import axios from 'axios';

class App extends Component{
  constructor(props){
    super()
    this.state = {
      userId: '5fd77c94214eb7fbc7a3782f',
      currentUser: {}
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3000/users/${this.state.userId}`)
    .then(response => {
      console.log(response.data)
      this.setState({
        currentUser: response.data
      })
    })
    .catch((error) => {
      console.log("ERROR GETTING USER INFO - REACT >>> ", error)
    })
  }
  
  
  render(){
    return(
      <>
      <NewUser/>
      </>
    )
  }
}

export default App;
