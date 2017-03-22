　　作为一个前端小新人，多阅读源代码尤其是热门框架源代码对提升自己的js水平有很大的帮助，但也看过很多甚至是已经工作了很多年的大牛们有这样的反馈，“很努力地去阅读一些热门框架的源码，但是发现难度太高，花了很多时间却得不到什么，最终不得不放弃。”可能自己基础本身就不好，导致自己不自信，所以在自己更加不敢去深入源码，怕吃力不讨好，还不如多打好基础，直到我在ife上看到了渐进式，以完成一个个任务为指标的方式来阅读源码。
　　
　　Vue 最为基础的就是动态数据绑定，也是最为有用的一个功能。那么就跟随ife来一次vue的源码深入，好好的了解一下其中动态数据绑定的原理吧。

##Task1

请实现这样的一个 Observer，要求如下：

1.传入参数只考虑对象，不考虑数组。
2.new Observer返回一个对象，其 data 属性要能够访问到传递进去的对象。
3.通过 data 访问属性和设置属性的时候，均能打印出右侧对应的信息。
代码如下：（放在浏览器环境下运行）

`function Observer(data) {
	this.data = data;
	this.walk(data);
}

let p = Observer.prototype;
p.walk = function(data) {
   let val;
   for (let key in data) {
   	 if (data.hasOwnProperty(key)) {
   	 	val = data[key];
   	 	if (typeof val === 'object') {
   	 		new Observer(val);
   	 	}
   	 	this.convert(key,val);
   	 }
   }
};

p.convert = function(key,val) {
	Object.defineProperty(this.data, key, {
		enumerable:true,
		configurable:true,
		get: function() {
			console.log(`你访问了 ${key}`);
			return val;
		},
		set: function(newVal) {
			console.log(`你设置了 ${key}，新的值为${newVal}`);
			val = newVal;
		}
	});
};

let app = new Observer({
	self_info: {
		university:'bupt',
		name:'zhangzhengxian'
	},
	friends: {
		fbx: {
			info:{
				university:'bupt',
				name: 'fangbinxing'
			}
		}
	}
});`
　　
