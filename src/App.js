import React, { Component } from 'react'
import './App.css';
import NewUser from './users/createUser'
import UserDetails from './users/userDetails'
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
  
  editUser = (editedUser) => {
    console.log("Inside edit User method on app!")
    console.log(editedUser)

    // Make API call to update the user
    axios.put(`http://localhost:3000/users/${this.state.userId}`, editedUser)
    .then((response) => {
      console.log("response after update >>> ", response)
      this.setState({
        currentUser: response.data,
        userId: response.data._id
      })
    })
    .catch((error) => {
      console.log("ERROR while updating user info: ", error)
    })
  }
  
  render(){
    return(
      <>
      <UserDetails user={this.state.currentUser} editDetails={this.editUser}/>
      {/* <NewUser/> */}
      </>
    )
  }
}

export default App;
