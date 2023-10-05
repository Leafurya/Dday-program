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
let jsonString=`{
	"테스트": {
		"version": 1,
		"D": "-",
		"start": true,
		"tasks": {
			"과제": false
		},
		"day": "1",
		"discription": "프로젝트",
		"stat": {
			"taskCount": 1,
			"checkedTaskCount": 0
		},
		"prjDone": false,
		"taskDone": false,
		"lastTasks": {
			"마지막": false
		}
	}
}`
console.log(jsonString)

let json=JSON.parse(jsonString)
console.log("json",typeof(json))
console.log(json)

// var test=new Test()
// console.log(test)
// test.quit()
// console.log(test)
// test.print()
// console.log(undefined||"hello")
// console.log(null||"hello")
// console.log(false||"hello")
// console.log(true||"hello")