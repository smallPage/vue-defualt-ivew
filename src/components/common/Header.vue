<template>
  <div class="common-header" >
    <Menu mode="horizontal" theme="dark" active-name="menu-1" class="header">
        <div class="layout-logo" style="padding-left: 20px;">
          <!-- <img src="/static/images/logo.png" style="width: 45px"> -->
          <span style="color: white; font-size: 26px;">爬虫管理系统</span>
          <!-- <a style="color: #ff7800; font-size: 12px; margin-left: 20px" @click="logout">退出</a> -->
        </div>
        <!-- <div class="layout-nav">
          <MenuItem :name="menu.num" v-for="(menu, index) in menus" :key="index">
            <Icon :type="menu.icon"></Icon>
            {{ menu.name }}
          </MenuItem>
        </div> -->
      </Menu>
  </div>
</template>

<script>
  import { Menu, MenuItem, Icon } from 'iview';
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Common-Header',
    data() {
      return {
        menus: [
          {num: 'menu-1', icon: 'ios-navigate', name: '数据管理', path: ''},
          {num: 'menu-2', icon: 'ios-analytics', name: '数据统计', path: ''},
          {num: 'menu-3', icon: 'ios-keypad', name: '数据监测', path: ''},
          {num: 'menu-4', icon: 'ios-paper', name: '系统设置', path: ''}
        ]
      }
    },
    computed: {
      ...mapState({
        loginedUser: state => state.global.loginedUser
      })
    },
    watch: {
      '$route.meta.headerSelected': function (n, o) {
        this.currentTab = n;
      }
    },
    mounted() {
      this.currentTab = this.$route.meta.headerSelected || 0;
    },
    methods: {
      ...mapActions([ 'userLogout' ]),
      logout() {
        this.userLogout();
        location.reload();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/sass/init.scss";
  .header {
    width: 100%;
    height: 72px;
    line-height: 72px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 221;
    /*background-color: #2b83f9;*/
    /*background-image: linear-gradient(143deg, #2945cb 20%, #2b83f9 81%, #3a9dff);*/
    background:url("../../../static/icon/BG_top.png") no-repeat;
  }

  .layout-logo {
    // width: 100px;
    width: 350px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    // top: 13px;
    left: 20px;
  }

  .layout-nav {
    width: 470px;
    margin: 0 auto;
  }
</style>
