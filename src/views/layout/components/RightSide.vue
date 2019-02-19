<template>
  <div class="left-side">
    <van-popup
      v-model="show"
      @close="handleClose"
      @click-overlay="handleClose"
      get-container="#app"
      position="right"
    >
      <div class="userinfo">
        <img class="avatar" :src="user_info.avatar" alt>
        <p class="username">{{user_info.name}}</p>
        <div data-v-29e7873e class="wallent-list-wrapper">
          <div data-v-29e7873e class="count-item">
            <div data-v-29e7873e class="name">红包余额</div>
            <div data-v-29e7873e class="count wallet_list">{{wallet.packet.available}}</div>
          </div>
          <div data-v-29e7873e class="count-item">
            <div data-v-29e7873e class="name">现金余额</div>
            <div data-v-29e7873e class="count wallet_list">{{wallet.cash.available}}</div>
          </div>
          <div data-v-29e7873e class="count-item">
            <div data-v-29e7873e class="name">粉丝红包</div>
            <div data-v-29e7873e class="count wallet_list">{{wallet.anchor.available}}</div>
          </div>
        </div>
      </div>
      <div class="utils">
        <van-cell-group>
          <van-switch-cell v-model="checked" @change="changeNeedLoad" title="加载红包列表"/>
        </van-cell-group>
        <van-button @click="getAllPack" style="margin-top:10px" type="primary" size="large">一键全薅</van-button>
      </div>
      <div class="log">
        <p class="content" v-for="(x,i) in logList" :key="i">{{x}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import request from "@/utils/request";
import localStore from 'store'
import { mapGetters } from 'vuex'

export default {
  name: "left-side",
  components: {},
  data() {
    return {
      show: this.$store.getters.rightSide,
      checked:this.$store.getters.needLoad,
      user_info: {},
      wallet: {
        packet:{},
        cash:{},
        anchor:{},
      },
      listOptions:{
        _cmd: 'laishang_index',
        page: 1,
        type: 0,
      },
      logList:[],
      lng:'',
      lat:'',
      ticket: '',
    };
  },
  watch: {
    "$store.getters.rightSide"(value) {
      this.show = value;
      if(value){
        this.getUserInfo()
      }
    },
    "$store.getters.needLoad"(value) {
      this.checked = value;
    }
  },
  computed: {
    ...mapGetters([
      'packList',
      'lastLoadTime'
    ])
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      request({
        url: "/api",
        method: "post",
        data: {
          _cmd: "User_index"
        }
      })
        .then(res => {
          this.user_info = res.data.user_info;
          this.wallet = res.data.wallet;
        })
        .catch(() => {});
    },
    getAllPack(){
      const {lng,lat,ticket} = localStore.get('keyInfo')|| {lang:'null', lat:'null',ticket:'null'}
      this.lng = lng
      this.lat = lat
      this.ticket = ticket.replace(/-/g,'')

      this.listOptions.page ===1 && this.logList.push('稍等片刻，正在给你找红包...')
      this.$store.dispatch('getPackList',this.listOptions).then(res => {
        this.listOptions.page = this.listOptions.page+1
        const lastPackTime = new Date(this.packList[this.packList.length-1].created_at).getTime()

        if (res.data.blog_data.length <=0 || lastPackTime<this.lastLoadTime[`${this.lng}&${this.lat}&${this.ticket}`]) {
          this.listOptions.page = 1 // 请求完毕初始化请求
          this.$store.commit('SET_LASTLOADTIME',new Date().getTime())

          const length = this.packList.filter(i=>i.is_receive == 0).length
          if(this.packList.every(i=>i.is_receive !== 0)){
            this.logList.push('都被你薅秃咯~')
          }else{
            this.logList.push(`找到${length}个红包！`)
          }
          this.packList.forEach((element,index) => {
            if(element.is_receive == 0){
              this.$store.dispatch('getPack',element.blog_id).then(res => {
              this.logList.push(`${index}、成功领取${element.name}的红包`)
              if(res.info === `领取成功`){//列表删除
                this.$set(this.packList[index],'is_receive',1)
              }
            }).catch((e) => {
              if(e.info === '请登录后操作'){
                  this.$toast.fail('点左上角配置一下ticket吧')
                }
              })
            }
            if(length-1 === index){ // 抢完红包刷用户数据
              this.getUserInfo()
            }
          })
        }else{
          this.getAllPack()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    changeNeedLoad(val){
      this.$store.commit("TOGGLE_NEEDLOAD", val);
    },
    handleClose() {
      this.$store.commit("TOGGLE_RIGHTSIDE", false);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.userinfo {
  background-image: url(/img/avatar.png);
  background-size: cover;
  height: 180px;
  box-sizing: border-box;
  padding-top: 20px;
  text-align: center;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0.1rem solid rgba(188, 188, 188, 0.5);
  }
  .username {
    color: white;
    height: 32px;
    font-size: 24px;
  }
  .wallent-list-wrapper{
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 38px;
    padding-top: 14px;
    background-color: rgba(99, 99, 99, 0.5);
    color: #ddd;
    .count{
      color: #fff;
    }
  }
}
.utils{
  padding: 10px 0;
}

</style>