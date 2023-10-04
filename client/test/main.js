class Test{
	constructor(){
		this.a={
			b:1,
			c:2
		}
		this["z"]=1
	}
	get(){
		return this.a
	}
	print(){
		console.log(this)
	}
	quit(){
		delete this
	}
}
class Empty{
	constructor(){
		if(false){
			this.a=1
		}
		return undefined
	}
}
function Change(obj){
	Object.keys(obj).map((key)=>{
		obj[key]=0
	})
}
var t=new Test()
console.log(t)
var tt=t.get()
tt.b=4
console.log(t)
Change(tt)
console.log(t)
console.log(Object.keys(t))
console.log(new Empty())
t.print()
t.quit()
console.log(t)