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
					<textarea rows="1" className='input' id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""}></textarea>
					{/* <input id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""}></input> */}
					<TypeChoicePart prj={dataToModify}></TypeChoicePart>
					<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.discription:""}></textarea>
				</div>
				<div className='task_part'>
					<InputTaskPart prj={dataToModify}></InputTaskPart>
				</div>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="뒤로" onClick={()=>{window.history.back()}}></input>
				<CreateBtn dataToModify={prjName}></CreateBtn>
				{dataToModify?<DeleteBtn prjName={prjName}></DeleteBtn>:""}
			</div>
		</div>
	)
}
export default Create;