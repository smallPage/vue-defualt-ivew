<template>
  <div class="sidebar">

    <!--<Menu accordion ref="sidebar" :active-name="sidebarSelected" width="auto" :open-names="[ sidebarSelected.substr(0, 1) ]">-->
      <!--<Submenu :name="menu.id + ''" v-for="(menu, index) in menus" :key="index">-->
        <!--<template slot="title">-->
          <!--<Icon :type="menu.icon"></Icon>-->
          <!--{{ menu.name }}-->
        <!--</template>-->
        <!--<MenuItem v-for="(subMenu, subIndex) in menu.subs" :key="subIndex" :name="menu.id + '-' + subMenu.id" @click.native="$router.push({ name: subMenu.to })">{{ subMenu.name }}</MenuItem>-->
      <!--</Submenu>-->
    <!--</Menu>-->

     <p style="height: 88px;font-size: 24px;color:#fff;background: #374c61;line-height: 88px;padding-left: 70px;border-bottom: 3px solid #495060;">定制化采集</p>
    <Menu :active-name="sidebarSelected" theme="dark" width="auto" :class="menuitemClasses">
      <MenuItem name="1-1" @click.native="$router.push({name: 'company'})">
        <!--<Icon type="ios-navigate"></Icon>-->
        <img class="side-img" src="../../../static/icon/icon_qiyeshuju.png" alt="">
        <span class="side_tit" >企业数据</span>
      </MenuItem>
      <MenuItem name="1-2" @click.native="$router.push({name: 'baidu'})">
        <!--<Icon type="search"></Icon>-->
        <img class="side-img" src="../../../static/icon/icon_baiduzhishu.png" alt="">
        <span class="side_tit">百度指数</span>
      </MenuItem>
      <MenuItem name="1-3" @click.native="$router.push({name: 'patent'})">
        <img class="side-img" src="../../../static/icon/icon_zhuanli.png" alt="">
        <!--<Icon type="settings"></Icon>-->
        <span class="side_tit">专利</span>
      </MenuItem>
      <MenuItem name="1-4" @click.native="$router.push({name: 'financialReport'})">
        <img class="side-img" src="../../../static/icon/icon_shangshigongsicaibao.png" alt="">
        <!--<Icon type="settings"></Icon>-->
        <span class="side_tit">上市公司财报</span>
      </MenuItem>
      <MenuItem name="1-5"  @click.native="$router.push({name: 'recuit'})">
        <img class="side-img" src="../../../static/icon/icon_zhaopinshuju.png" alt="">
        <!--<Icon type="settings"></Icon>-->
        <span class="side_tit">招聘数据</span>
      </MenuItem>
    </Menu>


  </div>
</template>

<script>

  export default {
    name: 'Sidebar',
    data () {
      return {
        sidebarSelected: '1-1',
        menus: [

        ]
      }
    },
    computed: {
      onRoutes(){
        return this.$route.path;
      }
    },
    watch:{
//      监听路由，只要路由有变化(路径，参数等变化)都有执行下面的函数，你可以
//      $route: {
//        handler: function (val, oldVal) {
//          let _urlParams = this.$route.meta;
//        console.log(_urlParams);
//           this.sidebarSelected = _urlParams.sidebarSelected;
//          console.log(this.sidebarSelected );
//          //都是componentA组件，声明周期还在，改变不了
//        },
//        deep: true
//      }
//      '$route.meta.sidebarSelected': function (n, o) {
//        this.sidebarSelected = n;
//        console.log(n);
//      }
    },
    mounted() {
      this.sidebarSelected = this.$route.meta.sidebarSelected || '1-1';


//      this.$nextTick(function () {
//        this.$refs.sidebar.updateOpened();
//      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .ivu-menu-item{
    height: 70px;
    font-size: 20px !important;
    line-height: 70px;
    padding:0 !important;
    padding-left:70px !important;
    border-right:3px solid transparent;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
    /*color: #2d8cf0;*/
    color: #fff;
    border-right: 3px solid #2c6fc1;
  }

</style>

<style lang="scss" scoped>
  .sidebar {
    /*width: 250px;*/
    width: 310px;
    position: fixed;
    top: 72px;
    left: 0;
    bottom: 0;
    z-index: 20;
    overflow-y: hidden;
    /*background: #fff;*/
    background: #495060;;
    /*padding-top: 8px;*/
    border-right: 1px solid #d7dde4;
  .ivu-menu-item-selected {
    background: #e6e6e6;
  }
  }
  .side-img{
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 5px;
  }
  .side_tit{
   padding-left: 10px;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>





