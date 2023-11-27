import React, { useEffect, useRef } from 'react';
import "../style/BaseStyle.css";
import "../style/Create.css";
import "../style/Align.css";

import {DeleteBtn,InputTaskPart,TypeChoicePart,CreateBtn} from "./sub-compo/CreateSubCompos.js";
import { useSearchParams } from 'react-router-dom';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';
import { Confrim, toastRef } from './Notices.js';

function Create({}){
	const [param,setParam]=useSearchParams()
	const notiCompo=useRef("")

	let prjName=param.get("name")
	const dataToModify=prjName?projectBundle.GetProject(prjName):null
	useEffect(()=>{
		switch(param.get("confirm")){
			case "delete":{
				notiCompo.current=<Confrim ResultCallback={(result)=>{
					if(result){
						projectBundle.Quit(prjName)
						projectBundle.Save()
						// Notice.Alert("프로젝트를 삭제하였습니다.");
						toastRef.SetMessage("프로젝트를 삭제하였습니다.")
						// navigate(-2)
					}
				}}>정말로 프로젝트를 삭제하겠습니까?</Confrim>
				break
			}				
		}
	},[param])
	return(
		<div className="borad">
			<TopNavigator title={dataToModify?"프로젝트 수정":"프로젝트 생성"}></TopNavigator>
			<div className="main_platform">
				<div className='info_part'>
					<textarea rows="1" className='input' id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""} onKeyDown={(e)=>{
						if(e.key==="Enter"){
							try{
								document.getElementById("prj_day").focus()
							}catch(e){
								document.getElementById("prj_cntnt").focus()
							}
							e.preventDefault()
						}
					}}></textarea>
					{/* <input id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={prjName??""}></input> */}
					<TypeChoicePart prj={dataToModify}></TypeChoicePart>
					<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify?dataToModify.discription:""} onKeyDown={(e)=>{
						if(e.key==="Enter"){
							console.log('enter')
							document.querySelector(".add_task .input[name=task_input]").focus()
							e.preventDefault()
						}
					}}></textarea>
				</div>
				<div className='task_part'>
					<InputTaskPart prj={dataToModify}></InputTaskPart>
				</div>
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="뒤로" onClick={()=>{window.history.back()}}></input>
				<CreateBtn modiPrjName={prjName}></CreateBtn>
				{dataToModify?<DeleteBtn prjName={prjName}></DeleteBtn>:""}
			</div>
			{
				
			}
		</div>
	)
}
export default Create;