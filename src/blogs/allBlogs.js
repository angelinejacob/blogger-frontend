import React, { Component } from 'react'
import BlogContainer from './blogContainer'
import { Form, Label } from 'semantic-ui-react'

class AllBlogs extends Component{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         searchedBlogs: props.blogs,
    //         searchValue: ''
    //     }
    // }

    // handleEditChange = (e) => {
    //     this.setState({
    //         searchValue: e.currentTarget.value
    //     })
    //     this.searchBlogs()
    // }

    // searchBlogs = () => {
    //     if(this.state.searchValue === ''){
    //         this.setState({
    //             searchedBlogs: this.props.blogs
    //         })
    //     }
    //     else{
    //         let newBlogs = []
    //         for(let i = 0; i < this.props.blogs.length; i++){
    //             if(this.props.blogs[i].tags.includes(this.state.searchValue)){
    //                 newBlogs.push(this.props.blogs[i])
    //             }
    //         }
    //         console.log(newBlogs, "blogs that meet search criteria")
    //         this.setState({
    //             searchedBlogs: newBlogs
    //         })
    //     }
    // }

    render(){
        return(
            <>
            <h1>All Blogs</h1>
            {/* <Form>
                <Label>Search Blogs</Label>
                <Form.Input 
                type="text"
                value={this.state.searchValue}
                onChange={this.handleEditChange}/>
            </Form> */}
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