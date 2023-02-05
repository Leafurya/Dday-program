import React, {useEffect,useState} from 'react';
import "../style/Project.css";
import "../style/Align.css";

function Project(props){
	const [refresh,pageUpdate]=useState();
	console.log("project comp data",props.projectData)
	const data=props.projectData;
	let checkedClassName="";
	let taskEles=[];
	let nowTask=data.tasks;
	var eleID=0;
	const TaskCheck=(task,val)=>{
		let done=true;
		nowTask[task]=val;
		for(var t in nowTask){
			if(!nowTask[t]){
				done=false;
				break;
			}
		}
		if(done){
			data.taskDone=true;
		}
	}
	//console.log("data.lastTasks.length",data.lastTasks.length);
	if(data.Day=="DAY"&&Object.keys(data?.lastTasks).length!=0){
		nowTask=data.lastTasks;
	}
	for(var t in nowTask){
		checkedClassName="";
		if(nowTask[t]){
			checkedClassName="checked";
		}
		taskEles.push(
		<li key={eleID}>
			<input className='when_start' type="checkbox" id={"task"+eleID} defaultChecked={nowTask[t]} value={t} onChange={(event)=>{
				TaskCheck(event.target.value,event.target.checked);
				if(event.target.checked){
					document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
					data.stat.checkedTaskCount++;
				}
				else{
					document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
					data.stat.checkedTaskCount--;
				}
				console.log("data in project",data);
				props.SaveDataCallback();
			}}></input>
			<label className={'col_align_re '+checkedClassName} htmlFor={"task"+eleID}>{t}</label>
		</li>)
		eleID++;
		console.log("for(var t in nowTask) in project comp",data);
	}
	useEffect(()=>{
		for(var i=0,ele=document.querySelectorAll(".when_start");i<ele.length;i++){
			ele[i].disabled=!data.Start;
		}
		for(var i=0,ele=document.querySelectorAll(".when_ready");i<ele.length;i++){
			ele[i].disabled=data.Start;
		}
		if(data.prjDone){
			alert("프로젝트가 끝났습니다! 이제 프로젝트 설정을 변경하거나 프로젝트를 제거 할 수 있습니다.\n 수고하셨습니다!");
			data.prjDone=false;
		}
		console.log(taskEles);
	},[refresh])
	return(
		<div>
			<div className={"project_board "+(data.Start?"":"not_start_in_prjcomp")}>
				<div><h1 className="col_align_re project_day">{"D"+data.D+data.Day}</h1></div>
				<div><h2 className="col_align_re project_header">{props.projectName}</h2></div>
				<div><h4 className="col_align_re project_content">{data.cntnt}</h4></div>
				<ul>
				{taskEles}
				</ul>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="로비" onClick={()=>{props.PageCallback("Lobby")}}></input>
				<input className="when_start function_btn" type="button" value="포기" onClick={()=>{
					let str=prompt('프로젝트 포기를 원하신다면 "포기하겠습니다"를 적고 확인을 눌러주십시오.\n한번 포기한 프로젝트는 복구가 불가능합니다.');
					console.log(str,str=="포기하겠습니다");
					if(str=="포기하겠습니다"){
						
						props.QuitCallback(props.projectName);
						alert("프로젝트를 포기하셨습니다. 수고하셨습니다.");
						props.PageCallback("Lobby");
					}
				}}></input>
				<input className="when_ready function_btn" type="button" value="수정" onClick={()=>{
					props.PageCallback("Create",{name:props.projectName,data:data});
				}}></input>
				<input className="when_ready function_btn" type="button" value="시작" onClick={()=>{
					if(props.StartProjectCallback(props.projectName)){
						pageUpdate({...refresh})
					}
				}}></input>
			</div>
		</div>
	)
}
export default Project;