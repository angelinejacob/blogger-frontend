import React, { Component } from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class CreateBlogModal extends Component{

    handleEditChange = (e) => {
        this.setprops.newBlog({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    render(){
        return(
            <>
            <Modal open={this.props.open}>
                <Header>New Post</Header>
                <Modal.Content>
                    <Form>
                        <Label>Title</Label>
                        <Form.Input 
                        name="title"
                        type="text"
                        value={this.props.newBlog.title}
                        onChange={this.props.handleEditChange}/>
                        
                        <Label>Content</Label>
                        <Form.Input
                        name="content"
                        type="text"
                        value={this.props.newBlog.content}
                        onChange={this.props.handleEditChange}/>
                        
                        <Label>Tags</Label>
                        <Form.Input
                        name="tags"
                        type="text"
                        value={this.props.newBlog.tags}
                        onChange={this.props.handleEditChange}/>

                        <Modal.Actions>
                            <Button color="green" type="submit" onClick={this.props.createPost}>
                            Create Post
                            </Button>
                            <Button color="black" onClick={this.props.cancelPost}>
                                Cancel
                            </Button>
                        </Modal.Actions>
                        
                    </Form>

                </Modal.Content>
            </Modal>
            </>
        )
    }
}

export default CreateBlogModal