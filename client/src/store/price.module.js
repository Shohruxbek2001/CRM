import PriceService from '../services/price.service';

export const price = {
  namespaced: true,
  actions: {
    create({ commit }, priceData) {
      return PriceService.createPrice(priceData).then(
        price => {
          return Promise.resolve(price);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    get({ commit }) {
      return PriceService.getAllPrices().then(
        price => {
          return Promise.resolve(price);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};