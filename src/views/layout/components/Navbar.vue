<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
      <p>processX</p>
    </div>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>
    
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" :title="name" class="user-avatar">
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ '安全退出' }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 70px;
  line-height: 70px;
  border-radius: 0px !important;
  .logo{
    float: left;
    width: 180px;
    height: 100%;
    background: rgba(45, 48, 55, 1);
    line-height: 1;
    text-align: center;
    img{
      width: 50px;
      vertical-align: middle;
    }
    p{
      font-size: 16px;
      color: #fff;
    }
  }
  .hamburger-container {
    line-height: 78px;
    height: 70px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-left-part{
      flex: 1;
      display: flex;
      span{
        flex:1;
        text-align: center;
        font-size: 16px;
        font-weight: 600
      }
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 30px;
          height: 30px;
          margin-right: 6px;
          border-radius: 10px;
          vertical-align: middle
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 30px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
