<template>
  <div id="app" style="background: #f7f8f8;">
    <loading-bar
      id="global_loading_bar"
      custom-class="custom-class"
      :on-error-done="errorDone"
      :on-progress-done="progressDone"
      :progress="loadingbar.progress"
      :direction="loadingbar.direction"
      :error="loadingbar.error" >
    </loading-bar>

    <back-to-top text="回到顶部"></back-to-top>

    <router-view name="header" v-if="$route.meta.top || true"></router-view>
    <router-view name="sidebar"></router-view>
    <transition name="content" mode="out-in">
      <router-view :class="{ 'content-wrap': $route.meta.top != false }" />
    </transition>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>

import LoadingBar from 'vue2-loading-bar'
import BackToTop from 'vue-backtotop'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
    data () {
      return {
        transitionName: 'expand',
        loadingbar: {
          progress: 0,
          error: false,
          direction: 'right'
        }
      }
    },
    components: {
      LoadingBar: LoadingBar, BackToTop
    },
    computed: {
      ...mapState({
        loading: state => state.global.loading
      })
    },
    watch: {
      'loading': function(val, old) {
        if (val == true) {
          this.loadingbar.progress = 10;
        } else {
          setTimeout(() => {
            this.loadingbar.progress = 100;
          }, 200);
        }
      }
    },
    mounted: function () {
      var me = this;
      me.loadingbar.progress = 10;
      for (var i = 0; i < 30; i++) {
        if(i > 20 && i < 29){
          setTimeout(function () {
            me.loadingbar.progress += 5;
          },50*i);
        }else{
          setTimeout(function () {
            me.loadingbar.progress ++;
          },10*i);
        }
      }
      setTimeout(function () {
        me.loadingbar.progress = 100;
      },1500);
    },
    methods: {
      progressTo: function (val) {
        this.loadingbar.progress = val;
      },
      setToError: function (bol) {
        this.loadingbar.error = bol;
      },
      changeDirection: function (direction) {
        if(this.loadingbar.progress >= 0){
          this.loadingbar.progress = 100;
        }
        this.loadingbar.direction = this.loadingbar.direction === 'right' ? 'left' : 'right';
      },
      errorDone(){
        this.loadingbar.error = false
      },
      progressDone() {
        this.loadingbar.progress = 0
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~vue2-loading-bar/src/css/app.css';
  @import '~vue2-loading-bar/src/css/loading-bar.css';
  @import './assets/sass/app.scss';

  a {
    outline: none !important;
  }
</style>

<style lang="scss" scoped>

  #app, body, html {
      height: 100%;
  }

  .content-wrap {
      position: relative;
      top: 72px;
      min-height: initial;
      // min-width: 767px;
      z-index: 22;
      /*margin-left: 250px;*/
      margin-left:310px;
      // background-color: #fff;
      padding: 20px 20px;
  }

  .slide-enter-active {
      transition: all .3s ease;
  }
  .slide-leave-active {
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-enter,.slide-leave-active {
      transform: translateX(10px);
      opacity: 0;
  }
</style>



