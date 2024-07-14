let obj={a:1,b:2}
class Obj{
	constructor(){
		console.log("hello")
	}
	print(){
		console.log(this.a,this.b)
	}
}

class Obj2{
	constructor(){
		this.c=19
		this.a=1
		this.b=4
	}
	show(){
		console.log(this.c)
	}
}

let obj2=new Obj2()
obj2.__proto__.__proto__=Obj.prototype

console.log(obj2)
obj2.print()
obj2.show()