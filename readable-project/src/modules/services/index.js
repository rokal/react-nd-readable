import ApiClient from './api-client'
import PostsService from './posts-service'
import CategoriesService from './categories-service'
import CommentsService from './comments-service'

export const getService = (serviceName) => {
  const apiClient = new ApiClient()
  switch (serviceName) {
    case 'posts':
      return new PostsService(apiClient);
    case 'comments':
      return new CommentsService(apiClient);
    case 'categories':
      return new CategoriesService(apiClient);
    default:
      throw new Error(`the service name : ${serviceName} does not exist`);
  }
}