<template>
  <div class="app-wrapper">
    <app-main></app-main>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
export default {
  name: 'layout',
  components: {
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
