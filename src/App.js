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
      currentUser: {},
      allBlogs: [],
      blogs: [],
      favoriteBlogs: []
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3000/users/${this.state.userId}`)
    .then(response => {
      console.log(response.data)
      let user = response.data.foundUser
      let blogs = response.data.blogs
      let favoriteBlogs = response.data.favoriteBlogs
      this.setState({
        currentUser: user,
        blogs: blogs,
        favoriteBlogs: favoriteBlogs
      })
    })
    .catch((error) => {
      console.log("ERROR GETTING USER INFO - REACT >>> ", error)
    })
  }

  getUpdatedUserInfo = () => {
    axios.get(`http://localhost:3000/users/${this.state.userId}`)
    .then(response => {
      console.log(response.data)
      let user = response.data.foundUser
      let blogs = response.data.blogs
      let favoriteBlogs = response.data.favoriteBlogs
      this.setState({
        currentUser: user,
        blogs: blogs,
        favoriteBlogs: favoriteBlogs
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
            this.getUpdatedUserInfo()
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
      this.getUpdatedUserInfo()
    })
    .catch((error) => {
      console.log("error while making new blog >> ", error)
    })
  }

  handleLike = (blogId, newLikes) => {
    console.log(blogId, newLikes, "from APP")

    // setup body of request
    let formData = new FormData()
    formData.append('likes', newLikes)

    // make API call
    axios({
      method:'put',
      url: `http://localhost:3000/blogs/${this.state.userId}/${blogId}`,
      data: formData
    })
    .then((response) => {
      // update state
      this.getUpdatedUserInfo()
    })
    .catch((error) => {
      console.log(error, "error from changing like")
    })
  }

  addComment = (blogId, author, content) => {
    console.log(blogId, author, content, "From APP")

    // make request body
    let formData = new FormData()
    formData.append('author', author)
    formData.append('content', content)

    // make callout
    axios({
      method: 'post',
      url: `http://localhost:3000/blogs/comment/${blogId}`,
      data: formData
    })
    .then((response) => {
      // update state
      this.getUpdatedUserInfo()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  deleteBlog = (blogId) => {
    // console.log(blogId, "blog ID to delete from APP")

    axios({
      method: 'delete',
      url: `http://localhost:3000/blogs/${this.state.userId}/${blogId}`
    })
    .then((response) => {
      // update state
      this.getUpdatedUserInfo()
    })
    .catch((error) => {
      console.log(error, "error while deleting blog")
    })
  }

  render(){
    let userDetails = <h1>No Details</h1>
    if(Object.keys(this.state.currentUser).length === 0){
      // do nothing
    }else {
      userDetails = <UserDetails 
                      user={this.state.currentUser} 
                      blogs={this.state.blogs} 
                      editDetails={this.editUser} 
                      createNewBlog={this.createNewBlog} 
                      handleLike={this.handleLike}
                      addComment={this.addComment}
                      deleteBlog={this.deleteBlog}/>
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
