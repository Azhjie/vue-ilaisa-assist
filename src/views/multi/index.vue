<template>
  <div class="home">
    <app-Nav></app-Nav>
    <left-side @change="getList"></left-side>
    <right-side @change="getList"></right-side>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="getList">
        <van-swipe-cell v-for="x in Object.keys(ticketList)" :key="x" :right-width="65" :left-width="65">
          <span @click="setActive(x)" slot="left">选择</span>
          <van-cell 
            :title="x" 
            :class="{active:x === active}"
            :label="`${ticketList[x].nickName ||'加载中...'}`" 
            :value="`红包：${ticketList[x].amount||'加载中...'}`" >
            <img class="icon" slot="icon" :src="ticketList[x].avatar" alt="">
          </van-cell>
          <span @click="delTicket(x)" slot="right">删除</span>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <bottom-bar :active=1></bottom-bar>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import localStore from 'store'
import AppNav from './AppNav'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import BottomBar from '@/components/BottomBar'
export default {
  name: 'home',
  components: {
    AppNav,
    LeftSide,
    RightSide,
    BottomBar
   },
  data() {
    return {
      active:0,
      loading:false,
      finished:false,
      refreshing:false,
      ticketList:{}
    }
  },
  computed: {
    ...mapGetters([
      'packList',
      'needLoad',
      'lastLoadTime'
    ])
  },
  methods: {
    getList(){
      this.ticketList = localStore.get('ticketList') || {}
      this.getTickInfo()
      this.loading = false
      this.finished = true
    },
    getTickInfo(){
      const ticketLength = Object.keys(this.ticketList)
      const  multiActive = localStore.get('multiActive')
      
      this.setActive(this.ticketList[multiActive] ? multiActive : ticketLength[0])
      ticketLength.forEach((item,index)=>{
        request({
          url: "/api",
          method: "post",
          data: {
            _cmd: "User_index",
            ticket:this.ticketList[item].ticket,
            lng:'', //请求用户信息不用定位
            lat:'',
          }
        })
          .then(res => {
            this.$set(this.ticketList,item,{
              nickName:res.data.user_info.name,
              avatar:res.data.user_info.avatar,
              amount:res.data.wallet.packet.available
              })
          })
          .catch(() => {});
      })
    },
    onRefresh(){
      this.$nextTick(()=>{
      this.finished = false
      this.refreshing = false
      window.scrollTo(0, 10)
      this.getList()
      })
    },
    setActive(x){
      this.active = x
      localStore.set('multiActive',x)
    },
    delTicket(x){
      if(this.active === x){
        const ticketLength = Object.keys(this.ticketList)
        this.active = ticketLength[0]
      }
      this.ticketList = localStore.get('ticketList') || {}
      this.$delete(this.ticketList,x)
      this.ticketList = localStore.set('ticketList',this.ticketList)
    },
    getPack({blog_id},index){
      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.envelope-icon{
  width: 32.5px;
  height: 42px;
}
.van-list{
  min-height: calc(100vh - 96px);
}

.van-cell{
  .icon{
    border-radius: 50%;
    margin-right: 10px;
    width: 44px;
    height: 44px;
  }
  &.active{
    background-color: #dfefff;
  }
  
}
/deep/ .van-cell__title {
    max-width: 70px;
    
  }
/deep/  .van-cell__label{
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  }
/deep/ .van-cell__value{
  span{
    line-height: 44.6px;
  }
}

.van-swipe-cell {
  /deep/ &__left,
  /deep/ &__right {
    color: #fff;
    font-size: 15px;
    width: 65px;
    height: 64.6px;
    display: inline-block;
    text-align: center;
    line-height: 44px;
    background-color: red;
    span{
    line-height: 64.6px;

    }
    }
  /deep/ &__left{
  background-color: #55a8fa
  }
}
</style>

