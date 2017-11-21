import RestService from './rest-service';
const baseUrl = '/comments';

class CommentsService extends RestService {
  constructor(apiClient){
    super(baseUrl, apiClient)
  }

  vote = (commentId, option) => {
    const url = `${baseUrl}/${commentId}`;
    return this.apiClient.post(url, {option});
  }

  getPostComments = (postId) => {
    const url = `/posts/${postId}/comments`
    return this.apiClient.get(url)
  }

  createComment = (comment) => {
    comment.timestamp = Date.now()+1000
    return this.apiClient.post(this.baseUrl, comment)
  }

  deleteComment = (commentId) => {
    const url = `/comments/${commentId}`
    return this.apiClient.delete(url)
  }
};

export default CommentsService;
