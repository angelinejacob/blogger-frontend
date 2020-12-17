import React, { Component } from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

class EditBlogModal extends Component{
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
                        value={this.props.blog.title}
                        onChange={this.props.handleEditChange}/>
                        
                        <Label>Content</Label>
                        <Form.TextArea
                        name="content"
                        type="text"
                        value={this.props.blog.content}
                        onChange={this.props.handleEditChange}/>
                        
                        <Label>Tags</Label>
                        <Form.Input
                        name="tags"
                        type="text"
                        value={this.props.blog.tags}
                        onChange={this.props.handleEditChange}/>

                        <Modal.Actions>
                            <Button color="green" type="submit" onClick={this.props.editPost}>
                            Edit Post
                            </Button>
                            <Button color="black" onClick={this.props.cancel}>
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

export default EditBlogModal