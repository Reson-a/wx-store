module.exports = {
  login({ state }, payload) {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: false,
        success: res => {
          let userInfo = res.userInfo
          setStorage('userInfo', userInfo)
          resolve({
            userInfo
          })
        },
        fail: err => reject(err)
      })
    })
  },
  /* { index:0, todo:{} } */
  addTodo({ state }, payload) {
    console.log(payload)
    let todos = [...state.todos, payload.todo]
    setStorage('todos', todos)
    return {
      todos
    }
  },
  delTodo({ state }, payload) {
    let todos = state.todos.filter((item, index) => index !== payload.index)
    setStorage('todos', todos)
    return {
      todos
    }
  },
  updateTodo({ state }, payload) {
    let todos = [...state.todos]
    todos[payload.index] = Object.assign(todos[payload.index], payload.todo)
    setStorage('todos', todos)
    return {
      todos
    }
  }
}

const setStorage = (key, data) => {
  wx.setStorage({
    key,
    data
  })
}