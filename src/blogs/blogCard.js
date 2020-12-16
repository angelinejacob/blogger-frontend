import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import axios from 'axios'

class BlogCard extends Component{
    render(){
        
        return(
            <>
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.blog.title}</Card.Header>
                    <Card.Meta>
                        {this.props.blog.tags}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.blog.author.name}
                    </Card.Description>

                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name="like"/>
                        {this.props.blog.likes}
                    </a>
                    {"    "}
                    <a>
                        <Icon name="comments"/>
                        {this.props.blog.comments.length}
                    </a>
                </Card.Content>

            </Card>
            </>
        )
    }
}

export default BlogCard