import {uuid}  from 'lodash-uuid'
import {values, orderBy, get} from 'lodash'
import {createSelector} from 'reselect'
import {getFormValues} from 'redux-form'
import config from './config'

const Selector = {}
Selector.getEntities = (state) => state[config.storeBranch].byId
Selector.getCurrentEntity = (state) => state[config.storeBranch].currentEntity
Selector.createPostDraft = () => ({timestamp: Date.now(), id: uuid()})
Selector.getEditedEntity = getFormValues(config.moduleName)
Selector.getPostFilters = getFormValues(config.filterForm)
Selector.getModalVisibility = (state) => state[config.storeBranch].showEditPostModal
Selector.getOperation = (state) => state[config.storeBranch].operation

Selector.getFilteredEntities = createSelector(
  [Selector.getEntities, Selector.getPostFilters],(postsById, filters) => {
    const posts = values(postsById)
    const filteredPosts = posts.filter(post => {
      const title = get(post, 'title', '')
      const filterTitle = get(filters, 'title', '')
      const result = title.toUpperCase().indexOf(filterTitle.toUpperCase()) >= 0
      return result
    })
    const voteCountOrder = filters ? filters.voteCountOrder : null
    const titleOrder = filters ? filters.titleOrder : null
    return orderBy(filteredPosts, ['voteScore', 'title'], [voteCountOrder, titleOrder])
  }
)

export default Selector
