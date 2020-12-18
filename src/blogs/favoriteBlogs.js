import React, { Component } from 'react'
import BlogContainer from './blogContainer'

class FavoriteBlogs extends Component{
    render(){
        return(
            <>
            <h1>Favorite Blogs</h1>
            <div className="blog-container">
            <BlogContainer 
                        handleLike={this.props.handleLike} 
                        currentUser={this.props.user} 
                        blogs={this.props.blogs} 
                        addComment={this.props.addComment}
                        deleteBlog={this.props.deleteBlog}
                        editBlogPost={this.props.editBlogPost}/>
            </div>
            </>
        )
    }
}

export default FavoriteBlogs