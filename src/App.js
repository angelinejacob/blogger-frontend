import React, { Component } from 'react'
import './App.css';
import NewUser from './users/createUser'
import UserDetails from './users/userDetails'
import axios from 'axios';
import { Route, Link } from 'react-router-dom'

class App extends Component{
  constructor(props){
    super()
    this.state = {
      userId: '5fd8399b62640017b44144f4',
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

        axios({
          method: 'put',
          url: `http://localhost:3000/users/${this.state.userId}`,
          data: editedUser,
        })
        .then((response) => {
            console.log("successfully sent", response.data)
            this.setState({
              currentUser: response.data
            })
        })
        .catch((error) => {
            console.log("ERROR OCCURED: ", error)
        })
  }
  
  render(){
    return(
      <>
      <Link to="/newUser"> Register </Link>
      <Link to="/userDetails">My Settings</Link>
      <Route exact path="/newUser">
        <NewUser/>
      </Route>
      <Route exact path="/userDetails">
        <UserDetails user={this.state.currentUser} editDetails={this.editUser}/>
      </Route>
      </>
    )
  }
}

export default App;
