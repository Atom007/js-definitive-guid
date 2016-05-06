// this
var o = {
	
	m:function(){
		var self = this;
		console.log(this === o);
		f();
		
		function f(){
			console.log(this === o);
			console.log(self === o);
			console.log(this);
		}
	}
	
};
o.m();

//close package
var uniqueInteger = (function(){
	
	var counter = 0;
	return function(){return counter++;};
}());

//
function counter(c){
	
	var n=c || 0;
	return {
		count:function(){return n++},
		reset:function(){return n=0}
	};
}

var c=counter(),d=counter();
console.log(c.count());
console.log(d.count());
console.log(c.reset());
console.log(c.count());
console.log(d.count());
console.log(c.count());

// get set
function counter(n){
	
	return {
		get count(){
			return n++;
		},
		set count(m){
			if(m>=n) n=m
			else throw Error("count can only be set to a larger value");
		}
	};
}



var c=counter(1000)
console.log(c.count);
console.log(c.count);
console.log(c.count=2000);
console.log(c.count);
console.log(c.count=2000);

//cp impl
function addPrivateProperty(o,name,predicate){
	
	var value;
	o["get" + name] = function(){return value};
	
	o["set" + name] = function(v){
		
		if(predicate && !predicate(v)){
			throw Error("set"+name+": invalid value "+ v);
		}else{
			value = v;
		}
	};
	
}

	//invoke
var o={};
addPrivateProperty(o,"Name",function(x){return typeof x == "string"});

o.setName("Frank");
console.log(o.getName());
o.setName(o);

//uncomplete function
function array(a,n){
	return Array.prototype.slice.call(a,n || 0);
}

function partialLeft(f /*,...*/){
	var args = arguments;
	return function(){
		var a = array(args,1);
		a = a.concat(array(arguments));
		return f.apply(this,a);
	}
}

	//invoke
var f = function(x,y,z){
	return x * (y - z);
}

partialLeft(f,2)(3,4);

//memorize
function memorize(f){
	var cache = {};
	return function(){
		var key = arguments.length + Array.propertype.join.call(arguments,",");
		if(key in cache) return cache[key];
		else return cache[key] = f.apply(this,arguments);
	};
}



















