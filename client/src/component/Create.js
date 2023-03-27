import React,{useRef,useEffect} from 'react';
import "../style/Create.css";
import "../style/Align.css";

import {CreateTaskInputCell,GetElement,GetTaskFromInput} from '../module/CreateCompModule.js';
import {DeleteBtn,InputTaskPart,TypeChoicePart,CreateBtn} from "./sub-compo/CreateSubCompos.js";
import {CreateDataObj} from "../module/DataModule";
import {GetPickedDate} from "../module/TimeModule";

function Create(props){
	const dataToModify=props.dataToModify??null;
	console.log("dataToModify",props.dataToModify);
	return(
		<div className="borad">
			<div className="main_platform">
				<h1 className="col_align_re">프로젝트 {dataToModify?"수정":"생성"}</h1>
				<input className="col_align_re" id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={dataToModify?dataToModify.name:""}></input>
				<textarea rows="5" className="col_align_re" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.data.discription:""}></textarea>
				<div className='col_align_re sub_div'>
				<InputTaskPart CreateTaskInputCell={CreateTaskInputCell} GetElement={GetElement} value="도전과제 추가" name="task_input" id="task_inputs" tasks={dataToModify?.data.tasks}></InputTaskPart>
				</div>
				<div className="col_align_re sub_div">
					<TypeChoicePart defaultCheck={dataToModify?dataToModify.data.D:"+"} day={dataToModify?.data.day}></TypeChoicePart>
					<InputTaskPart CreateTaskInputCell={CreateTaskInputCell} GetElement={GetElement} value="최종 도전과제 추가" name="last_task_input" id="last_task_inputs" tasks={dataToModify?.data.lastTasks}></InputTaskPart>
				</div>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="취소" onClick={()=>{props.PageCallback("Lobby")}}></input>
				<CreateBtn  QuitCallback={props.QuitCallback} PageCallback={props.PageCallback} dataToModify={dataToModify?.name} CreateDataObj={CreateDataObj} GetElement={GetElement} GetTaskFromInput={GetTaskFromInput} SaveDataCallback={props.SaveDataCallback}></CreateBtn>
				{dataToModify?<DeleteBtn  dataToModify={dataToModify} QuitCallback={props.QuitCallback} PageCallback={props.PageCallback}></DeleteBtn>:""}
			</div>
		</div>
	)
}
export default Create;