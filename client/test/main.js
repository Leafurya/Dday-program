class Dcls extends Date{
	constructor(date){
		date?super(date):super()
	}
	Load(){
		console.log("hello")
	}
}
class Ecls{
	constructor(){
		this.a=1
	}
	print(){
		console.log("e cls")
	}
}
class Acls extends Dcls{
	constructor(){
		super()
		this.b=2
	}
	log(){
		console.log("a cls")
	}
}

var a=new Acls()
a.log()
console.log(JSON.stringify(a))
// var d=new Dcls("2024-3-6")
// console.log(d)
// console.log(JSON.parse(JSON.stringify(d)))