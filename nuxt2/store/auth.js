import Vue from 'vue'
const TOKEN_LOCAL_KEY = 'key_for_cookie'
//در مثال خودمان ما توکن و پروفایل را در یک استور ذخیره کردیم
// و دو استور جداگانه برای آن ایجاد نکردیم

const getDefaultState = () => {
    return {
        user: {
            data: {},
            token: null
        }
    }
  }  
export const state = getDefaultState

export const getters = {
  // isAuthenticated(state) {
  //   return (state.user.token ? true: false)
  // },

  getToken(state){
    return state.user.token;
  }
}

export const mutations = {

    RESET(state) { //logout
        //Object.assign(state, getDefaultState())
        state.user.data= {};
        state.user.token = null;
        this.$cookies.remove(TOKEN_LOCAL_KEY, { path: '/' })
    },

    SET_USER(state, userData){ //اطلاعاتی که از ای پی آی آمده را در ویوایکس و کوکی ذخیره می کنیم
        state.user.token = userData.token; 
        state.user.data = userData.user;
    },

    SET_TOKEN(state, payload) { //توکن را در ویوایکس ذخیره می کند
      state.user.token = payload; 
    },

    CLEAR_TOKEN(state) { //توکن را از ویوایکس پاک می کند
      state.user.token = null;
    },

  }

export const actions = {

    loadTokenToVuex({commit}) {

      const user = this.$cookies.get(TOKEN_LOCAL_KEY);

      if (user?.token) {
        console.log('SET_USER');
        commit('SET_USER', user)
      } 
      else {
        console.log('RESET');
        commit('RESET')
      }
    },

    register({commit}, user) {
        return this.$api.$post('/register', user)
        .then((data) => {
          commit('SET_USER', data);
          this.$cookies.set(TOKEN_LOCAL_KEY, data, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, //سی روز (برحسب ثانیه)
          })
          return data;
        })
      },
      
    //axios response contains data inside whis is the actual data actual response body
    login({commit}, user) {
        return this.$api.$post('/login', user)
          .then((data) => { //distructure the response and take of the data
            commit('SET_USER', data);
            this.$cookies.set(TOKEN_LOCAL_KEY, data, {
              path: '/',
              maxAge: 60 * 60 * 24 * 30, //سی روز (برحسب ثانیه)
            })
            return data;
          })
      },
      
    logout({commit}) {
      console.log('store logout');
        return this.$api.$post('/logout')
          .then(response => {
            commit('RESET')
            return response;
          })
      },
  }