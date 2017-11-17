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

Selector.getFilteredEntities = createSelector(
  [Selector.getEntities, Selector.getPostFilters],(postsById, filters) => {
    const posts = values(postsById)
    const filteredPosts = posts.filter(post => {
      const title = post.title
      const filterTitle = get(filters, 'title', '')
      const result = title.toUpperCase().indexOf(filterTitle.toUpperCase()) >= 0
      return result
    })
    const order = filters ? filters.order : null
    return orderBy(filteredPosts, ['title'], [order])
  }
)

export default Selector
