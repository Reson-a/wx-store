const Store = require('../assets/plugins/wx-store/index')
const Actions = require('./action')
const userInfo = wx.getStorageSync('userInfo') || {}
const todos = wx.getStorageSync('todos') || []

module.exports = new Store({
  state: {
    userInfo,
    todos
  },
  actions: Actions
})