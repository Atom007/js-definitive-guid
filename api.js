//继承
function inherit(p){
	
	if(p == null) throw TypeError();
	
	if(Object.create)
		return Object.create(p);
	var t = typeof p;
	if(t !== "object" && t !== "function") throw TypeError();
	function f(){};
	f.prototype = p;
	return new f();
	
}

function defineClass(constructor,methods,statics){
	if(methods) extend(constructor.prototype,methods);
	if(statics) extend(constructor,statics);
	return constructor;
}

function defineSubClass(superclass,constructor,methods,statics){
	constructor.prototype = inherit(superclass.constructor);
	constructor.prototype.constructor = constructor;
	if(methods) extend(constructor.prototype,methods);
	if(statics) extend(constructor,statics);
	return constructor;
}

Function.prototype.extend = function(constructor,methods,statics){
	return defineSubclass(this,constructor,methods,statics);
};


function extend(o,p){
	for(prop in p){
		o[prop] = p[prop];
	}
	return o;
}
//第二个及后续参数复制到第一个参数
var extend = (function(){
	
	for(var p in {toString:null}){
		return function extend(o){
				var source = arguments[i];
				for(var prop in source) o[prop] = source[prop];
			}
			return o;
		};
	}
	
	return function patched_extend(o){
		
		for(var i =1;i<arguments.length;i++){
			
			var source = arguments[i];
			for(var prop in source) o[prop] = arguments[prop];
		
		
			for(var j =0;j<protoprops.length;j++){
				prop = protoprops[j];
				if(source.hasOwnProperty(prop)) o[prop] = source[prop];
			}
		}
		return o;
	};
	var protoprops = ["toString","valueOf","constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString"];
	
}());







