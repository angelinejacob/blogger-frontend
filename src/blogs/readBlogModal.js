import React, { Component } from 'react'
import { Modal, Form, Button, Comment, Header } from 'semantic-ui-react';

class ReadBlogModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLiked: props.isLiked
        }
    }

    handleLike = () => {
        let newLikes = 0
        if(this.state.isLiked){
            this.setState({
                isLiked: false
            })
            newLikes = this.props.blog.likes -= 1
        }
        else{
            this.setState({
                isLiked: true
            })
            newLikes = this.props.blog.likes += 1
        }
        this.props.handleLike(newLikes)
    }

    render(){
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
                    <Button color={this.state.isLiked ? "blue":""} onClick={this.handleLike}>Like</Button>
                    <Button color="black" onClick={this.props.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
            </>
        )
    }
}

export default ReadBlogModal