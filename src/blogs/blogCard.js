import React, { Component } from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import ReadBlogModal from './readBlogModal'

class BlogCard extends Component{
    constructor(){
        super()
        this.state = {
            openBlog: false
        }
    }
    closeModal = (e) => {
        this.setState({
            openBlog: false
        })
    }

    handleLike = (newLikes) => {
        console.log("new like count", newLikes)
        this.props.handleLike(this.props.blog._id, newLikes)
    }

    render(){
        let canEdit = <></>
        if(this.props.canEdit){
            canEdit = 
                <Card.Content>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Card.Content>
            
        }
        
        return(
            <>
            <Card onClick={() => this.setState({ openBlog: true })}>
                <Card.Content>
                    <Card.Header>{this.props.blog.title}</Card.Header>
                    <Card.Meta>
                        {this.props.blog.tags}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.blog.author.name}
                    </Card.Description>

                </Card.Content>
                {canEdit}
                <Card.Content extra>
                    <a>
                        <Icon name="like" color={this.props.isLiked ? "blue":""}/>
                        {this.props.blog.likes}
                    </a>
                    {"    "}
                    <a>
                        <Icon name="comments"/>
                        {this.props.blog.comments.length}
                    </a>
                    
                </Card.Content>

            </Card>

            <ReadBlogModal 
            blog={this.props.blog} 
            open={this.state.openBlog} 
            currentUser={this.props.currentUser} 
            closeModal={this.closeModal} 
            isLiked={this.props.isLiked}
            handleLike={this.handleLike}/>
            </>
        )
    }
}

export default BlogCard