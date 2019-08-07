<template>
  <div id="app">
    <div 
      v-for="f in files" :key="f.id"
      class="file-item"
      :class="f['.tag']">{{ f.name }}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'app',
  components: {
    
  },
  computed: {
    ...mapGetters([
      'files'
    ])
  },
  created () {
    this.$store.dispatch('fetchFiles', '')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 20px 30%;
}
</style>
