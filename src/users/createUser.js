import React, { Component } from 'react'
import { Form, Button, Label, Header } from 'semantic-ui-react';
import '../App.css'
import axios from 'axios'

class NewUser extends Component{
    constructor(props){
        super()
        this.state = {
            username: '',
            password: '',
            name: '',
            bio: '',
            img: '',
        }
    }

    createUser = (e) => {
        e.preventDefault()
        /**
         * BELOW IMPLEMENTATION USED WHEN TRYING TO UPLOAD FILE
         */
        let formData = new FormData()

        // add form fields to form data object
        for(let i = 0; i < 5; i++){    
                formData.append(e.target[i].name, e.target[i].value)
        }

        // test that form data is being populated
        for(var pair of formData.entries()){
            console.log(pair[0]+ ", " + pair[1])
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_EXPRESS_API_URL + `/users/`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log("successfully sent", response)
        })
        .catch((error) => {
            console.log("ERROR OCCURED: ", error)
        })
        
    }

    // method to change input fields
    handleEditChange = (e) => {
        this.setState({
            [e.currentTarget.name]: [e.currentTarget.value]
        })

        console.log(this.state)
    }

    // previews the uploaded photo
    addPhotoPreview = (e) => {
        console.log(e)
        let file = e.target.files[0]
        let reader = new FileReader()
        let url = reader.readAsDataURL(file)

        reader.onloadend = function (e) {
            this.setState({
              img: [reader.result]
            })
          }.bind(this)

        console.log('URL: ' ,url)
    }

    render(){
        return(
            <>
            <h1 className="blogs-header">Register for Blogger!</h1>
            <Form onSubmit={this.createUser} id="register-user">
                <Label>Full Name</Label>
                <Form.Input type="text" 
                            name="name"
                            onChange={this.handleEditChange}
                            value={this.state.name}/>

                <br></br>
                <Label>Username</Label>
                <Form.Input type="text" 
                            name="username"
                            onChange={this.handleEditChange}
                            value={this.state.username}/>

                <br></br>
                <Label>Password</Label>
                <Form.Input type="password" 
                            name="password"
                            onChange={this.handleEditChange}
                            value={this.state.password}/>

                <br></br>
                <Label>Bio</Label>
                <Form.Input type="textarea" 
                            name="bio"
                            onChange={this.handleEditChange}
                            value={this.state.bio}/>

                {/* <Label>Upload Image</Label>
                <Form.Input type="file" name="img" onChange={this.addPhotoPreview}/>
                <div>
                    <img src="https://scontent-lga3-2.xx.fbcdn.net/v/t1.0-9/66833932_1332691630221289_681358881762312192_o.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=bIcD_SSkqHoAX-tjmg8&_nc_ht=scontent-lga3-2.xx&oh=4048d2e15767f28a5908a286fb6b6c2b&oe=5FFDADD6" alt="uploaded" id="photo-preview"/>
                </div> */}
                <br></br>
                <Label>Image URL</Label>
                <Form.Input type="text"
                            name="img"
                            onChange={this.handleEditChange}
                            value={this.state.img}></Form.Input>

                <div>
                    <img src={this.state.img} alt="uploaded" id="photo-preview"/>
                </div>            
                <br></br>
                <Form.Input type="submit" value="Create User"/>
            </Form>
            </>
        )
    }
}

export default NewUser;