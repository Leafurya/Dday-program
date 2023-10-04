import React,{useRef,useEffect} from 'react';
import "../style/Create.css";
import "../style/Align.css";

import {CreateTaskInputCell,GetElement,GetTaskFromInput} from '../module/CreateCompModule.js';
import {DeleteBtn,InputTaskPart,TypeChoicePart,CreateBtn} from "./sub-compo/CreateSubCompos.js";
import {CreateDataObj} from "../module/DataModule";
import {GetPickedDate} from "../module/TimeModule";
import { SendMessage } from '../module/SendMessageModule';
import { useLocation,  useParams, useSearchParams } from 'react-router-dom';
import { StyledLink, compoManager } from '../module/GlobalModule';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';

function Create({}){
	const [param,setParam]=useSearchParams()

	console.log("param",param.get("name"))
	let prjName=param.get("name")
	const dataToModify=prjName?projectBundle.GetProject(prjName):null
	console.log("dataToModify",dataToModify);
	return(
		<div className="borad">
			<TopNavigator></TopNavigator>
			<div className="main_platform">
				<h1>프로젝트 {dataToModify?"수정":"생성"}</h1>
				<input id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""}></input>
				<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.discription:""}></textarea>
				{/* <div className='sub_div'> */}
					<InputTaskPart value="도전과제 추가" name="task_input" id="task_inputs" tasks={dataToModify?.tasks}></InputTaskPart>
				{/* </div> */}
				{/* <div className="sub_div"> */}
					<TypeChoicePart defaultCheck={dataToModify?dataToModify.D:"+"} day={dataToModify?.day}></TypeChoicePart>
					<InputTaskPart value="최종 도전과제 추가" name="last_task_input" id="last_task_inputs" tasks={dataToModify?.lastTasks}></InputTaskPart>
				{/* </div> */}
				<div style={{height: "50px"}}></div>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="취소" onClick={()=>{window.history.back()}}></input>
				<CreateBtn dataToModify={prjName}></CreateBtn>
				{dataToModify?<DeleteBtn prjName={prjName}></DeleteBtn>:""}
			</div>
		</div>
	)
}
export default Create;