let obj={
	hello:{
		a:1
	}
}
function set(obj){
	obj.a=2
}
console.log(obj)
set(obj.hello)
console.log(obj)