import React, { Component } from 'react'
import BlogContainer from './blogContainer'

class AllBlogs extends Component{
    render(){
        return(
            <>
            <h1>All Blogs</h1>
            <BlogContainer 
                        handleLike={this.props.handleLike} 
                        currentUser={this.props.user} 
                        blogs={this.props.blogs} 
                        addComment={this.props.addComment}
                        deleteBlog={this.props.deleteBlog}
                        editBlogPost={this.props.editBlogPost}/>
            
            </>
        )
    }
}

export default AllBlogs