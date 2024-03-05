class Dcls extends Date{
	constructor(date){
		date?super(date):super()
		this.Load()
	}
	Load(){
		console.log("hello")
	}
}

var d=new Dcls("2024-3-6")
console.log(d)
console.log(JSON.parse(JSON.stringify(d)))