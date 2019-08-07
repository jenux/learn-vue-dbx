import Vue from 'vue';
import Vuex from 'vuex';
import { Dropbox } from 'dropbox';

Vue.use(Vuex);

let dbx = new Dropbox({
  accessToken: 'Jdp-RuU5YMsAAAAAAAA23Fx4o_dnSjWRoiJAxFaJik16EIhJvQfr9RJSWO9W66KI'
}); 

const store = new Vuex.Store({
  state: {
    entries: []
  },
  getters: {
    files: (state) => {
      return state.entries.sort((a, b) => {
        if ((a['.tag'] === 'folder' || b['.tag'] === 'folder')
          && !(a['.tag'] === b['.tag'])) {
          return a['.tag'] === 'folder' ? -1 : 1
        } else {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        }
      })
    }
  },
  mutations: {
    setFiles: (state, files) => {
      state.entries = files
    }
  },
  actions: {
    fetchFiles: (ctx, path) => {
      dbx.filesListFolder({path: ''})
        .then(res => {
          console.info('***', res.entries)
          ctx.commit('setFiles', res.entries)
        })
    }
  }
});

export default store;
