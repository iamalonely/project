<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- <img src="@/assets/Rectangle 24@2x.png" alt="" style="width:100%"> -->
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#424f63"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <!-- <img :src="logo" alt=""  :style="{margin: '10px 0',width: !isCollapse ? '100%': '36px'}"> -->
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
