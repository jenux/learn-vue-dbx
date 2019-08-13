<template>
  <div class="dbx-breadcrumbs">
    <h1>Dropbox</h1>
    <span 
      v-for="menu in breadcrumbs" 
      :key="menu.id"
      @click="selectBreadcrumbItem(menu)">{{menu.name}}</span>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'breadcrumb',
  computed: {
    ...mapState([
      'loading',
      'breadcrumbs'
    ])
  },
  methods: {
    ...mapActions([
      'selectBreadcrumbItem'
    ])
  }
}
</script>

<style lang="scss">
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
</style>


