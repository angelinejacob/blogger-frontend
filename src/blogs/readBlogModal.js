import React, { Component } from 'react'
import { Modal, Form, Button, Comment, Header } from 'semantic-ui-react';

class ReadBlogModal extends Component{
    render(){
        // console.log(this.props.blog.comments, this.props.blog.comments.length)
        // let comments = <h5>No Comments</h5>
        // if(this.props.blog.comments.lenth > 0){
        //     comments = this.props.blog.comments.map((comment) => {
        //         return <div>
        //             <h5>{comment.author}</h5>
        //             <p>{comment.content}</p>
        //         </div>
        //     })
        // }
        return(
            <>
            <Modal open={this.props.open}>
                <Modal.Header>{this.props.blog.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>{this.props.blog.tags} - {this.props.blog.author.name}</Modal.Description>
                </Modal.Content>
                <Modal.Content>
                    {this.props.blog.content}
                </Modal.Content>
                <Modal.Header>Comments</Modal.Header>
                <Modal.Content>
                    <Comment.Group>
                    {this.props.blog.comments.map((comment) => {
                        return <Comment>
                            <Comment.Author>{comment.author}</Comment.Author>
                            <Comment.Text>{comment.content}</Comment.Text>
                        </Comment>
                    })}
                    <Form>
                        <Form.Input 
                        type="text"
                        name="author"
                        value={this.props.currentUser.name}
                        disabled/>
                        <Form.TextArea name="content"/>
                        <Button>Add Comment</Button>
                    </Form>
                    </Comment.Group>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="google plus">Like</Button>
                    <Button color="black" onClick={this.props.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
            </>
        )
    }
}

export default ReadBlogModal