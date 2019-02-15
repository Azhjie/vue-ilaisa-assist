// 转换路由meta中英文的方法
export function generateTitle(title) {
  if (!title) return ''
  const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title) //

  if (hasKey) {
    return translatedTitle
  }
  return title
}
