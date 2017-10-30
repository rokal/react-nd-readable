import RestService from './rest-service';
const baseUrl = '/comments';

class CommentsService extends RestService {
  constructor(apiClient){
    super(baseUrl, apiClient)
  }

  vote = (commentId, option) => {
    const url = `/${baseUrl}/${commentId}`;
    return this.apiClient.post(url, {option});
  }
};

export default CommentsService;
