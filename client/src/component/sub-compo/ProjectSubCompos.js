// import { SendMessage } from "../../module/SendMessageModule";
import { findAllByTestId } from "@testing-library/react";
import projectBundle from "../../module/global/DataBundle";

// function ClickTask(prjName,tasks,task,val){
// 	let done=true
// 	console.log(typeof(val),val)
// 	//tasks[task]=val
// 	SendMessage("set_tasks",[prjName,task,val])
// 	for(var t in tasks){
// 		if(!tasks[t]){
// 			done=false;
// 			break;
// 		}
// 	}
// 	SendMessage("set_data",[prjName,"taskDone",done])
// }
// function TaskItem({index,tasks,task,projectName}){

// 	return(
// 		<li key={index}>
// 			<input className='when_start' type="checkbox" id={"task"+index} defaultChecked={tasks[task]} value={task} onChange={(event)=>{
// 				ClickTask(projectName,tasks,event.target.value,event.target.checked);
// 				if(event.target.checked){
// 					document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
// 					// PlusStat();
// 					SendMessage("set_stat",[projectName,"plus_checkedTaskCount"])
// 				}
// 				else{
// 					document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
// 					// MinusStat();
// 					SendMessage("set_stat",[projectName,"minus_checkedTaskCount"])
// 				}
// 				SendMessage("save_data")
// 			}}></input>
// 			<label className={(tasks[task]?" checked":"")} htmlFor={"task"+index}>{task}</label>
// 		</li>
// 	)
// }
function TaskLists({project}){
	let lists=[];
	let tasks=project.GetNowTasks()
	console.log("taskObj",tasks);
	Object.keys(tasks).map((task,index)=>{
		lists.push(
			<li key={index}>
				<input className='when_start' type="checkbox" id={"task"+index} defaultChecked={tasks[task]} value={task} onChange={(event)=>{
					project.taskDone=tasks.Set(task,event.target.checked)
					// ClickTask(projectName,tasks,event.target.value,event.target.checked);
					if(event.target.checked){
						document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
						project.stat.checkedTaskCount++
						// PlusStat();
						// SendMessage("set_stat",[projectName,"plus_checkedTaskCount"])
					}
					else{
						document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
						project.stat.checkedTaskCount--
						// MinusStat();
						// SendMessage("set_stat",[projectName,"minus_checkedTaskCount"])
					}
					projectBundle.Save()
					// SendMessage("save_data")
				}}></input>
				<label className={(tasks[task]?" checked":"")} htmlFor={"task"+index}>{task}</label>
			</li>
		)
	})

	return lists;
}

export {TaskLists};