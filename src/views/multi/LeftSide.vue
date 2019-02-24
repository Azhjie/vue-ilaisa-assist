<template>
  <div class="left-side">
    <van-popup 
      v-model="show" 
      @close="handleClose" 
      @click-overlay="handleClose"
      get-container="#app"
      position="left">
      <van-tabs v-model="active">
        <van-tab title="添加Key">
          <h2>
            <span>如何填写？</span> 
          </h2>
          <p class="tips">
            <span>请注意填写哦，搞不清楚怎么玩耍的话，可以去单人历练一下。</span>
          </p>
          <van-cell-group>
            <van-field label="名称" v-model="form.name" placeholder="请填写ticket的名称" />
            <van-field label="ticket" v-model="form.ticket" placeholder="请填写ticket" />
          </van-cell-group>

          <h2>定位</h2>
          <p class="tips">
            <span>在多人功能这里，只请求一个地区的红包列表，然后账号排排队使劲薅。因为一个账号对应一个地区，瞬间请求太多了，所以特意集成几个红包多的定位，或者你任性，偏要自己填写，在开薅的时候可以自由选择。</span> 
          </p>
          <van-button style="margin-top:20px" type="primary" size="large" @click="saveKey">保存</van-button>
        </van-tab>
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
        name:'',
      },
      ticketList: {}
    }
  },
  watch: {
    '$store.getters.leftSide'(value){
      this.show = value
    }
  },
  mounted(){
    this.ticketList = localStore.get('ticketList') || {}
  },
  methods: {
    handleClose(){
      this.$store.commit('TOGGLE_LEFTSIDE',false)
    },
    validateVal(val,msg){
      if(!val){
        this.$toast(msg)
        return false
      }
      return true
    },
    validateTicket(){
      const val = this.form.ticket
      if(val.length!==37){
        this.$toast('ticket的长度好像不太对劲')
        return false
      }
      return true
    },
    saveKey(){
      if(!this.validateVal(this.form.name,'请输入名称')) return
      if(!this.validateVal(this.form.ticket,'请输入ticket')) return
      if(!this.validateTicket()) return
      if(this.ticketList[this.form.name]){
        this.$toast.fail('添加失败，已存在相同名称')
        return
      }
      this.ticketList[this.form.name] = {}
      this.ticketList[this.form.name]['ticket'] = this.form.ticket
      localStore.set('ticketList',this.ticketList)
      this.$toast.success('添加成功')
      this.form = {}
      this.$emit('change',true)
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