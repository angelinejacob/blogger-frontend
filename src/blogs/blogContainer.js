import React, { Component } from 'react'
import BlogCard from './blogCard'
import axios from 'axios'

class BlogContainer extends Component{
    render(){
        console.log(this.props.currentUser.blogs, "blogs from container...")
        
        const blogs = this.props.blogs.map((blog, index) => {
            let canEdit = false
            let isLiked = false
            // if(this.props.currentUser.favoriteBlogs.includes(blog._id)){
                isLiked = true
            // }
            // if(this.props.currentUser._id === blog.author){
                canEdit = true
            // }

            console.log(isLiked, canEdit, blog._id)
            return <BlogCard currentUser={this.props.currentUser} canEdit={canEdit} isLiked={isLiked} blog={blog} key={blog._id}/>

        })
        return(
            <>
            {blogs}
            </>
        )
    }
}

export default BlogContainer