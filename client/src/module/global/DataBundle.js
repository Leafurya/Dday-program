class Tasks{
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
}
class Project{
	constructor(name,data){
		// this.data=data


		this.name=name
		this.version=data.nowDataVersion
		this.D=data.D
		this.start=data.start
		this.tasks=new Tasks(data.tasks)
		this.day=data.day
		this.discription=data.discription
		this.stat=data.stat
		this.prjDone=data.prjDone
		this.taskDone=data.taskDone
		this.lastTasks=new Tasks(data.lastTasks)
	}
	Start(){
		if(this.day==="DAY"||this.start){
			//alert("프로젝트 재설정 부탁드립니다.");
			// Notice.Alert("프로젝트 재설정 부탁드립니다.")
			return false
		}
		// if(this.start){
		// 	return false;
		// }
		this.start=true
		// Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
		// PageCallbackFunc("Project",{name:prjName});
		return true;

			
	}
	End(){

	}
	GetNowTasks(){
		if(this?.lastTasks){
			if(this.day==="DAY"&&Object.keys(this.lastTasks).length!==0){
				return this.lastTasks;
			}
		}
		return this.tasks
	}
}
class ProjectBundle{
	#storageName="projects"
	constructor(){
		//data load
		let temp=JSON.parse(localStorage.getItem(this.#storageName)??"{}")
		this.data={}
		Object.keys(temp).map((name)=>{
			this.data[name]=new Project(name,temp[name])
		})
		// this.data=JSON.parse(localStorage.getItem(this.storageName)??"{}")
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
}
const projectBundle=new ProjectBundle()
console.log(projectBundle)
export default projectBundle