export class Tasks{
	constructor(data){
		if(data){
			Object.keys(data).map((task)=>{
				this[task]=data[task]
			})
		}
	}
	Set(task,value){
		let done=true

		this[task]=value
		for(var t in this){
			if(!this[t]){
				done=false;
				break;
			}
		}

		return done
	}
	GetTaskCount(){
		return Object.keys(this).length
	}
	Reset(){
		for(var t in this){
			this[t]=false
		}
	}
	CountChecked(){
		let result=0
		for(var t in this){
			if(this[t]){
				result++
			}
		}
		return result
	}
}
class Project{
	constructor(name,data){
		// this.data=data

		this.name=name
		this.version=data.version
		this.D=data.D
		this.start=data.start??data.start
		this.tasks=new Tasks(data.tasks)
		this.day=Number(data.day)
		
		this.discription=data.discription
		this.stat=data.stat
		this.prjDone=data.prjDone
		this.taskDone=data.taskDone
		this.lastTasks=new Tasks(data.lastTasks)
	}
	Start(){
		if((this.D==="-"&&this.day<=0)||this.start){
			return false
		}
		this.start=true
		return true;
	}
	IsLastTaskExist(){
		return (this.lastTasks.GetTaskCount()>0?true:false)
	}
	GetNowTasks(){
		if(this?.lastTasks){
			if(this.day<=0&&Object.keys(this.lastTasks).length!==0){
				return this.lastTasks;
			}
		}
		return this.tasks
	}
	GetDay(){
		switch(this.D){
			case "+":{
				return this.day
			}
			case "-":{
				return (this.day>0?(""+this.day):"DAY")
			}
		}
	}
	Reset(){
		this.day=0
		this.start=false
		this.tasks.Reset()
		if(this.IsLastTaskExist()){
			this.lastTasks.Reset()
		}
		this.prjDone=true
		this.taskDone=false
	}
}
export class ProjectBundle{
	#storageName="projects"
	constructor(){
		
	}
	Init(){
		let jsonString=localStorage.getItem(this.#storageName)??"{}"
		let holyValue=JSON.parse(jsonString)
		this.data={}
		Object.keys(holyValue).map((name)=>{
			this.data[name]=new Project(name,holyValue[name])
		})
	}
	GetProject(prjName){
		return this.data[prjName]
	}
	IsExist(prjName){
		return (prjName in this.data)
	}
	Save(){
		localStorage.setItem(this.#storageName,JSON.stringify(this.data))
	}
	Append(prjName,data){
		if(this.IsExist(prjName)){
			return false
		}
		this.data[prjName]=new Project(prjName,data)
		return true
	}
	Modify(oldName,newName,data){
		if(!this.Append(newName,data)){
			return false
		}
		this.Remove(oldName)
		return true
	}
	Remove(prjName){
		delete this.data[prjName]
	}
	Quit(name){
		delete this.data[name]
		this.Save()
	}
	DailyUpdate(dateDelta){
		let nowTask
		Object.values(this.data).map((data)=>{
			if(data.start){
				nowTask=data.GetNowTasks()
				switch(data.D){
					case "+":{
						data.day+=dateDelta
						data.stat.taskCount+=(nowTask.GetTaskCount()*dateDelta)
						break
					}
					case "-":{
						data.day-=dateDelta

						if(data.day<0){
							data.stat.taskCount+=(data.tasks.GetTaskCount()*(dateDelta+data.day-1))
							data.stat.taskCount+=(data.IsLastTaskExist()?(data.lastTasks.GetTaskCount()):(data.tasks.GetTaskCount()))
							data.Reset()
							return
						}
						else{
							data.stat.taskCount+=(nowTask.GetTaskCount()*dateDelta)
						}
						break
					}
				}
				nowTask.Reset()
				data.taskDone=false
			}
		})
	}
}
let projectBundle=new ProjectBundle()
export default projectBundle