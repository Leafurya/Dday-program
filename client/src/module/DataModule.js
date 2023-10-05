const _nowDataVersion=1
const storageName="projects";
class Stat{
	constructor(taskCount){
		this.taskCount=taskCount
		this.checkedTaskCount=0
	}
}
class DPlus{
	constructor(day,discription,tasks){
		this.version=_nowDataVersion
		this.D="+"
		this.start=false
		this.tasks=tasks
		this.day=day
		this.discription=discription
		this.stat=new Stat(Object.keys(tasks).length)
		this.prjDone=false
		this.taskDone=false
	}
}
class DMinus{
	constructor(day,discription,tasks,lastTasks){
		this.version=_nowDataVersion
		this.D="-"
		this.start=false
		this.tasks=tasks
		this.day=day
		this.discription=discription
		this.stat=new Stat(Object.keys(tasks).length)
		this.prjDone=false
		this.taskDone=false

		if(lastTasks){
			this.lastTasks=lastTasks
		}
	}
}
function ChangeDataFormat(data){ //안씀
	let tData={...data}
	let result=data
	if(data.version!=_nowDataVersion){
		switch(data.version){
			default:
				switch(data.D){
					case "+":
						result=new DPlus(tData.day,tData.discription,tData.tasks)
						result.start=tData.start
						result.stat=tData.stat
						break;
					case "-":
						result=new DMinus(tData.day,tData.discription,tData.tasks,tData.lastTasks)
						result.start=tData.start
						result.stat=tData.stat
						result.prjDone=tData.prjDone
						break;
				}
				break
		}
	}
	return result
}
function LoadData(){ //안씀
	// const [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??{}));
	let data=JSON.parse(localStorage.getItem(storageName)??"{}")
	console.log("pre loaddata",data)
	// Object.keys(data).map((key)=>{
	// 	data[key]=ChangeDataFormat(data[key])
	// })
	localStorage.setItem("projects",JSON.stringify(data));
	console.log("LoadData",data)
	return data
}
function UpdateData(data){ //안씀
	localStorage.setItem("projects",JSON.stringify(data));
	console.log("update data",data)
	// setData(data);
}
// function CreateDataObj(projectName,projectDiscription,tasks,D,Day,lastTasks){
// 	let headData={};
// 	let data={
// 		"discription":projectDiscription,
// 		"tasks":tasks,
// 		"D":D,
// 		"day":Day,
// 		"start":false,
// 		"taskDone":false,
// 		"prjDone":false,
// 	}
// 	headData[projectName]=data;
// 	if(lastTasks){
// 		data.lastTasks=lastTasks
// 	}
// 	data.stat={
// 		taskCount:Object.keys(tasks).length,
// 		checkedTaskCount:0
// 	}
// 	return headData;
// }
function CreateDataObj(discription,tasks,D,day,lastTasks){
	let data
	switch(D){
		case "+":
			data=new DPlus(day,discription,tasks)
			break
		case "-":
			data=new DMinus(day,discription,tasks,lastTasks)
			break
	}
	console.log("CreateDataObj",data)
	return data
}
function ResetData(data){ //안씀
	data.day="DAY";
	data.start=false;
	let task;
	for(task in data.tasks){
		data.tasks[task]=false;
	}
	if(data?.lastTasks){
		for(task in data.lastTasks){
			data.lastTasks[task]=false;
		}
	}
	data.prjDone=true;
	data.taskDone=false;
}
	function GetTaskCount(tasks,dateDelta){
		let result=0;
		for(let t in tasks){
			result+=dateDelta;
			console.log("t",t);
		}
		return result;
	}
function DailyUpdateData(projectData,dateDelta){ //안씀
	let taskToInit;
	if(projectData.start){
		switch(projectData.D){
			case "+":
				projectData.day+=dateDelta;
				taskToInit=projectData.tasks;
				projectData.stat.taskCount+=GetTaskCount(projectData.tasks,dateDelta);
				break;
			case "-":
				if(projectData.day>0){
					projectData.day-=dateDelta;
					taskToInit=projectData.tasks;
				}
				if(projectData.day===0){
					projectData.day="DAY";
					taskToInit=projectData?.lastTasks?projectData.lastTasks:projectData.tasks;
					projectData.stat.taskCount+=GetTaskCount(projectData.lastTasks?projectData.lastTasks:projectData.tasks,dateDelta);
				}
				else if(projectData.day<0||projectData.day==="DAY"){
					if(projectData.day<0){
						projectData.stat.taskCount+=GetTaskCount(projectData.tasks,(dateDelta+projectData.day)-1);
						projectData.stat.taskCount+=GetTaskCount(projectData.lastTasks?projectData.lastTasks:projectData.tasks,1);
					}
					ResetData(projectData);
					return;
				}
				else{
					projectData.stat.taskCount+=GetTaskCount(projectData.tasks,dateDelta);
				}
				break;
			default:
				console.log("wrong input");
				break;
		}
		for(var t in taskToInit){
			taskToInit[t]=false;
		}
		projectData.taskDone=false;
		console.log("projectData.stat.taskCount",projectData.stat.taskCount);
	}
}

export{LoadData,CreateDataObj,UpdateData,DailyUpdateData}
