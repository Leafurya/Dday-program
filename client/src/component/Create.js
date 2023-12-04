import React, { useEffect, useRef } from 'react';
import "../style/BaseStyle.css";
import "../style/Create.css";
import "../style/Align.css";

import {DeleteBtn,InputTaskPart,TypeChoicePart,CreateBtn} from "./sub-compo/CreateSubCompos.js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import projectBundle, { Project } from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';
import { Confrim, toastRef } from './Notices.js';
import { GetElement, GetTaskFromInput } from '../module/CreateCompModule.js';
import { CreateDataObj } from '../module/DataModule.js';

function InspectSaveData(originData){
	let projectName=GetElement("prj_name").value;
	let discription=GetElement("prj_cntnt").value;
	let D=GetElement("prj_type").value
	let Day=(D==="+")?0:parseInt(GetElement("prj_day").value);
	let tasks=GetTaskFromInput("task_input");
	let lastTasks=(D==="+")?null:GetTaskFromInput("last_task_input"); //if lastTasks not exist, value is null
	let taskInputValue=GetElement("input_for_task").value
	let lasttaskInputValue=(GetElement("input_for_lasttask")?.value)??""
	console.log(`${projectName},${discription},${D},${Day},${tasks},${lastTasks}`)

	let data=CreateDataObj(discription,tasks,D,Day,lastTasks)
	let prj=new Project(projectName,data)
	console.log(JSON.stringify(prj))
	if(JSON.stringify(originData)!==JSON.stringify(prj)||taskInputValue!==""||lasttaskInputValue!==""){
		return true
	}

	return false
}

function Create({}){
	const [param,setParam]=useSearchParams()
	const notiCompo=useRef("")
	const historyPrevDup=useRef(true)
	const navigate=useNavigate()
	
	let prjName=param.get("name")
	const dataToModify=prjName?projectBundle.GetProject(prjName):new Project("",CreateDataObj("",null,"+",0,null))
	const isCreate=(dataToModify.name==="")
	

	if(historyPrevDup.current){
		// eslint-disable-next-line no-restricted-globals
		history.pushState({hello:1}, '', location.href)
		
		// eslint-disable-next-line no-restricted-globals
		console.log("create useeffect",historyPrevDup.current)
		historyPrevDup.current=false
	}
	switch(param.get("confirm")){
		case "delete":{
			notiCompo.current=<Confrim ResultCallback={(result)=>{
				if(result){
					projectBundle.Quit(prjName)
					projectBundle.Save()
					// Notice.Alert("프로젝트를 삭제하였습니다.");
					toastRef.SetMessage("프로젝트를 삭제하였습니다.")
					navigate(-3)
					// window.history.back()
				}
				else{
					window.history.back()
				}
			}}>정말로 프로젝트를<br/>삭제하겠습니까?</Confrim>
			break
		}
		case "save":{
			// window.onpopstate=()=>{}
			notiCompo.current=<Confrim ResultCallback={(result)=>{
				if(result){
					// projectBundle.Quit(prjName)
					// projectBundle.Save()
					// Notice.Alert("프로젝트를 삭제하였습니다.");
					navigate(-3)
					// window.history.back()
				}
				else{
					navigate(-1)
					// eslint-disable-next-line no-restricted-globals
					// history.pushState(null, '', location.href)
					// window.onpopstate=(e)=>{
					// 	console.log("popstate callback")
					// 	try{
					// 		if(InspectSaveData(dataToModify)){
					// 			if(prjName){
					// 				navigate(`/Create?name=${prjName}&confirm=save`)
					// 			}
					// 			else{
					// 				navigate(`/Create?confirm=save`)
					// 			}
					// 		}
					// 		else{
					// 			navigate(-1)
					// 		}
					// 	}catch(e){
					// 		console.log(e)
							
					// 	}
					// }
				}
			}}>{`프로젝트 ${isCreate?"생성":"수정"}을 취소하시겠습니까?`}</Confrim>
			break
		}
		default:{
			notiCompo.current=""
			break
		}	
	}
		// eslint-disable-next-line no-restricted-globals
	console.log(history.state)
	useEffect(()=>{
		// if(historyPrevDup.current){
		// 	// eslint-disable-next-line no-restricted-globals
		// 	history.pushState({hello:1}, '', location.href)
			
		// 	// eslint-disable-next-line no-restricted-globals
		// 	console.log("create useeffect",history)
		// 	historyPrevDup.current=false
		// }
		// eslint-disable-next-line no-restricted-globals
		// // eslint-disable-next-line no-restricted-globals
		// if(history.state===1){
		// // eslint-disable-next-line no-restricted-globals
		// 	history.pushState(null, '', location.href)
		// }
		// window.onpopstate=(e)=>{
		// 	console.log("popstate callback")
		// 	try{
		// 		if(InspectSaveData(dataToModify)){
		// 			if(prjName){
		// 				navigate(`/Create?name=${prjName}&confirm=save`)
		// 			}
		// 			else{
		// 				navigate(`/Create?confirm=save`)
		// 			}
		// 		}
		// 		else{
		// 			navigate(-1)
		// 		}
		// 	}catch(e){
		// 		console.log(e)
				
		// 	}
		// }
	},[])
	return(
		<div className="borad">
			<TopNavigator title={isCreate?"프로젝트 생성":"프로젝트 수정"}></TopNavigator>
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
					<textarea rows="5" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={dataToModify.discription} onKeyDown={(e)=>{
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
				<input className="function_btn" type="button" value="뒤로" onClick={()=>{
					if(InspectSaveData(dataToModify)){
						if(prjName){
							navigate(`/Create?name=${prjName}&confirm=save`)
						}
						else{
							navigate(`/Create?confirm=save`)
						}
					}
					else{
						navigate(-1)
					}
				}}></input>
				<CreateBtn modiPrjName={prjName}></CreateBtn>
				{dataToModify?<DeleteBtn prjName={prjName}></DeleteBtn>:""}
			</div>
			{
				notiCompo.current
			}
		</div>
	)
}
export default Create;