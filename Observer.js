function Observer(data) {
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
});