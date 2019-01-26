<template>
  <div class="index-box">
  </div>
</template>


<script>
  import {mapState, mapMutations} from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: 'Index',
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        loading: state => state.global.loading
      })
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/sass/init.scss";
</style>
