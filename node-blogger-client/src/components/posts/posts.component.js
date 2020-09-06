import React from "react";
import Post from "./post/post.component";
import PostsService from "../../services/posts.service";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    const posts = await new PostsService().getPosts();

    this.setState({
      posts: posts.data,
    });
  }

  render() {
    if (this.state.posts.length) {
      return (
        <>
          {this.state.posts.map((post) => (
            <Post key={post._id} post={post}></Post>
          ))}
        </>
      );
    }

    return <strong>No Posts!</strong>;
  }
}
