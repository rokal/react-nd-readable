import {uuid}  from 'lodash-uuid'
import config from './config'

const Selector = {}
Selector.getEntities = (state) => state[config.storeBranch].byId
Selector.getCurrentEntity = (state) => state[config.storeBranch].currentEntity
Selector.createPostDraft = () => ({timestamp: Date.now(), id: uuid()})

export default Selector
