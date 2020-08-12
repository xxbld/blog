# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## State 状态(数据源,与组件的 data(){} 近似)
Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。

## Getter (与组件的 computed:{} 近似)
有时候我们需要从 store 中的 state 中派生出一些状态。
```js
 getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
```
## Mutation (似于事件 与组件的 methods:{} 近似;必须是同步函数)
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
```js
// Mutation 必须是同步函数

// 调用mutations 中的 increment方法
store.commit('increment', 10)
```
## Action (类似于 mutation)
不同在于：
+ Action 提交的是 mutation，而不是直接变更状态。
+ Action 可以包含任意异步操作。
```js
actions: {
  // 注意是context,也就是提交当前modules下的mutation
  increment (context) {
    context.commit('increment')
  }
}
// 触发Action
store.dispatch('increment')
// 组件中触发
this.$store.dispatch('xxx')
```

## Module 包含 *[State,Getter,Mutation,Action,Module]*

```js

// 辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

// mapState: 当一个组件需要获取多个状态时候，可以使用 mapState 帮助我们生成计算属性;
// mapGetters: 将 store 中的 getter 映射到局部计算属性;
// mapMutations: 将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。或者在组件中this.$store.commit('xxx') 提交
// mapActions: 将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）。或者在组件中this.$store.dispatch('xxx') 触发

const moduleA = {
  // namespaced: true
  // 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

  state: { ... },//状态(数据源)：用到Vue组件的data(){},computed:{}
  mutations: { ... },//          ：用到Vue组件的  methods:{}
  actions: { ... },//          ：用到Vue组件的  methods:{}
  getters: { ... }//      用到Vue组件的computed:{}
  modules:{ ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

export default new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态


```

