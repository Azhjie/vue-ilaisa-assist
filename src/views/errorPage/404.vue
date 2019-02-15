<template>
  <div class="page404">
    <ul class="cicle_error">
			<img src="static/images/404_1.jpg" alt="页面迷路了" class="lost_img"/>
			<li><img src="static/images/404_2.jpg" alt="" /></li>
			<li class="lost_tip">页面迷路了...</li>
			<li>别着急，点击
        <router-link to="/">这里</router-link>
      就可以找到路啦~</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'page404',
  components: { },
  data() {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page404{
  padding: 5%;
}
.cicle_error{ 
  width:700px;
  height: 540px; 
  border:1px solid #d6d6d6;
  border-radius: 50%;
  padding: 142px 0 0 264px;
  margin: 0 auto;
  position: relative;
  li{
    list-style: none;
    &.lost_tip{ 
      font-size: 26px;
       margin:36px 0 85px 0;
      }
    &:last-child{ 
      font-size: 16px;
    }
    a{
      color: #c81428;
    }
  }
  .lost_img{ 
    position: absolute;
    left: -55px;
    top: 27px;
    }
}
</style>