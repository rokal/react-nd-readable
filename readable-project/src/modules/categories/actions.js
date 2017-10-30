import config from './config';
import {getService} from '../services/index'
import {createAction} from '../redux-utils';

const prefix = config.moduleName.toUpperCase();

export const Actions = createAction([
  'FETCH_ALL',
  'SAVE_CATEGORIES'
], prefix);

const categoriesService = getService('categories')
const ActionCreators = {
  fetchAll: (callback) => (dispatch) => {
    categoriesService.get().then(response => {
      dispatch(ActionCreators.saveCategories(response.categories))
    })
  },

  saveCategories: (categories) => ({type: Actions.SAVE_CATEGORIES, categories})
};
export default ActionCreators
