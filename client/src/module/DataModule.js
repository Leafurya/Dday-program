class Stat{
	constructor(taskCount){
		this.taskCount=taskCount
		this.checkedTaskCount=0
	}
}
class DPlus{
	constructor(day,discription,tasks){
		this.version=1
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
		this.version=1
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
function ChangeDataFormat(data){
	let tData={...data}
	switch(data.D){
		case "+":
			data=new DPlus(tData.day,tData.discription,tData.tasks)
			data.start=tData.start
			data.stat=tData.stat
			break;
		case "-":
			data=new DMinus()
			break;
	}
}

function UpdateData(data,setData){
	localStorage.setItem("projects",JSON.stringify(data));
	setData(data);
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
function ResetData(data){
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
function DailyUpdateData(projectData,dateDelta){
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

module.exports.CreateDataObj=CreateDataObj;
module.exports.UpdateData=UpdateData;
module.exports.DailyUpdateData=DailyUpdateData;