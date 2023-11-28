import React from 'react';
import "../style/BaseStyle.css";
import "../style/Create.css";
import "../style/Align.css";

import {DeleteBtn,InputTaskPart,TypeChoicePart} from "./sub-compo/CreateSubCompos.js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';
import todoList from '../module/global/ToDo';
import { GetTaskFromInput } from '../module/CreateCompModule';
import Notice from '../module/Notice';
import { toastRef } from './Notices.js';

function CreateBtn(){
	return(
		<input className="function_btn" type="button" defaultValue="저장" onClick={()=>{
			
			let tasks=GetTaskFromInput("task_input");
			if(!tasks){
				// Notice.Alert("도전과제가 비어있습니다.");
				toastRef.SetMessage("할 일이 비어있습니다.")
				return;
			}
			// console.log("tasks",tasks)
			todoList.SetData(tasks)
			window.history.back()
		}}></input>
	)
}

export default ({})=>{
	return(
		<div className="borad">
			<TopNavigator title="오늘 할 일"></TopNavigator>
			<div className="main_platform">
				<InputTaskPart prj={{tasks:todoList.data}}></InputTaskPart>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="뒤로" onClick={()=>{window.history.back()}}></input>
				<CreateBtn></CreateBtn>
			</div>
		</div>
	)
}