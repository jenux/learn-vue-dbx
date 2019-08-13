<template>
  <div class="dbx-files">
    <div 
      v-for="f in files" :key="f.id"
      class="dbx-file">
      <span class="dbx-file__icon">
          <!-- folder -->
          <font-awesome-icon 
          v-if="f['.tag'] === 'folder'"
          :icon="['far', 'folder']" />
          <!-- <img 
          v-if="f['.tag'] === 'folder'"
          :src="'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWZvbGRlciI+PHBhdGggZD0iTTIyIDE5YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg1bDIgM2g5YTIgMiAwIDAgMSAyIDJ6Ij48L3BhdGg+PC9zdmc+'" />
          -->

          <!-- file without thumbnail -->
          <font-awesome-icon 
          v-if="f['.tag'] === 'file' && !f.thumbnail"
          :icon="['fas', 'file']"/>
          <!--
          <img 
          v-if="f['.tag'] === 'file' && !f.thumbnail"
          :src="'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWZpbGUiPjxwYXRoIGQ9Ik0xMyAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOXoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIxMyAyIDEzIDkgMjAgOSI+PC9wb2x5bGluZT48L3N2Zz4='" />
          -->

          <!-- file with thumbnail -->
          <img 
          v-if="f['.tag'] === 'file' && f.thumbnail"
          :src="'data:image/jpeg;base64, '+f.thumbnail" />
      </span>

      <span class="dbx-item__name">
          {{ f.name }}
      </span>

      <span><button @click="selectFolder(f)" v-if="f['.tag']==='folder'">Select</button></span>
    </div>
    <div 
        class="dbx-files--loading" 
        v-show="loading">Loading...</div>
    <div
        class="dbx-files--empty" 
        v-show="!loading && files.length<=0">Nothing to see here</div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
  name: 'Files',
  computed: {
    ...mapState([
      'loading'
    ]),
    ...mapGetters([
      'files'
    ])
  },
  methods: {
    ...mapActions([
      'selectFolder'
    ])
  }
}
</script>

<style lang="scss">
.dbx-files {
    .dbx-files--loading {
        
    }
    .dbx-files--empty {
        text-align: center
    }
}
.dbx-file {
    background: #fff;
    border-radius: 3px;
    margin: 5px;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);
    display: flex;
    align-items: center
  }
  .dbx-file__icon {
    margin-right: 10px;
    img {
      border-radius: 5px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, .2)
    }
  }
</style>

