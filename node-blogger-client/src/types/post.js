import _ from "lodash";
import COMMENT_TYPE from "./comment";
import USER_TYPE from "./user";

export default {
  author: _.assign(USER_TYPE, {}),
  title: "",
  comments: [_.assign(COMMENT_TYPE, {})],
};
