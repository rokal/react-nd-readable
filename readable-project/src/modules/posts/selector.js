import {uuid}  from 'lodash-uuid'
import {values, orderBy} from 'lodash'
import {createSelector} from 'reselect'
import {getFormValues} from 'redux-form'
import config from './config'

const Selector = {}
Selector.getEntities = (state) => state[config.storeBranch].byId
Selector.getCurrentEntity = (state) => state[config.storeBranch].currentEntity
Selector.createPostDraft = () => ({timestamp: Date.now(), id: uuid()})
Selector.getEditedEntity = getFormValues(config.moduleName)
Selector.getPostFilters = getFormValues(config.filterForm)

const cmpString = new Intl.Collator(undefined, {sensitivity: 'base'})

Selector.getFilteredEntities = createSelector(
  [Selector.getEntities, Selector.getPostFilters],(postsById, filters) => {
    const posts = values(postsById)
    const filteredPosts = posts.filter(post => {
      const title = post.title
      const result = title.toUpperCase().indexOf(filters.title.toUpperCase()) >= 0
      return result
    })
    return orderBy(filteredPosts, ['title'], [filters.order])
  }
)

export default Selector
