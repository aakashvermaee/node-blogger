import axios from "axios";

export default class PostsService {
  async getPosts() {
    return await axios.get("/posts", {
      baseURL: "http://localhost:10000",
      headers: {
        "x-api-key": "1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X",
      },
    });
  }
}
