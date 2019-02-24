<template>
  <van-tabbar v-model="barActive">
    <van-tabbar-item icon="user-o" @click="$router.replace('/')">单人</van-tabbar-item>
    <van-tabbar-item icon="friends-o" @click="$router.replace('/multiplayer')">多人</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'bottom-bar',
  components: { },
  props:{
    active: 0
  },
  data() {
    return {
      barActive: this.active
    }
  },
  computed:{
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>