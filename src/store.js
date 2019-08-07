import Vue from 'vue';
import Vuex from 'vuex';
import { Dropbox } from 'dropbox';

Vue.use(Vuex);

let dbx = new Dropbox({
  accessToken: 'Jdp-RuU5YMsAAAAAAAA23Fx4o_dnSjWRoiJAxFaJik16EIhJvQfr9RJSWO9W66KI'
}); 

const store = new Vuex.Store({
  state: {
    loading: false,
    breadcrumbs: [],
    entries: []
  },
  getters: {
    path: (state) => {
      if (!state.breadcrumbs.length) {
        return ''
      } else {
        return state.breadcrumbs[state.breadcrumbs.length-1].path_display
      }
    },
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
      state.entries = files;
    },
    setBreadcrumbs: (state, data) => {
      state.breadcrumbs = data;
    }
  },
  actions: {
    fetchFiles: ({state, commit, dispatch}, path='') => {
      state.loading = true;
      commit('setFiles', []);

      dbx.filesListFolder({path: path})
        .then(res => {
          console.info('* ', res)
          commit('setFiles', res.entries)
          dispatch('getThumbnails', res.entries);
        })
        .finally(() => {
          state.loading = false;
        })
    },
    getThumbnails: (ctx, files) => {
      const paths = files.filter(files => files['.tag'] === 'file')
        .map(file => ({
          path: file.path_lower,
          size: 'w32h32'
        }))

      dbx.filesGetThumbnailBatch({
        entries: paths
      }).then(res => {
        res.entries.forEach(file => {
          if (file.thumbnail) {
            let found = files.find(x => {
              return x.path_lower === (file.metadata && file.metadata.path_lower)
            })
            if (found) {
              found.thumbnail = file.thumbnail
            }
          }
        })
      })
    },
    selectFolder: ({state, commit, getters, dispatch}, folder) => {
      commit('setBreadcrumbs', [...state.breadcrumbs, folder]);
      dispatch('fetchFiles', getters.path)
    },
    selectBreadcrumbItem: ({state, commit, getters, dispatch}, folder) => {

      if (!state.breadcrumbs.length) {
        commit('setBreadcrumbs', [folder])
      } else {
        let index = state.breadcrumbs.findIndex(x => x === folder);
        commit('setBreadcrumbs', state.breadcrumbs.slice(0, index-1));
      }
      dispatch('fetchFiles', getters.path)
    }
  }
});

export default store;
