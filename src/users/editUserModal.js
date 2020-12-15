import React, { Component } from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class EditUserModal extends Component{
    render(){
        return(
            <>
            <Modal open={this.props.open}>
                <Modal.Header>Edit Your Settings</Modal.Header>
                <Modal.Content>
                    <Form>
                    <Label>Full Name</Label>
                    <Form.Input type="text" 
                                name="name"
                                onChange={this.props.handleEditChange}
                                value={this.props.userToEdit.name}/>

                    <br></br>
                    <Label>Username</Label>
                    <Form.Input type="text" 
                                name="username"
                                disabled
                                onChange={this.props.handleEditChange}
                                value={this.props.userToEdit.username}/>

                    <br></br>
                    <Label>Password</Label>
                    <Form.Input type="password" 
                                name="password"
                                disabled
                                onChange={this.props.handleEditChange}
                                value={this.props.userToEdit.password}/>

                    <br></br>
                    <Label>About you: </Label>
                    <Form.Input type="textarea" 
                                name="bio"
                                onChange={this.props.handleEditChange}
                                value={this.props.userToEdit.bio}/>
                    </Form>
                    <br></br>
                    <Label>Image URL</Label>
                    <Form.Input type="text"
                                name="img"
                                onChange={this.props.handleEditChange}
                                value={this.props.userToEdit.img}></Form.Input>

                    <div>
                        <h3>Current Profile Picture: </h3>
                        <img src={this.props.userToEdit.img} alt="uploaded" id="photo-preview"/>
                    </div>            
                    <br></br>
                    <Modal.Actions>
                        <Button color="green" type="submit" onClick={this.props.closeAndEdit}>
                        Edit Settings
                        </Button>
                        <Button color="black" onClick={this.props.cancel}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal.Content>
            </Modal>
            </>
        )
    }
}

export default EditUserModal