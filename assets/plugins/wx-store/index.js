module.exports = class Store {
  constructor(option = {}) {
    this.state = option.state || {}
    this.actions = option.actions || {}
  }

  // 修改state的方法
  setState(data) {
    this.state = Object.assign({}, this.state, data)
  }

  // 派发action, 统一返回promise action可以直接返回state
  dispatch(type, ctx, payload) {
    let update = res => {
      if (typeof res !== 'object') return
      this.setState(res)
      if (!ctx || typeof ctx.setData !== 'function') return
      ctx.setData(res)
    }

    if (typeof this.actions[type] !== 'function') return
    let res = this.actions[type](this, payload)
    if (res.constructor.toString().match(/function\s*([^(]*)/)[1] === 'Promise') return res.then(update)
    else return new Promise(resolve => {
      update(res)
      resolve()
    })
  }

  // state映射
  getState(keys) {
    let state = this.state
    let data = {}
    keys.forEach(key => data[key] = state[key])
    return data
  }

  // 页面show时更新页面data
  mapState(keys, ctx) {
    if (!ctx || typeof ctx.setData !== 'function') return
    ctx.setData(this.getState(keys))
  }
}