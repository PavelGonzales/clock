import { createStore } from 'vuex'

export default createStore({
  state: {
    settings: {
      isDarkTheme: false,
      withMilliseconds: false,
    }
  },
  mutations: {
    setIsDarkTheme(state, value) {
      state.settings.isDarkTheme = value;
    },
    setWithMilliseconds(state, value) {
      state.settings.withMilliseconds = value;
    }
  },
  actions: {
    setIsDarkTheme({ commit }, value) {
      console.log(value)
      commit('setIsDarkTheme', value);
      localStorage.setItem('isDarkTheme', `${value}`);
    },
    setWithMilliseconds({ commit }, value) {
      commit('setWithMilliseconds', value);
      localStorage.setItem('withMilliseconds', `${value}`);
    }
  },
})
