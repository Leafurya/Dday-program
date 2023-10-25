import React from 'react';
import "../style/BaseStyle.css";
import "../style/Create.css";
import "../style/Align.css";

import {DeleteBtn,InputTaskPart,TypeChoicePart,CreateBtn} from "./sub-compo/CreateSubCompos.js";
import { useSearchParams } from 'react-router-dom';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';

function Create({}){
	const [param,setParam]=useSearchParams()

	let prjName=param.get("name")
	const dataToModify=prjName?projectBundle.GetProject(prjName):null
	return(
		<div className="borad">
			<TopNavigator title={dataToModify?"프로젝트 수정":"프로젝트 생성"}></TopNavigator>
			<div className="main_platform">
				<div className='info_part'>
					<input id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""}></input>
					<TypeChoicePart defaultCheck={dataToModify?dataToModify.D:"+"} day={dataToModify?.day}></TypeChoicePart>
					<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.discription:""}></textarea>
				</div>
				<div className='task_part'>
					<ul>

					</ul>
				</div>
			</div>
			{/* <div className="main_platform">
				<input id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""}></input>
				<div style={{height:"100px",width:"75%"}}>
					<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.discription:""}></textarea>
				</div>
				
				<TypeChoicePart defaultCheck={dataToModify?dataToModify.D:"+"} day={dataToModify?.day}></TypeChoicePart>
				
				<ul>
					<li id="tab1" class="btnCon"> 
						<input type="radio" checked name="tabmenu" id="tabmenu1"/>
						<label for="tabmenu1">menu1</label>
						<div class="tabCon" >
							<InputTaskPart value="도전과제 추가" name="task_input" id="task_inputs" tasks={dataToModify?.tasks}></InputTaskPart>
						</div>
					</li>
					<li id="tab2" class="btnCon"> 
						<input type="radio" checked name="tabmenu" id="tabmenu2"/>
						<label for="tabmenu2">menu1</label>
						<div class="tabCon" >
							<InputTaskPart value="최종 도전과제 추가" name="last_task_input" id="last_task_inputs" tasks={dataToModify?.lastTasks}></InputTaskPart>
						</div>
					</li>
				</ul>
				
			</div> */}
			<div className="function_btns">
				<input className="function_btn" type="button" value="뒤로" onClick={()=>{window.history.back()}}></input>
				<CreateBtn dataToModify={prjName}></CreateBtn>
				{dataToModify?<DeleteBtn prjName={prjName}></DeleteBtn>:""}
			</div>
		</div>
	)
}
export default Create;