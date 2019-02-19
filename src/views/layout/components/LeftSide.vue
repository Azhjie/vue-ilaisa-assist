<template>
  <div class="left-side">
    <van-popup 
      v-model="show" 
      @close="handleClose" 
      @click-overlay="handleClose"
      get-container="#app"
      position="left">
      <van-tabs v-model="active">
        <van-tab title="配置key(PC)">
          <h2>
            <span>官网</span> 
            <a href="https://m.ilaisa.com" target="_blank">https://m.ilaisa.com</a>
          </h2>
          <p class="tips">
            <span>前往官网，登录后，打开控制台(f12)，f5刷新页面，选择Network>XHR,点击任意请求，此时把Headers滚到底部，在Form Data找到有用的信息。</span>
            <span 
              @click="ImagePreview(['./img/key.gif'])" 
              class="href">
              GIF
            </span>
          </p>
          <h2>愉快的填写吧</h2>
          <van-cell-group>
            <van-field label="ticket" v-model="form.ticket" placeholder="不填用不了，请输入吧" />
          </van-cell-group>

          <h2>定位<a href="https://lbs.amap.com/console/show/picker" target="_blank">https://lbs.amap.com</a></h2>
          <p class="tips">
            <span>前往高德开放平台，选择地址，把坐标获取结果填写到下面,提供虚拟定位获取该地区可见的红包。</span> 
            <span 
              @click="ImagePreview(['./img/xy.gif'])" 
              class="href">
              GIF
            </span>
          </p>
          <van-cell-group>
            <van-field label="坐标(经纬)" v-model="xy" placeholder="推荐定位八卦岭" @blur="calcXY"/>
            <van-field label="lng" disabled v-model="form.lng" placeholder="填，不填就是非洲" />
            <van-field label="lat" disabled v-model="form.lat" placeholder="填，不填就是非洲" />
          </van-cell-group>
          <h2>客户端信息</h2>
          <p class="tips">
            <span>仔细研究过了，确认自己没搞错，搞不懂官网为啥写死app_key，</span>
            <span 
              @click="ImagePreview(['./img/app_key.png'])" 
              class="href">
              截图
            </span>
          </p>
          <van-cell-group>
            <van-field label="app_key" v-model="form.app_key" placeholder="官网不改，没必要填" />
          </van-cell-group>
          <van-button style="margin-top:20px" type="primary" size="large" @click="saveKey">保存</van-button>
        </van-tab>
        <van-tab title="登录方式(手机)" disabled>登录方式(手机)</van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import localStore from 'store'
export default {
  name: 'left-side',
  components: { },
  data() {
    return {
      show: this.$store.getters.leftSide,
      active:0,
      ImagePreview,
      xy:'',
      form:{
        ticket:'',
        app_key:'',
        lng:'',
        lat:'',
      }
    }
  },
  watch: {
    '$store.getters.leftSide'(value){
      this.show = value
    }
  },
  mounted(){
    this.form = localStore.get('keyInfo') || {}
    console.log(this.form)
  },
  methods: {
    handleClose(){
      this.$store.commit('TOGGLE_LEFTSIDE',false)
    },
    saveKey(){
      localStore.set('keyInfo',this.form)
      this.$toast.success('已保存')
    },
    calcXY(){
      const xy =this.xy.split(',')
      if(xy.length>1){
        this.form.lng = xy[0]
        this.form.lat = xy[1]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
h2{
  padding: 10px 15px;
  margin: 0;
  font-size: 14px;
}
.tips{
  padding: 5px 15px;
  font-size: 12px;
  .href{
    color: limegreen;
  }
}
</style>