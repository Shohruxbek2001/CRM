import AdminService from '../services/admin.service'

export const admin = {
  namespaced: true,
  actions: {
    create({ commit }, adminData) {
      return AdminService.createAdmin(adminData).then(
        (admin) => {
          return Promise.resolve(admin)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    get({ commit }) {
      return AdminService.getAllAdmins().then(
        (admin) => {
          return Promise.resolve(admin)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      return AdminService.deleteAdmin(id).then(
        (admin) => {
          return Promise.resolve(admin)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
}
