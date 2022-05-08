import BranchService from '../services/branch.service';

export const branch = {
  namespaced: true,
  actions: {
    create({ commit }, branch) {
      return BranchService.createBranch(branch).then(
        branch => {
          return Promise.resolve(branch);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    get({ commit }) {
      return BranchService.getAllBranches().then(
        branch => {
          return Promise.resolve(branch);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};