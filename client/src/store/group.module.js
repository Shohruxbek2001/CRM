import GroupService from '../services/group.service'

export const group = {
  namespaced: true,
  actions: {
    create({ commit }, groupData) {
      return GroupService.createGroup(groupData).then(
        (group) => {
          return Promise.resolve(group)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    get({ commit }) {
      return GroupService.getAllGroups().then(
        (group) => {
          return Promise.resolve(group)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
}
