import { Stat } from "../DataModule"
import { Tasks } from "./DataBundle"

class ToDoList{
	#storageName="todolist"
	constructor(){
		this.taskDone=false
		this.stat=new Stat(0)
	}
	Init(){
		let jsonString=localStorage.getItem(this.#storageName)??"{}"
		let data=JSON.parse(jsonString)
		this.data=new Tasks(data.data)
		this.taskDone=data.taskDone??false
		this.stat=data.stat??new Stat(0)
		console.log("data",this.data)
	}
	Save(){
		localStorage.setItem(this.#storageName,JSON.stringify(this))
	}
	DailyUpdate(){
		this.data={}
		this.Save()
	}
	GetNowTasks(){
		return this.data
	}
	SetData(data){
		Object.keys(data).map((task)=>{
			if((task in this.data)&&this.data[task]){
				data[task]=true
			}
		})
		this.data=new Tasks(data)
		this.done=false
		this.stat.taskCount=Object.keys(data).length
		this.Save()
	}
}
const todoList=new ToDoList()
export default todoList