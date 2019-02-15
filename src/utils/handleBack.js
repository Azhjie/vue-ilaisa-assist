import { whiteList, blackList } from '@/authList'

export function handleBack() {
  const matched = this.$route.matched
  const matchedLength = matched.length
  const returnLink = this.$route.query.return
  const lastMatch = this.$route.matched[matchedLength - 1].path
  const routerBack = this.$route.meta.back
  const path = this.$route.path
  console.log('meta的back', routerBack)

  console.log('query的retrun', returnLink)
  if (returnLink) {
    const passList = whiteList.concat(blackList)
    // return不在免登录白+黑名单并且本页面在黑名单的情况，后退一步
    // 解决登录跳转地址和返回地址冲突
    if (passList.indexOf(returnLink) === -1 && blackList.indexOf(path) !== -1) {
      this.$router.replace({ path: '/' }) // 未登录返回 回首页
      return
    }
    this.$router.replace(returnLink)
    return
  }

  if (routerBack === true) {
    this.$router.go(-1)
    return
  }
  let Index = 2
  if (lastMatch.substr(-1) === '/') {
    Index = 3
  }
  console.log('Index', Index)
  console.log('this.$route.matched', this.$route)
  const back = routerBack ||
  (matched[matchedLength - Index] ? matched[matchedLength - Index].path : '/') ||
  '/'
  this.$router.replace(back)
}
