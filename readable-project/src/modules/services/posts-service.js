import RestService from './rest-service'
const baseUrl = `/posts`

class PostsService extends RestService {
  constructor(apiClient){
    super(baseUrl, apiClient)
  }

  getComments = (postId) => {
    const url = `${baseUrl}/${postId}/comments`;
    return this.apiClient.get(url);
  };

  vote = (postId, option) => {
    const url = `${baseUrl}/${postId}`;
    return this.apiClient.post(url, {option: option});
  };

  createPost = (post) => {
    return this.apiClient.post(baseUrl, post)
  }

  getCategoryPosts = (category) => {
    const url = `/${category}/posts`
    return this.apiClient.get(url)
  }
  deletePost = (postId) => {
    const url = `/posts/${postId}`
    return this.apiClient.delete(url)
  }
}

export default PostsService;
