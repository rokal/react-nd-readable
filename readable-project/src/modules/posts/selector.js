import {uuid}  from 'lodash-uuid'
import {getFormValues} from 'redux-form'
import config from './config'

const Selector = {}
Selector.getEntities = (state) => state[config.storeBranch].byId
Selector.getCurrentEntity = (state) => state[config.storeBranch].currentEntity
Selector.createPostDraft = () => ({timestamp: Date.now(), id: uuid()})
Selector.getEditedEntity = getFormValues(config.moduleName)

export default Selector
