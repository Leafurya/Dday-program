import { SendMessage } from "../../module/SendMessageModule";

function ClickTask(prjName,tasks,task,val){
	let done=true
	console.log(typeof(val),val)
	//tasks[task]=val
	SendMessage("set_tasks",[prjName,task,val])
	for(var t in tasks){
		if(!tasks[t]){
			done=false;
			break;
		}
	}
	SendMessage("set_data",[prjName,"taskDone",done])
}
function TaskItem(props){
	let eleID=props.index
	let tasks=props.tasks
	let task=props.task

	return(
		<li key={eleID}>
			<input className='when_start' type="checkbox" id={"task"+eleID} defaultChecked={tasks[task]} value={task} onChange={(event)=>{
				ClickTask(props.projectName,tasks,event.target.value,event.target.checked);
				if(event.target.checked){
					document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
					// props.PlusStat();
					SendMessage("set_stat",[props.projectName,"plus_checkedTaskCount"])
				}
				else{
					document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
					// props.MinusStat();
					SendMessage("set_stat",[props.projectName,"minus_checkedTaskCount"])
				}
				SendMessage("save_data")
			}}></input>
			<label className={(tasks[task]?" checked":"")} htmlFor={"task"+eleID}>{task}</label>
		</li>
	)
}
function TaskLists(props){
	const tasks=props.tasks;
	let lists=[];
	let index=0
	
	console.log("taskObj",tasks);
	for(var task in tasks){
		lists.push(<TaskItem projectName={props.projectName} index={index++} tasks={tasks} task={task} key={task}></TaskItem>)//TaskCheck={TaskCheck} checkedClassName={taskObj[task]?"checked":""} index={index}  taskChecked={taskObj[task]}
	}

	return lists;
}

export {TaskLists};