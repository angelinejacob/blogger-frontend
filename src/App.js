import React, { Component } from 'react'
import './App.css';
import NewUser from './users/createUser'
import UserDetails from './users/userDetails'
import axios from 'axios';
import { Route, Link } from 'react-router-dom'
import FavoriteBlogs from './blogs/favoriteBlogs'
import AllBlogs from './blogs/allBlogs'

class App extends Component{
  constructor(props){
    super()
    this.state = {
      userId: '5fdbae9411debd001773561b',
      currentUser: {},
      allBlogs: [],
      blogs: [],
      favoriteBlogs: []
    }
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_EXPRESS_API_URL + `/users/${this.state.userId}`)
    .then(response => {
      console.log(response.data)
      let user = response.data.foundUser
      let blogs = response.data.blogs
      let favoriteBlogs = response.data.favoriteBlogs
      let allBlogs = response.data.allBlogs
      this.setState({
        currentUser: user,
        blogs: blogs,
        favoriteBlogs: favoriteBlogs,
        allBlogs: allBlogs
      })
    })
    .catch((error) => {
      console.log("ERROR GETTING USER INFO - REACT >>> ", error)
    })
  }

  getUpdatedUserInfo = () => {
    axios.get(process.env.REACT_APP_EXPRESS_API_URL + `/users/${this.state.userId}`)
    .then(response => {
      console.log(response.data)
      let user = response.data.foundUser
      let blogs = response.data.blogs
      let favoriteBlogs = response.data.favoriteBlogs
      let allBlogs = response.data.allBlogs
      this.setState({
        currentUser: user,
        blogs: blogs,
        favoriteBlogs: favoriteBlogs,
        allBlogs: allBlogs
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
          url: process.env.REACT_APP_EXPRESS_API_URL + `/users/${this.state.userId}`,
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
      url: process.env.REACT_APP_EXPRESS_API_URL + `/blogs/${this.state.userId}`,
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
      url: process.env.REACT_APP_EXPRESS_API_URL + `/blogs/${this.state.userId}/${blogId}`,
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
      url: process.env.REACT_APP_EXPRESS_API_URL + `/blogs/comment/${blogId}`,
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
      url: process.env.REACT_APP_EXPRESS_API_URL + `/blogs/${this.state.userId}/${blogId}`
    })
    .then((response) => {
      // update state
      this.getUpdatedUserInfo()
    })
    .catch((error) => {
      console.log(error, "error while deleting blog")
    })
  }

  editBlogPost = (blog) => {
    console.log(blog, "edit this blog from APP")
    
    // make API callout
    axios({
      method: 'put',
      url: process.env.REACT_APP_EXPRESS_API_URL + `/blogs/${this.state.userId}/${blog._id}`,
      data: blog
    })
    .then((response) => {
      // update state
      this.getUpdatedUserInfo()
    })
    .catch((error) => {
      console.log("error while updating blog post with content", error)
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
                      deleteBlog={this.deleteBlog}
                      editBlogPost={this.editBlogPost}/>
    }

    let favorites = <h1>No Favorites To Display</h1>
    if(this.state.favoriteBlogs.length > 0){
      favorites = <FavoriteBlogs
                  user={this.state.currentUser} 
                  blogs={this.state.favoriteBlogs} 
                  handleLike={this.handleLike}
                  addComment={this.addComment}
                  deleteBlog={this.deleteBlog}
                  editBlogPost={this.editBlogPost}/>
    }
    let all_blogs = <h1>No Blogs to Display</h1>
    if(this.state.allBlogs.length > 0){
      all_blogs = <AllBlogs
                  user={this.state.currentUser} 
                  blogs={this.state.allBlogs} 
                  handleLike={this.handleLike}
                  addComment={this.addComment}
                  deleteBlog={this.deleteBlog}
                  editBlogPost={this.editBlogPost}/>
    }
    return(
      <>
      <Link to="/newUser"> Register </Link> {"  |  "} 
      <Link to="/userDetails">My Settings</Link> {"  |  "} 
      <Link to="/favorites">My Favorites</Link> {"  |  "} 
      <Link to="/allblogs">All Blogs</Link>
      <Route exact path="/newUser">
        <NewUser/>
      </Route>
      <Route exact path="/userDetails">
        {userDetails}
      </Route>
      <Route exact path="/favorites">
        {favorites}
      </Route>
      <Route exact path="/allblogs">
        {all_blogs}
      </Route>
      </>
    )
  }
}

export default App;
