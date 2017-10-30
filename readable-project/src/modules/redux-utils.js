export const createAction = (actions, prefix) => {
  const ret = {}
  actions.forEach(action => {
    ret[action] = `${prefix}/${action}`
  })
  return ret
}
