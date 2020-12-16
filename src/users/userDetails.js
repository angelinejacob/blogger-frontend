import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import EditUserModal from './editUserModal'
import BlogContainer from '../blogs/blogContainer'
import CreateBlogModal from '../blogs/createBlogModal'

class UserDetails extends Component{
    constructor(){
        super()
        this.state = {
            openEditModal: false,
            userToEdit: {
                bio: '',
                img: '',
                name: '',
                password: '',
                username: '',
                _id: ''
            },
            newBlog: {
                title: '',
                content: '',
                tags: ''
            }, 
            openNewBlogModal: false,
        }
    }
    
    handleEditChange = (e) => {
        console.log("inside handle edit change")
        this.setState({
          userToEdit: {
            ...this.state.userToEdit,
            [e.currentTarget.name]: e.currentTarget.value,
          },
        });
      };

    handleEditChangeBlog = (e) => {
        this.setState({
            newBlog: {
                ...this.state.newBlog,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }

      closeAndEdit = (e) => {
          console.log("inside close and edit!")
          this.setState({
              openEditModal: false
          })
          this.props.editDetails(this.state.userToEdit)
      }

      cancel = (e) => {
          this.setState({
              openEditModal: false
          })
      }

      cancelPost = (e) => {
        this.setState({
            openNewBlogModal: false
        })
      }

      createPost = (e) => {
        console.log(this.state.newBlog, "new blog")
        this.setState({
            openNewBlogModal: false
        })

        // create new blog
        this.props.createNewBlog(this.state.newBlog)
      }

    render(){
        // Will have to map individual blogs to a Blog Container and then display it below
        // const myBlogs = this.props.user.blogs.map((blog) => {
        //     return <BlogCard user={this.props.user} blog={blog}/>
        // })

        return(
            <>
            <div className="user-page">
                <div className="action-menu">
                    <Menu text>
                        <Menu.Item
                            name="editAccount"
                            onClick={() => this.setState({ openEditModal: true, userToEdit: {...this.props.user} })}/>
                        <Menu.Item
                            name="deleteAccount"/>
                        <Menu.Item
                            name="newPost"
                            onClick={() => this.setState({ openNewBlogModal: true })}/>
                    </Menu>
                </div>
                <div id="user-details">
                    <h1>{this.props.user.name}</h1>
                    <img id="user-photo-preview" src={this.props.user.img}/>
                    <div id="bio">
                        <h6>{this.props.user.bio}</h6>
                    </div>
                </div>
            </div>

            {/* <Button onClick={() => this.setState({ openEditModal: true, userToEdit: {...this.props.user} })}>Edit My Account</Button> */}
            <EditUserModal open={this.state.openEditModal} handleEditChange={this.handleEditChange} userToEdit={this.state.userToEdit} closeAndEdit={this.closeAndEdit} cancel={this.cancel}/>
            <CreateBlogModal open={this.state.openNewBlogModal} cancelPost={this.cancelPost} createPost={this.createPost} newBlog={this.state.newBlog} handleEditChange={this.handleEditChangeBlog}/>

            <h3>My Blogs</h3>
            <BlogContainer currentUser={this.props.user} blogs={this.props.user.blogs}/>

            </>
        )
    }
}

export default UserDetails