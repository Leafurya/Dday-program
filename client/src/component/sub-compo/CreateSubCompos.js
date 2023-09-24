import React,{useEffect,useState} from 'react';
import {GetPickedDate,GetOldDate} from '../../module/TimeModule';
import Notice from '../../module/Notice.js';
import { SendMessage } from '../../module/SendMessageModule';

function DeleteBtn(props){
	return(
		<input className="function_btn" type="button" value="삭제" onClick={
			async()=>{
				if(await Notice.Confrim('프로젝트 삭제를 원하신다면 확인을 눌러주십시오.<br/>한번 삭제한 프로젝트는 복구가 불가능합니다.')==1){
					// props.QuitCallback(props.dataToModify.name);
					SendMessage("quit_project",props.dataToModify)
					Notice.Alert("프로젝트를 삭제하였습니다.");
					//alert("프로젝트를 삭제하였습니다.");
					// props.PageCallback("Lobby");
					// SendMessage("change_page",["Lobby"])
					window.history.go(-1)
				}
			}
		}></input>
	)
}
function DisableInput(val){
	document.getElementById("prj_day").disabled=val;
	if(val){
		document.querySelector(".last_task_input").classList.add("disabled")
		document.querySelector(".type_choice > span").classList.add("disabled_background")
	}
	else{
		document.querySelector(".last_task_input").classList.remove("disabled")
		document.querySelector(".type_choice > span").classList.remove("disabled_background")
	}
	document.getElementById("date_picker").disabled=val;
}
function TypeChoicePart(props){
	useEffect(()=>{
		if(props.defaultCheck=="+"){
			DisableInput(true);
		}
	},[])
	return(
		<div className="type_choice">
			<input defaultChecked={props.defaultCheck=="+"} id="D+" type="radio" value="D+" name="project_type" onClick={(event)=>{
				DisableInput(true);
			}}/>
			<label htmlFor='D+'>
				D+
			</label>
			<input defaultChecked={props.defaultCheck=="-"} id="D-" type="radio" value="D-" name="project_type" onClick={(event)=>{
				DisableInput(false);
			}}/>
			<label htmlFor='D-'>
				D-
			</label>
			<span>
				<input disabled={props.defaultCheck=="plus"} type="number" placeholder="일수" id="prj_day" defaultValue={props.day?props.day:""} onChange={(event)=>{
					let date=new Date()
					//console.log("event.target.value",Number(date.getDate())+Number(event.target.value))
					date.setDate(Number(date.getDate())+Number(event.target.value))
					let year=date.getFullYear()
					let month=date.getMonth()+1
					let dateVal=date.getDate()
					document.querySelector("input[type=date]").value=year+"-"+(month<10?"0"+month:month)+"-"+(dateVal<10?"0"+dateVal:dateVal)
				}}></input>
				<div style={{position: "relative"}}>
					<input className="center_align_ab" disabled={props.defaultCheck=="plus"} type="date" id="date_picker" onChange={(event)=>{
						//console.log("date pick",event.target.value);
						let dateDelta=GetPickedDate(event.target.value)-GetOldDate()
						if(dateDelta<=0){
							Notice.Alert("오늘보다 이후의 날짜만 선택 가능합니다.")
							// alert("오늘보다 이후의 날짜만 선택 가능합니다.")
							return;
						}
						document.getElementById("prj_day").value=dateDelta;
					}}></input>
				</div>
			</span>
			
		</div>
	);
}
function InputTaskPart(props){
	let perventionDuplication=1;
	let taskInputs=[];
	let CreateTaskInputCell=props.CreateTaskInputCell;
	let GetElement=props.GetElement;
	console.log("InputTaskPart props",props);
	useEffect(()=>{
		if(props?.tasks){
			if(perventionDuplication===1){
				for(let taskKey in props.tasks){
					console.log("CreateTaskInputCell(props.name,taskKey)",CreateTaskInputCell(props.name,taskKey));
					GetElement(props.id).appendChild(CreateTaskInputCell(props.name,taskKey))
				}
				perventionDuplication++; 
			}
		}
	},[])
	
	return(
		<div className={'task_div '+props.name}>
			<label>
				<input type="text" placeholder='도전과제'></input>
				<input type="button" value="추가" onClick={(event)=>{
					let textInput=event.target.parentElement.childNodes[0]
					GetElement(props.id).appendChild(CreateTaskInputCell(props.name,textInput.value));
					textInput.value=""
					textInput.focus()
				}}></input>
			</label>
			{/* <input id={props.id+"_add_btn"} className="add_task_btn" type="button" value={props.value} onClick={async()=>{
				GetElement(props.id).appendChild(CreateTaskInputCell(props.name,await Notice.Prompt("도전과제 내용을 적어주세요.")));
				//GetTaskInput("task_inputs","task_input");
			}}></input> */}
			<ul className="task_input_ul" id={props.id}>
				{console.log("return taskInputs",taskInputs)}
			</ul>
		</div>
	);
}
function CreateBtn(props){
	let dataToModify=props.dataToModify;
	return(
		<input className="function_btn" type="button" defaultValue="저장" onClick={()=>{
			if(dataToModify){
				// props.QuitCallback(dataToModify);
				SendMessage("quit_project",dataToModify)
			}
			let projectName=props.GetElement("prj_name").value;
			let discription=props.GetElement("prj_cntnt").value;
			let D=props.GetElement("D+").checked?"+":"-";
			let Day=(D=="+")?0:props.GetElement("prj_day").value;
			let tasks=props.GetTaskFromInput("task_input");
			let lastTasks=(D=="+")?null:props.GetTaskFromInput("last_task_input"); //if lastTasks not exist, value is null
			if(projectName.length<=0){
				Notice.Alert("프로젝트 이름이 비어있습니다.");
				//alert("프로젝트 이름이 비어있습니다.");
				return;
			}
			if(!tasks){
				Notice.Alert("도전과제가 비어있습니다.");
				//alert("도전과제가 비어있습니다.");
				return;
			}
			if(D==='-'&&Day===""){
				Notice.Alert("일 수가 비어있습니다.");
				// alert("일 수가 비어있습니다.");
				return;
			}

			let data=props.CreateDataObj(discription,tasks,D,Day,lastTasks)
			console.log("new create data",data);
			SendMessage("append_project",{name:projectName,data:data})
			// props.SaveDataCallback(data);
			// props.PageCallback("Lobby");
		}}></input>
	)
}

export {CreateBtn,DeleteBtn,TypeChoicePart,InputTaskPart};