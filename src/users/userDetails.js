import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import EditUserModal from './editUserModal'

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
            }
        }
    }
    // Will have to map individual blogs to a Blog Container and then display it below
    // const myBlogs = map()
    
    handleEditChange = (e) => {
        console.log("inside handle edit change")
        this.setState({
          userToEdit: {
            ...this.state.userToEdit,
            [e.currentTarget.name]: e.currentTarget.value,
          },
        });
      };

      closeAndEdit = (e) => {
          console.log("inside close and edit!")
          this.setState({
              openEditModal: false
          })
          this.props.editDetails(this.state.userToEdit)
      }
    render(){
        return(
            <>
            <h1>{this.props.user.name}</h1>
            <img id="user-photo-preview" src={this.props.user.img}/>
            <h4>{this.props.user.bio}</h4>

            <Button onClick={() => this.setState({ openEditModal: true, userToEdit: {...this.props.user} })}>Edit My Account</Button>
            <EditUserModal open={this.state.openEditModal} handleEditChange={this.handleEditChange} userToEdit={this.state.userToEdit} closeAndEdit={this.closeAndEdit}/>
            <Button>Delete My Account</Button>

            <h3>My Blogs</h3>
            {/* myBlogs from above will go here */}

            </>
        )
    }
}

export default UserDetails