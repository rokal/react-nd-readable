import config from './config'
import {createSelector} from 'reselect'
const selector = {}
selector.getCategories = (state) => state[config.storeBranch].all

selector.getCategoriesOptions = createSelector(
  [selector.getCategories],
  (categories) => {
    return categories.map(category => {
      return {
        text: category.name,
        value: category.path
      }
    })
  }
)
export default selector