# ele_zhu_project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9090
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
#### ele么页面中商品页面组件的书写
ref的知识准备
ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的$refs对象上。
1. 如果在普通的DOM元素上使用, 引用指向的就是DOM元素
2. 如果用在子组件上，引用就指向组件实例
```
<!-- vm.$refs.p will be the DOM node-->
<p ref='p'>Hello</p>
<!-- vm.$refs.child will be the child comp instance-->
<child-comp ref='child'></child-comp>
```
当v-for用于元素或者组件的时候，引用信息将包含DOM节点或者组件实例的数组。
关于ref注册时间的重要说明：因为ref本身是作为渲染结果被渲染的，在初始渲染的时候你不能访问他们--
他们还不存在！$refs也不是响应式的，因此你不应该试图用它在模板中做数据绑定。
