<template>
  <div :class="classObj" class="app-wrapper">
    <navbar/>
    <div class="main-container">
      <sidebar class="sidebar-container"/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.log(this.$store)
    if (this.$route.query.token) {
      this.$store.commit('SET_TOKEN', this.$route.query.token)
    }
    if (this.$route.query.account) {
      this.$store.commit('SET_USER_ID', this.$route.query.account)
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/sass/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
