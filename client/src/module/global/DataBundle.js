class Project{
	constructor(name,data){
		// this.data=data


		this.name=name
		this.version=data.nowDataVersion
		this.D=data.D
		this.start=data.start
		this.tasks=data.tasks
		this.day=data.day
		this.discription=data.discription
		this.stat=data.stat
		this.prjDone=data.prjDone
		this.taskDone=data.taskDone
		this.lastTasks=data.lastTasks
	}
	Start(){
		if(this.day){
			
		}
		this.start=true
	}
	Quit(){

	}
	Check(){
		
	}
}
class ProjectBundle{
	constructor(){
		//data load
		this.storageName="projects"
		let temp=JSON.parse(localStorage.getItem(storageName)??"{}")
		this.data={}
		Object.keys(temp).map((name)=>{
			this.data[name]=new Project(name,temp[name])
		})
		// this.data=JSON.parse(localStorage.getItem(storageName)??"{}")
	}
	GetProject(prjName){
		return this.data[prjName]
	}
	IsExist(prjName){
		return (prjName in this.data)
	}
	Save(){
		localStorage.setItem(storageName,JSON.stringify(this.data))
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
}
const projectBundle=new ProjectBundle()
export default projectBundle