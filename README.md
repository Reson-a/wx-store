# Wx-store 小程序状态管理方案


### 介绍

多页面间的状态管理和页面通信是一个老生常谈的问题，目前在前端领域已经有非常成熟的解决方案比如redux，也可以通过在app中建立事件总线利用发布订阅模式的方式来实现。

但对于小程序而言，上述方案都存在着一些问题
- redux的概念较为复杂，初学者很难迅速上手掌握，并且代码量比较大，不够精简。绝大部分情况下小程序并不需要这么复杂的管理方案。
- 事件总线的方式只是作为一种通信手段，页面数量多了之后比较混乱，并且需要适时地移除监听。
- 对小程序而言，后台调用setData会影响前台页面的展示，当影响后台页面多，数据量较大时很容易造成卡顿，参见官方文档[小程序-优化建议](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html)
 

> 当页面进入后台态（用户不可见），不应该继续去进行setData，后台态页面的渲染用户是无法感受的，另外后台态页面去setData也会抢占前台页面的执行。

事实上在很多情况下，我们并不需要状态一直保持及时更新，只需要在适当的时机展示正确的数据即可。页面已经load过之后再次show的速度是很快的，此时调用setData并不会明显影响前台页面的展示。

于是突发奇想（脑袋进水）做了一个简单的状态管理方案，这里借鉴了redux和vuex的部分思想和代码风格，源码非常精简，相信基本都能看懂。


### 使用方法



在app.js中引入全局的store
```
const store = require('/assets/plugins/wx-store/index.js')

App({
  store：{
      // inital State
      state: {},
      // actions
      actions: {}
  }
})

```

在page中：  
调用mapState将全局state映射到page中，并不需要在data中初始化，而是在onShow中调用，页面再次打开则会自动更新数据  
调用dispatch修改state（唯一方法）, 传入this实例，页面会自动更新数据

```
const app = getApp()
const store = app.store


Page({
  data: {
  },
  onLoad() {
    // 派发action
    store.dispatch('login', this).then(()=>{})
  },
  onShow() {
    // 更新state
    store.mapState(['userInfo'], this)
  }
})
```


action的写法，返回值会直接setState到store，注意数据结构（可返回promise）
```
{
  login({ state }, payload) {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: false,
        success: res => {
          let userInfo = res.userInfo
          resolve({
            userInfo
          })
        },
        fail: err => reject(err)
      })
    })
  },
  /* { index:0, todo:{content:''} } */
  addTodo({ state }, payload) {
    let todos = [...state.todos, payload.todo]
    return {
      todos
    }
  }
}
```

具体请参考本仓库的todolist项目实例

### 待添加
- 支持以.分隔的key值
- 提供方法合并页面内部数据的setData调用，最小化调用次数
- 简单的模块管理
