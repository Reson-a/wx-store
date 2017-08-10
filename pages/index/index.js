//index.js
//获取应用实例
const app = getApp()
const store = app.store

Page({
  data: {
    motto: 'Hello World',
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../todos/todos'
    })
  },
  onLoad() {
    store.dispatch('login', this)
  },
  onShow() {
    store.mapState(['userInfo'], this)
  }
})