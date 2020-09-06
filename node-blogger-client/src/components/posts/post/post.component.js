import React from "react";
import _ from "lodash";
import POST_TYPE from "../../../types/post";
import Comment from "../comment/comment.component";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = _.assign({ ...POST_TYPE }, {});
  }

  async componentDidMount() {
    const { post } = this.props;

    this.setState(_.assign({ ...POST_TYPE }, post));
  }

  render() {
    return (
      <div>
        <p>
          Title: <strong>{this.state.title}</strong>
        </p>
        <p>Name: {this.state.author.firstName}</p>
        <strong>Comments</strong>
        <div className={"comments"}>
          {this.state.comments.map((comment) => (
            <Comment key={comment._id} comment={comment}></Comment>
          ))}
        </div>
        <hr />
      </div>
    );
  }
}
