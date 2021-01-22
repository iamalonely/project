<template>
  <section class="app-main beautiful-scorll-bar">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 70 +34 */
  height: calc(100vh - 104px);
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
</style>

