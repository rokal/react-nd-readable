import RestService from './rest-service'
const baseUrl = '/categories'

class CategoriesService extends RestService {
  constructor(apiClient){
    super(baseUrl, apiClient)
  }

  getPosts = (categoryId) => {
    const url = `/${categoryId}/posts`
    return this.apiClient.get(url)
  }
}

export default CategoriesService
