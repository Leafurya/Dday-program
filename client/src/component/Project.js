import React, {useEffect,useState} from 'react';
import "../style/BaseStyle.css"
import "../style/Project.css";
import "../style/Align.css";

import {TaskLists} from './sub-compo/ProjectSubCompos.js';
import Notice from '../module/Notice.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';

function Project(props){
	const [param,setParam]=useSearchParams()
	const prjName=param.get('name')
	const [refresh,pageUpdate]=useState();
	const project=projectBundle.GetProject(prjName)
	const navigate=useNavigate()

	useEffect(()=>{
		if(project){
			for(var i=0,ele=document.querySelectorAll(".when_start");i<ele.length;i++){
				ele[i].disabled=!project.start;
			}
			for(var i=0,ele=document.querySelectorAll(".when_ready");i<ele.length;i++){
				ele[i].disabled=project.start;
			}
			if(project.prjDone){
				let stat=((project.stat.checkedTaskCount/project.stat.taskCount)*100).toFixed(1)+"%";
				Notice.Alert(stat+"의 성공률로 프로젝트가 끝났습니다! 이제 프로젝트 설정을 변경하거나 프로젝트를 제거 할 수 있습니다.\n 수고하셨습니다!");
				project.prjDone=false
				projectBundle.Save()
			}
		}
	},[refresh])

	if(!project){
		window.history.back()
		return
	}
	return(
		<div className="borad">
			<TopNavigator title="프로젝트"></TopNavigator>
			<div className={"main_platform project_board "+(project.start?"":"not_start_in_prjcomp")}>
				<div><h1 className="project_day">{"D"+project.D+project.GetDay()}</h1></div>
				<div><h2 className="project_header">{prjName}</h2></div>
				<div><h4 className="project_content">{project.discription}</h4></div>
				<ul>
					<TaskLists project={project}></TaskLists>
				</ul>
			</div>
			<div className="function_btns">
				<input className='function_btn' type="button" value="뒤로" onClick={()=>{
					window.history.back()
				}}></input>
				<input className="when_start function_btn" type="button" value="포기" onClick={async()=>{
					let str=await Notice.Prompt('프로젝트 포기를 원하신다면<br/>"포기하겠습니다"<br/>를 적고 확인을 눌러주십시오.<br/>한번 포기한 프로젝트는 복구가 불가능합니다.');
					if(str=="포기하겠습니다"){
						projectBundle.Quit(prjName)
						Notice.Alert("프로젝트를 포기하셨습니다. 수고하셨습니다.");
						window.history.back()
					}
				}}></input>
				<input className="when_ready function_btn" type="button" value="수정" onClick={()=>{
					navigate(`/Create?name=${prjName}`)
				}}></input>
				<input className="when_ready function_btn" type="button" value="시작" onClick={()=>{
					if(project.Start()){
						projectBundle.Save()
						Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
						pageUpdate({...refresh})
					}
					else{
						Notice.Alert("프로젝트 재설정 부탁드립니다.")
					}
				}}></input>
			</div>
		</div>
	)
}
export default Project;