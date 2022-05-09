import TeacherService from '../services/teacher.service';

export const teacher = {
  namespaced: true,
  actions: {
    create({ commit }, teacherData) {
      return TeacherService.createTeacher(teacherData).then(
        teacher => {
          return Promise.resolve(teacher);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    get({ commit }) {
      return TeacherService.getAllTeachers().then(
        teacher => {
          return Promise.resolve(teacher);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};