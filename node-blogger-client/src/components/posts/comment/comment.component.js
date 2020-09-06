import React from "react";
import _ from "lodash";
import COMMENT_TYPE from "../../../types/comment";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.assign(COMMENT_TYPE, {});
  }

  async componentDidMount() {
    const { comment } = this.props;

    this.setState(_.assign({ ...COMMENT_TYPE }, comment));
  }

  render() {
    return (
      <div>
        <p>Text: {this.state.text} </p>
        <p>User: {this.state.user.firstName}</p>
        <p>likes: {this.state.likes}</p>
      </div>
    );
  }
}
