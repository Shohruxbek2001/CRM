import StudentService from '../services/student.service';

export const student = {
  namespaced: true,
  actions: {
    create({ commit }, studentData) {
      return StudentService.createStudent(studentData).then(
        student => {
          return Promise.resolve(student);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};