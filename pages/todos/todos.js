//todos.js
//获取应用实例
const app = getApp()
const store = app.store

Page({
  data: {
    todo: {
      content: ''
    }
  },

  onLoad() { },

  onShow() {
    store.mapState(['todos'], this)
  },

  //事件处理函数
  bindAddTodoTap() {
    if (!this.data.todo.content) return wx.showModal({
      title: '待办项不能为空',
      content: '',
      showCancel: false
    })
    store.dispatch('addTodo', this, {
      todo: {
        content: this.data.todo.content
      }
    })
    this.setData({
      'todo.content': ''
    })
  },

  bindDelTodoTap(e) {
    let { index } = e.target.dataset
    wx.showModal({
      title: '确定要删除这一项吗',
      content: '',
      success: res => {
        if (!res.confirm) return
        store.dispatch('delTodo', this, {
          index
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },

  bindAddTodoInput(e) {
    let val = e.detail.value
    this.setData({
      'todo.content': val
    })
  },

})