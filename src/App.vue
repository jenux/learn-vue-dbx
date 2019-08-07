<template>
  <div id="app">

    <div class="dbx-breadcrumbs">
      <h1>Dropbox</h1>
      <span 
        v-for="menu in breadcrumbs" 
        :key="menu.id"
        @click="selectBreadcrumbItem(menu)">{{menu.name}}</span>
    </div>


    <div 
      v-for="f in files" :key="f.id"
      class="dbx-item">
      <span class="dbx-item__icon">
        <font-awesome-icon 
          v-if="f['.tag'] === 'folder'"
          :icon="['far', 'folder']" />

        <font-awesome-icon 
          v-if="f['.tag'] === 'file' && !f.thumbnail"
          :icon="['fas', 'file']"/>

        <img 
          v-if="f['.tag'] === 'file' && f.thumbnail"
          :src="'data:image/jpeg;base64, '+f.thumbnail">
      </span>

      <span class="dbx-item__name">
        {{ f.name }}
      </span>

      <span><button @click="selectFolder(f)" v-if="f['.tag']==='folder'">Select</button></span>
    </div>
    <div v-show="loading">Loading...</div>
    <div v-show="!loading && files.length<=0">Nothing to see here</div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
  name: 'app',
  components: {
    
  },
  computed: {
    ...mapState([
      'loading',
      'breadcrumbs'
    ]),
    ...mapGetters([
      'files'
    ])
  },
  methods: {
    ...mapActions([
      'selectFolder',
      'selectBreadcrumbItem'
    ])
  },
  created () {
    this.$store.dispatch('fetchFiles')
  }
}
</script>

<style lang="scss">
body {
  background: #eee
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 20px 30%;

  .dbx-breadcrumbs {
    display: flex;
    align-items: center;
    h1 {
      
    }
    span {
      cursor: pointer;
      &::before {
        content: '>';
        padding: 0 10px;
      }
    }
  }

  .dbx-item {
    background: #fff;
    border-radius: 3px;
    margin: 5px;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);
    display: flex;
    align-items: center
  }
  .dbx-item__icon {
    margin-right: 10px;
    img {
      border-radius: 5px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, .2)
    }
  }
}


</style>
