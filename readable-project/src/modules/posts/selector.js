import config from './config'
const Selector = {}
Selector.getEntities = (state) => state[config.storeBranch].byId

export default Selector
