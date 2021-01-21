<template>
  <div>
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'SubMain',
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

