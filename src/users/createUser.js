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
        let formData = new FormData()

        // add form fields to form data object
        for(let i = 0; i < 5; i++){
            if(e.target[i].name === "img"){
                formData.append(e.target[i].name, e.target[i].files[0])
            }
            else{
                formData.append(e.target[i].name, e.target[i].value)
            }
        }

        // test that form data is being populated
        for(var pair of formData.entries()){
            console.log(pair[0]+ ", " + pair[1])
        }

        axios({
            method: 'post',
            url: 'http://localhost:3000/users/',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log("successfully sent", response)
        })
        .catch((error) => {
            console.log("ERROR OCCURED: ", error)
        })

        // make axios api call to express backend
        // axios.post('http://localhost:3000/users/', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then((response) => {
        //     console.log("successfully sent", response)
        // })
        // .catch((error) => {
        //     console.log("ERROR OCCURED: ", error)
        // })

        // axios.get('http://localhost:3000/users/')
        // .then((response) => {
        //     console.log(response)
        // })
        // .catch((error) => {
        //     console.log("Error occured: ", error)
        // })
        
        // console.log('Create User event', e.target[0])
        // console.log('Create User event', e)
        // console.log('Create User event', e.target.length)
        // console.log('Create User event', typeof(e.target))
        
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
            <Header>Register for Blogger!</Header>
            <Form onSubmit={this.createUser}>
                <Label>Full Name</Label>
                <Form.Input type="text" 
                            name="name"
                            onChange={this.handleEditChange}
                            value={this.state.name}/>

                <Label>Username</Label>
                <Form.Input type="text" 
                            name="username"
                            onChange={this.handleEditChange}
                            value={this.state.username}/>

                <Label>Password</Label>
                <Form.Input type="password" 
                            name="password"
                            onChange={this.handleEditChange}
                            value={this.state.password}/>

                <Label>Bio</Label>
                <Form.Input type="textarea" 
                            name="bio"
                            onChange={this.handleEditChange}
                            value={this.state.bio}/>

                <Label>Upload Image</Label>
                <Form.Input type="file" name="img" onChange={this.addPhotoPreview}/>
                <div>
                    <img src={this.state.img} alt="uploaded" id="photo-preview"/>
                </div>

                <Form.Input type="submit" value="Create User"/>
            </Form>
            </>
        )
    }
}

export default NewUser;