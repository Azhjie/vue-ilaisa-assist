<template>
  <div class="app-wrapper">
    <app-Nav></app-Nav>
    <app-main></app-main>
    <left-side></left-side>
    <right-side></right-side>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import AppNav from './components/AppNav'
import LeftSide from './components/LeftSide'
import RightSide from './components/RightSide'
export default {
  name: 'layout',
  components: {
    AppNav,
    AppMain,
    LeftSide,
    RightSide
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
