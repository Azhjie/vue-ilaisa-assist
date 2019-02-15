<template>
  <div class="app-key">
    <van-nav-bar
      :fixed="fixed"
      title="薅羊毛"
      left-text="配置key"
      :right-text="fixed?'X':'丁'"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: 'app-key',
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
      
    },
    onClickRight(){
      this.fixed = !this.fixed,
      window.scrollTo(0, 46);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-key{
  height: 50px;
}
</style>