<template>
  <div id="app">
    <dbx-breadcrumbs></dbx-breadcrumbs>
    <dbx-files></dbx-files>
  </div>
</template>

<script>
import DbxBreadcrumbs from './BreadCrumbs';
import DbxFiles from './Files';

export default {
  name: 'app',
  components: {
    DbxBreadcrumbs,
    DbxFiles
  },
  created () {
    this.$store.dispatch('fetchFiles');
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
}
</style>
