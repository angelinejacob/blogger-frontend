import React, { Component } from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import ReadBlogModal from './readBlogModal'
import EditBlogModal from './editBlogModal'

class BlogCard extends Component{
    constructor(){
        super()
        this.state = {
            openBlog: false,
            openEditBlogModal: false,
            blogToEdit: {
                title: '',
                content: '',
                tags: ''
            }
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

    deleteBlog = (e) => {
        e.stopPropagation()
        this.props.deleteBlog(this.props.blog._id)
    }

    handleEditChange = (e) => {
        console.log("inside handle edit change")
        this.setState({
          blogToEdit: {
            ...this.state.blogToEdit,
            [e.currentTarget.name]: e.currentTarget.value,
          },
        });
      };


      cancelEditBlog = (e) => { 
        this.setState({
              openEditBlogModal: false
          })
      }

      openEditBlogModal = (e) => {
        e.stopPropagation()
        this.setState({ openEditBlogModal: true, blogToEdit: {...this.props.blog} })

      }

      editPost = (e) => {
          this.setState({
              openEditBlogModal: false
          })
          this.props.editBlogPost(this.state.blogToEdit)
      }

    render(){
        let canEdit = <></>
        if(this.props.canEdit){
            canEdit = 
                <Card.Content>
                    <Button onClick={this.openEditBlogModal}>Edit</Button>
                    <Button onClick={this.deleteBlog}>Delete</Button>
                </Card.Content>
            
        }
        
        return(
            <>
            <Card onClick={() => this.setState({ openBlog: true })} className="blog-card" fluid style={{ border: "15px solid #76323f" }}>
                <Card.Content>
                    <Card.Header className="card-header" style={{ color: "#c09f80" }}>{this.props.blog.title}</Card.Header>
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
            handleLike={this.handleLike}
            addComment={this.props.addComment}/>

            <EditBlogModal 
            open={this.state.openEditBlogModal} 
            blog={this.state.blogToEdit} 
            handleEditChange={this.handleEditChange} 
            cancel={this.cancelEditBlog} 
            editPost={this.editPost}/>
            
            </>
        )
    }
}

export default BlogCard