import projectBundle from "../../module/global/DataBundle";
import todoList from "../../module/global/ToDo";

function TaskLists({project}){
	let lists=[];
	let tasks=project.GetNowTasks()
	
	Object.keys(tasks).map((task,index)=>{
		lists.push(
			<li key={index}>
				<input className='when_start' type="checkbox" id={"task"+index} defaultChecked={tasks[task]} value={task} onChange={(event)=>{
					project.taskDone=tasks.Set(task,event.target.checked)
					if(event.target.checked){
						document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
						project.stat.checkedTaskCount++
					}
					else{
						document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
						project.stat.checkedTaskCount--
					}
					projectBundle.Save()
					todoList.Save()
				}}></input>
				<label className={(tasks[task]?" checked":"")} htmlFor={"task"+index}>{task}</label>
			</li>
		)
	})
	if(!lists.length){
		lists.push(<li key={0}>오늘 뭐하지?</li>)
	}

	return lists;
}

export {TaskLists};