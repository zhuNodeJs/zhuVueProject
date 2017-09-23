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
4. 过渡效果的效果
```
&.fadeRotate-enter-active, &.fadeRotate-leave-active
  transform translate3d(0, 0, 0)
  .inner
    display inline-block
    transform rotate(0)
&.fadeRotate-enter, &.fadeRotate-leave-active
  opacity 0
  transform translate3d(24px, 0, 0)
  .inner
    transform rotate(180deg)
```
组件的过渡过程中，会有四个css类名进行切换，这四个类名与上面的transition的name属性有关，比如：name='fadeRotate',会有下面四个CSS类名：
1. fadeRotate-enter: 进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；
2. fadeRotate-enter-active: 进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除；
3. fadeRotate-leave: 离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除；
4. fadeRotate-leave-active: 离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除；
从上面的四个类中可以看出，fadeRotate-enter-active和fadeRotate-leave-active在整个进入或者离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。
注：vue 2.0 非父子之间的通信如何完成
vue2.0中的$dispatch和$broadcast被弃用，在vue2.0中初始化vue之前，给data添加一个名为eventhub的空对象：
```
new Vue({
	el:'#app',
	router,
	render: h=> h(App),
	data: {
		eventHub: new Vue()
	}
	})
```
某一个组件内调用事件触发
this.$root.eventHub.$emit('eventName', event.target)
另一个组件内调用事件接收，在组件销毁时解除事件绑定，使用$off方法
```
created () {
	this.$root.eventHub.$on('eventName', (target) => {
		this.functionName(target)
		})
},
methods: {
	functionName (target) {
		console.log(target)
	}
}
```
注：flex 0 0 150px 解析：
flex flex-grow flex-shrink flex-basis; 这三个flex布局中, 父元素在不同宽度下，子元素是如何分配父元素的空间的。
其中，这三个属性都是在子元素上设置的。
注：下面讲的父元素，指以flex布局的元素(display:flex)
1. flex-basis:
用来设置该元素的宽度,如果元素上同时设置了width和flex-basis，那么flex-basis会覆盖width的值。
2. flex-grow
该属性来设置，当父元素的宽度大于所有的子元素的宽度的和时(即父元素有剩余空间时), 子元素如何分配父元素的剩余空间。
flex-grow的默认值为0，意思是该元素不索取父元素的剩余空间，如果值大于0，表示索取。值越大，索取的越厉害。
3. flex-shrink
该属性来设置，当父元素的宽度小于所有的子元素的宽度的和(即子元素会超出父元素)，子元素如何缩小自己的宽度的。
flex-shrink的默认值是1，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小，值越大，减小的越厉害。如果值为0， 表示不减小。
购物车中清空的按钮的实现方法：
通过自建的属性count来控制
```
methods: {
	setEmpty () {
		this.selectFoods.forEach((food) => {
			food.count = 0;
			})
	}
}
```
Vue实现响应式并不是数据发生变化之后DOM立即变化，而是按一定的策略进行DOM的更新。
$nextTick是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM，.
4. 使用getBoundingClientRect()来获取页面元素的位置
· 对于动画效果的实现，避免使用setTimeout或setInterval, 请使用requestAnimationFrame
· 把耗时长的Javascript代码放到Web Worker中去做
· 把DOM元素的更新划分为多个小任务，分别在多个frame中去完成
·使用Chrome DevTools的Timeline 和 Javascript Profile 来分析Javascript的性能
```
[code=”javascript”]var _x = 0, _y = 0;
do{
_x += el.offsetLeft;
_y += el.offsetTop;
}while(el=el.offsetParent);
return {x:_x,y:_y};[/code]
```
这里有个‘offsetParent’问题，所以要写很多的兼容的代码, 该方法获得页面中的某个元素的左，上，右，和 下分别相对浏览器视窗的位置，他返回的是一个对象，即Object，该对象有四个属性：top, left, right, bottom ,这里的top， left和css中的理解很相似，但是right，bottom和css中的理解有点不一样。
以前getBoundingClientRect()是IE特有的，目前FF3+，opera9.5+，safari 4，都已经支持这个方法。
有了这个方法，获取页面元素的位置就简单多了
var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;
总结来说是：边框离浏览器的距离。


