import _ from "lodash";
import USER_TYPE from "./user";

export default {
  likes: 0,
  _id: "",
  user: _.assign(USER_TYPE, {}),
  parent: "",
  text: "",
};
