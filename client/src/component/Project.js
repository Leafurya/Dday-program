import React, {useEffect,useState} from 'react';
import "../style/Project.css";
import "../style/Align.css";

import {TaskLists} from './sub-compo/ProjectSubCompos.js';
import Notice from '../module/Notice.js';
import { SendMessage } from '../module/SendMessageModule';
import { useSearchParams } from 'react-router-dom';
import { StyledLink } from '../module/GlobalModule';

function Project(props){
	const [params,SetParams]=useSearchParams()
	const prjName=params.get('name')
	const [refresh,pageUpdate]=useState();
	const project=SendMessage("get_data",prjName)
	console.log("project comp data",project)
	let nowTasks=project.tasks
	
	if(project?.lastTasks){
		if(project.day==="DAY"&&Object.keys(project.lastTasks).length!==0){
			nowTasks=project.lastTasks;
		}
	}
	useEffect(()=>{
		for(var i=0,ele=document.querySelectorAll(".when_start");i<ele.length;i++){
			ele[i].disabled=!project.start;
		}
		for(var i=0,ele=document.querySelectorAll(".when_ready");i<ele.length;i++){
			ele[i].disabled=project.start;
		}
		if(project.prjDone){
			let stat=((project.stat.checkedTaskCount/project.stat.taskCount)*100).toFixed(1)+"%";
			//alert(stat+"의 성공률로 프로젝트가 끝났습니다! 이제 프로젝트 설정을 변경하거나 프로젝트를 제거 할 수 있습니다.\n 수고하셨습니다!");
			Notice.Alert(stat+"의 성공률로 프로젝트가 끝났습니다! 이제 프로젝트 설정을 변경하거나 프로젝트를 제거 할 수 있습니다.\n 수고하셨습니다!");
			// project.prjDone=false;
			SendMessage("set_data",[prjName,"prjDone",false])
		}
	},[refresh])
	console.log("refresh");
	return(
		<div className="borad">
			<div className={"project_board "+(project.start?"":"not_start_in_prjcomp")}>
				<div><h1 className="project_day">{"D"+project.D+project.day}</h1></div>
				<div><h2 className="project_header">{prjName}</h2></div>
				<div><h4 className="project_content">{project.discription}</h4></div>
				<ul>
				<TaskLists projectName={prjName} tasks={nowTasks}></TaskLists>
				</ul>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="로비" onClick={()=>{window.history.back()}}></input>
				<input className="when_start function_btn" type="button" value="포기" onClick={async()=>{
					let str=await Notice.Prompt('프로젝트 포기를 원하신다면<br/>"포기하겠습니다"<br/>를 적고 확인을 눌러주십시오.<br/>한번 포기한 프로젝트는 복구가 불가능합니다.');
					console.log(str,str=="포기하겠습니다");
					if(str=="포기하겠습니다"){
						//props.QuitCallback(prjName);
						SendMessage("quit_project",prjName)
						Notice.Alert("프로젝트를 포기하셨습니다. 수고하셨습니다.");
						//props.PageCallback("Lobby");
						// SendMessage("change_page",["Lobby"])
						window.history.back()
					}
				}}></input>
				<StyledLink to={`/Create?name=${prjName}`}>
					<input className="when_ready function_btn" type="button" value="수정" onClick={()=>{
						//props.PageCallback("Create",{name:prjName,data:project});
						// SendMessage("change_page",["Create",{name:prjName,data:project}])
					}}></input>
				</StyledLink>
				<input className="when_ready function_btn" type="button" value="시작" onClick={()=>{
					//if(props.StartProjectCallback(prjName)){
					if(SendMessage("start_project",prjName)){
						pageUpdate({...refresh})
					}
				}}></input>
			</div>
		</div>
	)
}
export default Project;