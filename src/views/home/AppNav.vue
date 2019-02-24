<template>
  <div class="app-nav">
    <van-nav-bar
      :fixed="fixed"
      title="薅羊毛"
      left-text="配置key"
      right-text="开薅"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: 'app-nav',
  components: { },
  data() {
    return {
      fixed:true
    }
  },
  mounted() {
  },
  methods: {
    onClickLeft(){
      this.$store.commit('TOGGLE_LEFTSIDE',true)
    },
    onClickRight(){
      this.$store.commit('TOGGLE_RIGHTSIDE',true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-nav{
  height: 46px;
}
</style>