function UpdateData(data,setData){
	localStorage.setItem("projects",JSON.stringify(data));
	setData(data);
}
function CreateDataObj(projectName,projectDiscription,tasks,D,Day,lastTasks){
	let headData={};
	let data={
		"discription":projectDiscription,
		"tasks":tasks,
		"D":D,
		"day":Day,
		"start":false,
		"taskDone":false,
		"prjDone":false,
	}
	headData[projectName]=data;
	if(lastTasks){
		data.lastTasks=lastTasks
	}
	if(D==="+"){
		data.stat={
			taskCount:Object.keys(tasks).length,
			checkedTaskCount:0
		}
	}
	return headData;
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
function DailyUpdateData(projectData,dateDelta){
	let taskToInit;
	if(projectData.start){
		switch(projectData.D){
			case "+":
				projectData.day+=dateDelta;
				taskToInit=projectData.tasks;
				break;
			case "-":
				if(projectData.day>0){
					projectData.day-=dateDelta;
					taskToInit=projectData.tasks;
				}
				if(projectData.day===0){
					projectData.day="DAY";
					taskToInit=projectData?.lastTasks?projectData.lastTasks:projectData.tasks;
				}
				else if(projectData.day<0||projectData.day==="DAY"){
					ResetData(projectData);
					return;
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
	}
}

module.exports.CreateDataObj=CreateDataObj;
module.exports.UpdateData=UpdateData;
module.exports.DailyUpdateData=DailyUpdateData;