function func1(obj){
	let {a}=obj
	a.b=1
}
function func2(obj){
	func1(obj)
}
var obj={a:{b:3}}
console.log(obj)
func2(obj)
console.log(obj)