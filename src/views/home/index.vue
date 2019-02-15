<template>
  <div class="home">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <van-cell
        v-for="(item,index) in listData"
        :key="item.blog_id"
        v-show="item.is_agree==0"
        :label="item.name"
        :title="item.title||item.landmark">
        <img @click="getPack(item,index)" :src="`http://static.ilaisa.com/static/images/${item.is_agree==0?'hb':'hbhs'}_6.13@3x.png`" class="envelope-icon">
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'home',
  components: { },
  data() {
    return {
      loading:false,
      finished:false,
      contentList:[
        '哇，居然真的可以提现！',
        '超级赏迷',
        '用来赏看资讯，领红包，还可以使用余额消费，不得了',
        '我觉得这个必须火爆呀，支持！',
        '实至名归！',
        '又下红包雨啦',
        '终于抢到了让我没白等',
        '让评论区热闹起来',
        '欢迎和我一样成为赏友',
        '明人不说暗话，多来点红包',
        '给32个赞',
        '时间会证明我用来赏是对的',
        '试一试我能不能领到',
        '重在参与',
        '万水千山总是情，再来个红包行不行',
      ],
      listOptions:{
          _cmd: 'laishang_index',
          lng: 17.648391,
          lat: 11.192572,
          page: 1,
          type: 0,
        },
        listData:[]
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList(){
      request({
        url: '/api',
        method: 'post',
        data:this.listOptions
      }).then(res => {
        this.listOptions.page = this.listOptions.page+1
        this.listData = this.listData.concat(res.data.blog_data)
        this.loading = false;
        if (res.data.blog_data <=0) {
          this.finished = true
        }
      }).catch(() => {
      
      })
    },
    getPack({blog_id},index){
      request({
        url:'/api',
        method: 'post',
        data:{
          _cmd: 'blog_redpacket_receive',
          lng: 17.648391, // 非洲
          lat: 11.192572,
          blog_id,
          is_hand: 0,
          content: this.contentList[Math.floor(Math.random()*15)],
          introducer: 0,
        }
      }).then(res => {
        this.$toast(res.info)
        if(res.info === '领取成功'){//列表删除
          this.$set(this.listData[index],'is_agree',1)
        }
      }).catch(() => {
      
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
</style>

