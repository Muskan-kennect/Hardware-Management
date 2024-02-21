// // store/auth.js
// import { defineStore } from 'pinia';

// export const useAuthenticateStore = defineStore({
//   id: 'auth',
//   state: () => ({
//     user: null,
//   }),
//   actions: {
//     login(userInfo) {
//       this.user = userInfo;
    //   localStorage.setItem('user', JSON.stringify(userInfo));
//     },
//     logout() {
//       this.user = null;
//       localStorage.removeItem('user');
//     },
//     getUser() {
//       return this.user;
//     },
//   },
//   getters: {
//     isAuthenticated() {
//       return !!this.user;
//     },
//   },
// });

