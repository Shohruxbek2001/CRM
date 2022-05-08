import RoomService from '../services/room.service';

export const room = {
  namespaced: true,
  actions: {
    create({ commit }, room) {
      return RoomService.createRoom(room).then(
        room => {
          return Promise.resolve(room);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    get({ commit }) {
      return RoomService.getAllRooms().then(
        room => {
          return Promise.resolve(room);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};