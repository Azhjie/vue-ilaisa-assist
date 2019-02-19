<template>
  <div class="home">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :pulling-text="lastLoadTime[`${lng}&${lat}&${ticket}`]?`上次刷新时间: ${parseTime(lastLoadTime[`${lng}&${lat}&${ticket}`])}`:'下拉即可刷新...'"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText[needLoad.toString()]"
        @load="getList"
      >
        <van-cell
          v-for="(item,index) in packList"
          :key="item.blog_id"
          v-show="item.is_receive == 0"
          :label="'id:'+item.blog_id"
          :title="item.name+': '+(item.title||item.redpacket_info)">
          <img @click="getPack(item,index)" :src="`http://static.ilaisa.com/static/images/${item.is_agree==0?'hb':'hbhs'}_6.13@3x.png`" class="envelope-icon">
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import request from '@/utils/request'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import localStore from 'store'
export default {
  name: 'home',
  components: { },
  data() {
    return {
      loading:false,
      finished:false,
      refreshing:false,
      finishedText:{
        true:'没有更多了',
        false:'关闭加载了',
      },
      listOptions:{
        _cmd: 'laishang_index',
        page: 1,
        type: 0,
      },
      lng:'',
      lat:'',
      ticket: '',
      parseTime
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
      if(!this.needLoad){
        this.loading = false
        this.finished = true
        return
      }
      const {lng,lat,ticket} = localStore.get('keyInfo')|| {lang:'null', lat:'null',ticket:'null'}
      this.lng = lng
      this.lat = lat
      this.ticket = ticket.replace(/-/g,'')
      this.$store.dispatch('getPackList',this.listOptions).then(res => {
        this.listOptions.page = this.listOptions.page+1
        this.loading = false;
        const lastPackTime = new Date(this.packList[this.packList.length-1].created_at).getTime()
        if(lastPackTime<this.lastLoadTime[`${this.lng}&${this.lat}&${this.ticket}`]){
          this.finished =true
        }
        if (res.data.blog_data.length <=0) {
          this.finished = true
        }
        if(this.finished && this.packList.every(i=>i.is_receive !== 0)){ //全部领了之后就不加载这时间之后的数据了
            this.$store.commit('SET_LASTLOADTIME',new Date().getTime())
          }
      }).catch((e) => {
        console.log('e', e)
        
      })

    },
    onRefresh(){
      this.$nextTick(()=>{
        this.$store.commit('SET_PACKLIST',[])
        this.finished = false
        this.refreshing = false
        this.listOptions.page = 1
        window.scrollTo(0, 10)
      })
    },
    getPack({blog_id},index){
      this.$store.dispatch('getPack',blog_id).then(res => {
        this.$toast(res.info)
        if(res.info === '领取成功'){//列表删除
          this.$set(this.packList[index],'is_agree',1)
        }

      }).catch((e) => {
        if(e.info === '请登录后操作'){
            this.$toast.fail('点左上角配置一下ticket吧')
          }
        })
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
  min-height: calc(100vh - 46px);
}
.van-cell{
  /deep/  .van-cell__value{
    width: 40px;
  }
}
</style>

