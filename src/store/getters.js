const getters = {
  leftSide: state => state.app.leftSide,
  rightSide: state => state.app.rightSide,
  packList: state => state.app.packList,
  needLoad: state => state.app.needLoad,
  lastLoadTime: state => state.app.lastLoadTime,
}
export default getters
