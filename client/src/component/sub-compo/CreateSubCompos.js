import React,{useEffect} from 'react';
import {GetPickedDate,GetOldDate} from '../../module/TimeModule';
import Notice from '../../module/Notice.js';
import { CreateTaskInputCell, GetElement, GetTaskFromInput } from '../../module/CreateCompModule';
import { CreateDataObj } from '../../module/DataModule';
import projectBundle from '../../module/global/DataBundle';
import { useNavigate } from 'react-router-dom';

function DeleteBtn({prjName}){
	const navigate=useNavigate()
	return(
		<input className="function_btn" type="button" value="삭제" onClick={
			async()=>{
				if(await Notice.Confrim('프로젝트 삭제를 원하신다면 확인을 눌러주십시오.<br/>한번 삭제한 프로젝트는 복구가 불가능합니다.')==1){
					projectBundle.Quit(prjName)
					projectBundle.Save()
					Notice.Alert("프로젝트를 삭제하였습니다.");
					navigate(-2)
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
					
					date.setDate(Number(date.getDate())+Number(event.target.value))
					let year=date.getFullYear()
					let month=date.getMonth()+1
					let dateVal=date.getDate()
					document.querySelector("input[type=date]").value=year+"-"+(month<10?"0"+month:month)+"-"+(dateVal<10?"0"+dateVal:dateVal)
				}}></input>
				<div style={{position: "relative"}}>
					<input className="center_align_ab" disabled={props.defaultCheck=="plus"} type="date" id="date_picker" onChange={(event)=>{
						
						let dateDelta=GetPickedDate(event.target.value)-GetOldDate()
						console.log("date pick",GetPickedDate(event.target.value),GetOldDate(),dateDelta)
						if(dateDelta<=0){
							Notice.Alert("오늘보다 이후의 날짜만 선택 가능합니다.")
							return;
						}
						document.getElementById("prj_day").value=dateDelta;
					}}></input>
				</div>
			</span>
			
		</div>
	);
}
function InputTaskPart({id,name,tasks}){
	let perventionDuplication=1;
	
	useEffect(()=>{
		if(tasks){
			if(perventionDuplication===1){
				for(let taskKey in tasks){
					let inputCell=CreateTaskInputCell(name,taskKey)
					if(tasks[taskKey]){
						inputCell.input.disabled=true
						inputCell.delBtn.disabled=true
					}
					GetElement(id).appendChild(inputCell.div)
				}
				perventionDuplication++; 
			}
		}
	},[])
	
	return(
		<div className={'task_div '+name}>
			<label>
				<input type="text" placeholder='도전과제'></input>
				<input type="button" value="추가" onClick={(event)=>{
					let textInput=event.target.parentElement.childNodes[0]
					GetElement(id).appendChild(CreateTaskInputCell(name,textInput.value).div);
					textInput.value=""
					textInput.focus()
				}}></input>
			</label>
			<ul className="task_input_ul" id={id}>
			</ul>
		</div>
	);
}
function CreateBtn({dataToModify}){
	const navigate=useNavigate()
	return(
		<input className="function_btn" type="button" defaultValue="저장" onClick={()=>{
			let projectName=GetElement("prj_name").value;
			let discription=GetElement("prj_cntnt").value;
			let D=GetElement("D+").checked?"+":"-";
			let Day=(D=="+")?0:GetElement("prj_day").value;
			let tasks=GetTaskFromInput("task_input");
			let lastTasks=(D=="+")?null:GetTaskFromInput("last_task_input"); //if lastTasks not exist, value is null
			if(projectName.length<=0){
				Notice.Alert("프로젝트 이름이 비어있습니다.");
				return;
			}
			if(!tasks){
				Notice.Alert("도전과제가 비어있습니다.");
				return;
			}
			if(D==='-'&&Day===""){
				Notice.Alert("일 수가 비어있습니다.");
				return;
			}

			let data=CreateDataObj(discription,tasks,D,Day,lastTasks)
			if(dataToModify){
				projectBundle.Remove(dataToModify)
			}
			if(!projectBundle.Append(projectName,data)){
				Notice.Alert("같은 이름의 프로젝트가 존재합니다.");
				console.log("exist same project")
				return
			}
			projectBundle.Save()
			
			if(projectName===dataToModify){
				navigate(-1)
				return
			}
			navigate(`/Project?name=${projectName}`,{replace:true})
		}}></input>
	)
}

export {CreateBtn,DeleteBtn,TypeChoicePart,InputTaskPart};