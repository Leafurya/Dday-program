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
					<TypeChoicePart prj={dataToModify}></TypeChoicePart>
					<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.discription:""}></textarea>
				</div>
				<div className='task_part'>
					<InputTaskPart prj={dataToModify}></InputTaskPart>
					{/* <div className='task_tabmenu'>
						<input type="radio" name="menu" id="tabmenu1" onClick={()=>{
							console.log("1")
						}}/>
						<label className='tab_radio_label' htmlFor="tabmenu1">menu1</label>
						<input type="radio" name="menu" id="tabmenu2" onClick={()=>{
							console.log("2")
						}}/>
						<label className='tab_radio_label' htmlFor="tabmenu2">menu2</label>
					</div>
					<input type="button" onClick={()=>{
						let ele=document.querySelectorAll("input[type=radio]")
						console.log(ele[0].checked)
						console.log(ele[1].checked)
					}}></input> */}
				</div>
				{/* <div class="tabmenu out-tabmenu">
					<ul>
						<li id="tab1" class="btnCon"> 
							<input type="radio" defaultChecked={true} name="tabmenu" id="tabmenu1" onClick={()=>{
								console.log("1 click")
							}}/>
							<label for="tabmenu1">menu1</label>
							<div class="tabCon" >
								
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
							
							</div>
							
						</li>
						<li id="tab2" class="btnCon">
							<input type="radio" name="tabmenu" id="tabmenu2" onClick={()=>{
								console.log("2 click")
							}}/>
							<label for="tabmenu2">menu2</label>
							<div class="tabCon" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>
							
						</li>
					</ul>
				</div> */}
				
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