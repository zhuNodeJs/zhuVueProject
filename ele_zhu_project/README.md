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
页面的滑动组件better-scroll的用法：
$cnpm install --save better-scroll
使用方法：
import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper, {})
当在项目中可以使用：vm.$refs:
项目中的使用方法：
```
created () {
	axios.get('static/data.json').then((res) => {
		this.goods = res.data.goods
		this.$nextTick(() => {
			this._initScroll() // 初始化scroll
			this._calculateHeight() // 初始化列表高度列表
			})
		})
}
methods: {
	_initScroll () {
		this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
			click: true
			})
		this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
			click: true,
			probeType: 3 // 探针作用，实时监测滚动位置
			})
	}
}
```
在初始的滚动中添加滚动的监听事件：
```
//添加监听事件
this.foodsScroll.on('scroll', (pos) => {
	this.foodsScrollY = Math.abs(Math.round(pos.y))
	})
```
左边的列表项的实行样式的联动：
其中的menuCurrentIndex()的实现方式是：
```
menuCurrentIndex () {
	for ( let i = 0, l = this.listHeight.length; i < l; i++) {
		let topHeight = this.listHeight[i]
		let bottomHeight = this.listHeight[i+1]
		if(!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
			return i
		}
		return 0
	}
}
```
知识点：
1. vue中的methods和computed的属性的区别
methods是方法，只要调用它，函数就会执行。
相同：两者达到的效果是相同的
不同:计算属性是基于他们的依赖进行缓存的，只有相关的依赖发生变化时才会重新求值。只要相关的依赖未改变，则不会执行该函数。
2.computed属性和watched属性
watched属性：代码更易于理解，他指定检测的值是谁，然后相应的改变其他的值。
他们的顺序的是：默认的加载的时候先computed然后再watch,不执行methods；等触发某一个事件后，则是：先methods在watch。
3. Vue.set(target, key, value)
用法：设置对象的属性。如果对象的是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用来避开Vue不能检测属性被添加的限制。
注意：对象不能是Vue实例，或者Vue实例的根数据对象。
