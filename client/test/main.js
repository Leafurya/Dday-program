class Test{
	constructor(){
		this.a={
			b:{a:1},
			c:{a:2}
		}
		this["z"]=1
	}
	get(){
		return this.a
	}
	print(){
		console.log(Object.keys(this))
	}
	quit(){
		Object.values(this.a).map((data)=>{
			data.a=4
		})
	}
}
var test=new Test()
console.log(test)
test.quit()
console.log(test)
test.print()
console.log(undefined||"hello")
console.log(null||"hello")
console.log(false||"hello")
console.log(true||"hello")