<template>
  <div class="right-side">
    <van-popup
      v-model="show"
      @close="handleClose"
      @click-overlay="handleClose"
      get-container="#app"
      position="right"
    >
      <p>薅羊毛一时爽，一直薅一直爽。</p>
      <div class="utils">
        <van-cell-group>
          <van-field label="定位" v-model="jwd">
            <div slot="button">
              <van-button type="text" size="small" @click="actionsheetShow=true">预设地区</van-button>
              <van-icon @click="questionJWD" name="question-o"/>
            </div>
          </van-field>
        </van-cell-group>
        <van-button @click="getAllPack" style="margin-top:10px" type="primary" size="large">搞得好的话</van-button>
      </div>
      <div class="log">
        <p class="content" v-for="(x,i) in logList" :key="i">{{x}}</p>
      </div>
    </van-popup>
    <van-actionsheet v-model="actionsheetShow" :actions="jwdList" @select="selectJWD"/>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { Dialog } from "vant";
import request from "@/utils/request";
import localStore from "store";
import { mapGetters } from "vuex";

export default {
  name: "right-side",
  components: {
    // [Dialog.name]:Dialog
  },
  data() {
    return {
      show: this.$store.getters.rightSide,
      loading: false, // 防止没薅完就给我设置定位！
      actionsheetShow: false,
      jwd: "",
      listOptions: {
        _cmd: "laishang_index",
        page: 1,
        type: 0
      },
      packList: [],
      logList: [],
      ticketList: {},
      jwdList: [
        {
          name: "当前"
        },
        {
          name: "北京",
          jwd: "116.366433,39.884575"
        },
        {
          name: "上海",
          jwd: "121.442117,31.21294"
        },
        {
          name: "广州",
          jwd: "113.246316,23.150611"
        },
        {
          name: "深圳",
          jwd: "114.102028,22.565866",
          subname: "金主的公司地址"
        },
        {
          name: "成都",
          jwd: "104.0555,30.550538"
        },
        {
          name: "武汉",
          jwd: "114.294757,30.569458"
        }
      ]
    };
  },
  watch: {
    "$store.getters.rightSide"(value) {
      this.show = value;
    }
    // "$store.getters.needLoad"(value) {
    //   this.checked = value;
    // }
  },
  computed: {
    ...mapGetters(["lastLoadTime"])
  },
  mounted() {
    // this.getUserInfo();
  },
  methods: {
    questionJWD() {
      this.$dialog
        .alert({
          title: "虚拟定位可以获取仅此地区可见的红包",
          message: `
                <p class="tips">
                  <span>前往<a href="https://lbs.amap.com/console/show/picker" target="_blank">高德开放平台</a>，选择目标地址，把坐标获取结果粘贴进来。不填写定位信息也没关系，只是红包会少很多。</span> 
                </p>
              `
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    selectJWD({ jwd }) {
      this.jwd = jwd;
      if (!jwd) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            if (position.coords) {
              const { longitude, latitude } = position.coords;
              this.jwd = `${longitude},${latitude}`;
            } else {
              this.$toast("chrome浏览器加载不到定位的~");
            }
          },
          error => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.$toast("定位失败,用户拒绝请求地理定位");
                break;
              case error.POSITION_UNAVAILABLE:
                this.$toast("定位失败,位置信息是不可用的");
                break;
              case error.TIMEOUT:
                this.$toast("定位失败,请求获取用户位置超时");
                break;
              case error.UNKNOWN_ERROR:
                this.$toast("定位失败,定位系统失效");
                break;
            }
          }
        );
      }
      this.actionsheetShow = false;
    },
    getAllPack() {
      const multiActive = localStore.get('multiActive')
      if (!this.loading) {
        if (this.jwd && this.jwd.indexOf(",") < 0) {
          this.$toast("定位不规范，作者两行泪");
        }
        const jwd = this.jwd ? this.jwd.split(",") : ["", ""];
        this.listOptions.lng = jwd[0];
        this.listOptions.lat = jwd[1];
        this.ticketList = localStore.get('ticketList') || {}
        if(!multiActive){
          this.$toast.fail('请添加用户')
          return false
        }
        this.listOptions.ticket = this.ticketList[multiActive].ticket
      }
      this.loading = true

      if (this.listOptions.page === 1) {
        this.logList = [];
        this.logList.push("稍等片刻，以"+multiActive+"的列表给你找红包...");
      }

      request({
        url: "/api",
        method: "post",
        data: this.listOptions
      })
        .then(res => {
          this.listOptions.page = this.listOptions.page + 1;
          this.packList = this.packList.concat(res.data.blog_data);

          const lastPackTime = new Date(
            this.packList[this.packList.length - 1].created_at
          ).getTime(); //
          const key = `multi${this.listOptions.lng}&${this.listOptions.lat}${this.listOptions.ticket.replace(/-/g,'')}`;
          if (
            res.data.blog_data.length <= 0 ||
            lastPackTime < this.lastLoadTime[key]
          ) {
            this.loading = false
            this.openPack(key);
          } else {
            this.getAllPack();
          }
        })
        .catch(e => {
          console.log("e", e);
        });
    },
    openPack(key) {
      this.listOptions.page = 1; // 请求完毕初始化请求
      const timeStamp = {};
      timeStamp[key] = new Date().getTime();
      this.$store.commit("SET_MULTILASTLOADTIME", timeStamp);

      let packNum = 0; //统计一下红包数量
      const receiveStatus = this.packList.every((element, index) => {
        if (element.is_receive == 0) {
          packNum += 1;
          this.multipleOpen(element)
        }
        if (this.packList.length - 1 === index) {
          // 抢完红包刷用户数据
          this.$emit('change',true);
        }
        return element.is_receive !== 0;
      });

      if (receiveStatus) {
        this.logList.push("都被你薅秃咯~");
      } else {
        this.logList.push(`找到${packNum}个红包！`);
      }
    },
    multipleOpen({blog_id,name}){
      Object.keys(this.ticketList).forEach((item,index)=>{
        console.log('item', item)
        this.$store.dispatch("getPack", {
          blog_id,
          ticket: this.ticketList[item].ticket,
          lng: this.listOptions.lng,
          lat: this.listOptions.lat,
          }).then(res => {
            this.$toast.loading({
              mask: true,
              message: `${item}正在薅${name}的羊毛中...`
            });
          }).catch(e => {
            if (e.info === "请登录后操作") {
              this.$toast.fail("点左上角配置一下ticket吧");
            }
          });
      })
    },
    handleClose() {
      this.$store.commit("TOGGLE_RIGHTSIDE", false);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.utils {
  padding: 10px 0;
  /deep/ .van-cell__title {
    max-width: 40px;
  }
  .van-icon-question-o {
    font-size: 20px;
    vertical-align: middle;
  }
}
</style>