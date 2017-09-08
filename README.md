## 这是一个项目文件夹, 专门用来作为的vue2.x项目的目录
### 项目一  是一个vue的小实例 , vue.js入门基础, todoList实例
项目准备阶段：国内优秀的npm镜像推荐和使用
淘宝npm镜像：
·搜索地址：http://npm.taobao.org/
·registry: http://registry.npm.taobao.org/
cnpmjs镜像
·搜索地址：http://cnpmjs.org/
·registry: http://r.cnpmjs.org/
如何使用：
 1. 临时使用
 ```
 npm --registry https://registry.npm.taobao.org install express
 ```
 2.持久使用
 ```
 npm config set registry https://registry.npm.taobao.org
 <!-- 配置后可通过下面的方式验证是否成功 -->
 npm config get registry
 <!-- 或 -->
 npm info express
 ```
 3.通过cnpm使用
 ```
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  <!-- 使用 -->
  cnpm install express
 ```
首先, 使用vue-cli脚手架，实现项目的框架创建和热更新。
```
$npm install --global vue-cli
$vue init webpack my-project
$cd my-project
$npm install
$npm run dev
```
注：组件内的data与vue实例中的data的写法有所不同，在组件内的data要是一个对象，返回对象：
```
watch: {
    items: {
      handler: function(val, oldValue) {
        Store.save(val);
      },
      deep: true
    }
  }
```
```
<template>
  <div id="app">
    <h2 v-text="title"></h2>
    <input type="text" @keyup.enter="addNewItem" v-model="newItem"/>
    <ul>
    	<li v-for="item in items" :class="{finished: item.isFinished}" @click="toggleFinished(item)">
    	  {{item.label}}
    	</li>
    </ul>
  </div>
</template>
```
父组件向子组件传值总结：
·子组件在props中创建一个属性，用以接收父组件传过来的值
·父组件中注册子组件
·在子组件标签中添加子组件props中创建的属性
·把需要传给子组件的值赋给该属性
子组件向父组件传值：
1. 在子组件中定义一个触发的事件，能够触发子组件向父组件中传递参数的行为：
Child.vue
```
<button @click="sendMsgToParent">向父组件传值</button>
.......
methods: {
      sendMsgToParent: function() {
        this.$emit('listenToChildEvent','This message is from child to Parent!')
      }
    }
```
在父组件App.vue中添加接收子组件信息的事件：
```
<child message='Hello my world' @listenToChildEvent='sendMsgToParent'></child>
```
```
methods: {
    toggleFinished: function(item) {
      item.isFinished = !item.isFinished;
    },    
    addNewItem: function() {
      if(this.newItem.length !== 0) {
        this.items.push({label:this.newItem, isFinished: false});
      }      
      this.newItem = '';
    },
    sendMsgToParent: function(data) {
      console.log('>>>>>',data);
    }
  },
  components: {
    child    
  }
```
这样既可完成子组件向父组件的传值。
总结一下：
·子组件中需要以某种方式例如点击事件的方法来触发一个自定义事件
·将需要传的值作为$emit的第二个参数，该值将作为实参传给响应自定义的事件的方法
·在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听

### 项目二 这是一个仿ele(饿了么)的在线项目,透过这个项目可以有效的掌握vuejs，也可以对react有更深入的理解，也可以对MVVM框架结构
有更好的了解

组件设计的原则
页面上每个独立的可视/可交互的区域视为一个组件
每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就近维护
页面不过是组件的容器，组件