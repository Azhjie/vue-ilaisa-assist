<template>
  <div class="app-wrapper">
    <app-key></app-key>
    <app-main></app-main>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import AppKey from './components/AppKey'
export default {
  name: 'layout',
  components: {
    AppKey,
    AppMain,
  },
  data() {
    return {
      isActive: 0,
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import 'src/styles/variables.scss';
</style>
