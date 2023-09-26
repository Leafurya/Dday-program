function func(obj){
	obj.a=1
}
let obj={
	c:{
		a:4,b:1
	},
	d:{
		a:3,b:2
	}
}
console.log(obj)
func(obj.c)
console.log(obj)
