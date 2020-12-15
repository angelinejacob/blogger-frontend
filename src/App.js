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
  
  createNewBlog = (blog) => {
    console.log("new blog to create >>> ", blog)

    axios({
      method: 'post',
      url: `http://localhost:3000/blogs/${this.state.userId}`,
      data: blog,
    })
    .then((response) => {
      console.log("response from new blog >> ", response.data)

      // update state
      this.setState({
        currentUser: response.data
      })
    })
    .catch((error) => {
      console.log("error while making new blog >> ", error)
    })
  }

  render(){
    let userDetails = <h1>No Details</h1>
    if(Object.keys(this.state.currentUser).length === 0){
      // do nothing
    }else {
      userDetails = <UserDetails user={this.state.currentUser} editDetails={this.editUser} createNewBlog={this.createNewBlog}/>
    }
    return(
      <>
      <Link to="/newUser"> Register </Link>
      <Link to="/userDetails">My Settings</Link>
      <Route exact path="/newUser">
        <NewUser/>
      </Route>
      <Route exact path="/userDetails">
        {userDetails}
      </Route>
      </>
    )
  }
}

export default App;
