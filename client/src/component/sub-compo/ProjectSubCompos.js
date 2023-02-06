
function TaskItem(props){
	let eleID=props.index;
	return(
		<li key={eleID}>
			<input className='when_start' type="checkbox" id={"task"+eleID} defaultChecked={props.taskChecked} value={props.taskValue} onChange={(event)=>{
				props.TaskCheck(event.target.value,event.target.checked);
				if(event.target.checked){
					document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
					props.PlusStat();
				}
				else{
					document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
					props.MinusStat();
				}
				props.SaveDataCallback();
			}}></input>
			<label className={'col_align_re '+props.checkedClassName} htmlFor={"task"+eleID}>{props.taskValue}</label>
		</li>
	)
}
function TaskLists(props){
	let data=props.project;
	let index=0;
	let lists=[];
	let taskObj=data.tasks;
	const TaskCheck=(task,val)=>{
		let done=true;
		taskObj[task]=val;
		for(var t in taskObj){
			if(!taskObj[t]){
				done=false;
				break;
			}
		}
		if(done){
			data.taskDone=true;
		}
	}
	const MinusStat=()=>{
		if(data?.stat){
			data.stat.checkedTaskCount--;
		}
	}
	const PlusStat=()=>{
		if(data?.stat){
			data.stat.checkedTaskCount++;
		}
	}
	if(data.day=="DAY"&&Object.keys(data?.lastTasks)?.length!=0){
		taskObj=data.lastTasks;
	}
	console.log("taskObj",taskObj);
	for(var task in taskObj){
		lists.push(<TaskItem key={index} PlusStat={PlusStat} MinusStat={MinusStat} SaveDataCallback={props.SaveDataCallback} TaskCheck={TaskCheck} checkedClassName={taskObj[task]?"checked":""} index={index} taskValue={task} taskChecked={taskObj[task]}></TaskItem>)
		index++;
	}

	return lists;
}

export {TaskLists};