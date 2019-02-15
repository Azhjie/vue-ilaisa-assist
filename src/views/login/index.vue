<template>
  <div class="login">
    <div class="title-container">
      <img class="logo" src="/static_mobile/img/login/logo.png">
      <h3 class="title">{{$t('login.title')}}</h3>
    </div>

    <!-- 切换 -->
    <van-row class="switch" type="flex" justify="center">
      <van-col span="6">
        <van-button 
          :class="{'blur-btn':!flag}"
          @click="flag = true" type="text">
          {{$t('login.dynamic')}}
        </van-button>
      </van-col>
      <van-col span="3"></van-col>
      <van-col span="6">
        <van-button 
          :class="{'blur-btn':flag}"
          @click="flag = false" type="text">
          {{$t('login.psw')}}
        </van-button>
      </van-col>
    </van-row>

    <div class="toogle-login">
      <transition name="slide">
        <div v-if="flag" key="dynamic">
          <van-field
            v-model.trim="dynamicForm.username" 
            :placeholder="$t('placeholder.phone')">
            <svg-icon slot="label" icon-class="login-user"></svg-icon>  
          </van-field>
          <van-field 
            @keyup.enter.native="handleLogin" 
            v-model.trim="dynamicForm.randomCode" 
            :placeholder="$t('placeholder.code')">
            <svg-icon slot="label" icon-class="login-psw"></svg-icon>  
            <van-button 
              slot="button" 
              size="small" 
              type="text"
              :disabled="sendTime!==60 || !Phone(dynamicForm.username) " 
              @click="getCode">
              {{sendTime>=60?$t('login.code'):sendTime+'S'}}
            </van-button>
          </van-field>
        </div>

        <div v-else key="psw">
          <van-field
            v-model.trim="pswForm.username" 
            :placeholder="$t('placeholder.phone$email')">
            <svg-icon slot="label" icon-class="login-user"></svg-icon>  
          </van-field>
          <van-field 
            :type="passwordType"
            @keyup.enter.native="handleLogin" 
            v-model.trim="pswForm.password" 
            :placeholder="$t('placeholder.psw')">
            <svg-icon slot="label" icon-class="login-psw"></svg-icon>  
            <div slot="icon" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password'? 'eye-close':'eye-open'"/>
            </div>
          </van-field>
        </div>
      </transition>
    </div>
    
    <div class="enter-btn">
      <van-button 
        size="large" 
        :loading="loading" 
        @click.native.prevent="handleLogin" 
        type="primary">
        {{$t('login.enter')}}
      </van-button>
    </div>

    <van-row style="padding:0 15px;" type="flex" justify="around-between">
      <van-col span="12">
        <van-button 
          size="small" 
          type="text" 
          class="blur-btn"
          @click="$router.push({path:'/register'})">
          立即注册
        </van-button>
      </van-col>
      <van-col span="12" style="text-align:right">
        <van-button
          v-if="!flag"
          size="small" 
          type="text" 
          class="blur-btn"
          @click="$router.push({path:'/passwordfind'})">
          忘记密码?
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Cell, Field, Button, Row, Col } from 'vant'
import { Phone, loginPwd, Email } from '@/utils/validate'
// import { sendinformation } from '@/api/common'
import { mapGetters } from 'vuex'
let sendBtnTimer
export default {
  components: {
    'vanCell': Cell,
    'vanField': Field,
    'vanButton': Button,
    'vanRow': Row,
    'vanCol': Col
  },
  name: 'login',
  data() {
    return {
      flag: true, // 切换表单
      loading: false,
      dynamicForm: {
        username: '',
        randomCode: '',
        client: 3
      },
      pswForm: {
        username: '',
        password: '',
        client: 3
      },
      passwordType: 'password',
      sendTime: 60,
      Phone
    }
  },
  computed: {
    ...mapGetters([
      'country'
    ])
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    },
    handleLogin() {
      if (this.flag) {
        this.validateDynamic() && this.submit('LoginByDynamic', this.dynamicForm)
      } else {
        this.validatePsw() && this.submit('LoginByUsername', this.pswForm)
      }
    },
    validateDynamic() {
      if (!this.dynamicForm.username) {
        this.$toast(this.$t('placeholder.phone'))
        return false
      }
      if (!Phone.call(this, this.dynamicForm.username)) {
        this.$toast(this.$t('error.phone'))
        return false
      }

      if (!this.dynamicForm.randomCode) {
        this.$toast(this.$t('placeholder.code'))
        return false
      }

      const code = this.dynamicForm.randomCode
      console.log('parseInt(code) + \'\' !== code', parseInt(code) + '' !== code)
      if (parseInt(code) + '' !== code || code.length !== 6) {
        this.$toast(this.$t('error.code'))
        return false
      }
      return true
    },
    validatePsw() {
      if (!this.pswForm.username) {
        this.$toast(this.$t('placeholder.phone'))
        return false
      }
      if (/@/.test(this.pswForm.username) && !Email(this.pswForm.username)) {
        this.$toast(this.$t('error.email'))
        return false
      }
      if (!Phone.call(this, this.pswForm.username) && !Email(this.pswForm.username)) {
        this.$toast(this.$t('error.phone'))
        return false
      }
      if (!this.pswForm.password) {
        this.$toast(this.$t('placeholder.code'))
        return false
      }
      if (!loginPwd(this.pswForm.password)) {
        this.$toast(this.$t('error.psw'))
        return false
      }
      return true
    },
    submit(dispatch, data) {
      this.loading = true
      this.$store.dispatch(dispatch, data).then(() => {
        this.loading = false

        this.$store.dispatch('GetUserInfo').then(res => {
        }).catch(() => {
        })
        this.returnBack()
      }).catch(() => {
        this.loading = false
      })
    },
    returnBack() { // 登录路由恢复
      const path = this.$route.query.return
      console.log('登录返回', path)
      if (path) {
        this.$router.replace({ path })
      } else {
        this.$router.replace({ path: '/mine' })
      }
    },
    getCode() {
      clearInterval(sendBtnTimer)
      this.sendTime = 59
      const submit = {
        phone: this.dynamicForm.username,
        r_reason: 'dynamicLogin'
      }

      // sendinformation(submit).then(response => {
      //   this.$toast({
      //     type: 'success',
      //     message: this.$t('message.codeSend')
      //   })
      //   sendBtnTimer = setInterval(this.changeSendBtn, 1000)
      // }).catch(() => {
      //   this.sendTime = 60 // 错误重置
      // })
    },
    changeSendBtn() {
      if (this.sendTime <= 0) {
        clearInterval(sendBtnTimer)
        this.sendTime = 60
        return false
      }
      this.sendTime--
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(sendBtnTimer)
    next()
  }
}
</script>

<style lang="scss" scoped>
.login{
  padding-top: 20px;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fff;
}

.title-container{
  text-align: center;
  .logo{
    width: 80px;
    height: 80px;
  }
  .title{
    font-size: 18px;
    font-weight: 600;
  }
}

.van-field{
  /deep/ .van-cell__title{
    max-width: 45px !important;
    line-height: 30px;
  }
  /deep/ .van-field__body{
    height: 100%;
  }
}

.van-cell:not(:last-child)::after,.van-cell::after {
  left: 15px;
  right: 15px;
  width: auto;
  -webkit-transform: scale(1,.5);
  transform: scale(1,.5);
  border-bottom-width: 1px;
}


.switch{
  margin: 45px 0;
  text-align: center;
  font-size: 14px;
}

.svg-icon{
  color: #b6bdcd;
  font-size: 20px; 
}

.toogle-login{
  min-height: 100px;
  position: relative;
  overflow: hidden;
  &>div{
    width: 100%;
    position: absolute;
  }
}

// 按钮
.blur-btn{
  color: #3a4254 !important;
}
</style>


