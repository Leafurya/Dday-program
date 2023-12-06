import React,{useEffect, useRef, useState} from 'react';
import {GetPickedDate,GetOldDate} from '../../module/TimeModule';
import Notice from '../../module/Notice.js';
import { CreateTaskInputCell, GetElement, GetTaskFromInput, TaskInputCell, TextAreaKeyInput } from '../../module/CreateCompModule';
import { CreateDataObj } from '../../module/DataModule';
import projectBundle from '../../module/global/DataBundle';
import { useNavigate } from 'react-router-dom';

import "../../style/Template.css"
import TextInput from '../global/TextInput.js';
import { toastRef } from '../Notices.js';

function DeleteBtn({prjName}){
	const navigate=useNavigate()
	return(
		<input className="function_btn" type="button" value="삭제" onClick={
			()=>{
				navigate(`/Create?name=${prjName}&confirm=delete`)
			}
			// async()=>{
			// 	if(await Notice.Confrim('프로젝트 삭제를 원하신다면 확인을 눌러주십시오.<br/>한번 삭제한 프로젝트는 복구가 불가능합니다.')==1){
			// 		projectBundle.Quit(prjName)
			// 		projectBundle.Save()
			// 		Notice.Alert("프로젝트를 삭제하였습니다.");
			// 		navigate(-2)
			// 	}
			// }
		}></input>
	)
}
// function DisableInput(val){
// 	document.getElementById("prj_day").disabled=val;
// 	if(val){
// 		document.querySelector(".last_task_input").classList.add("disabled")
// 		document.querySelector(".type_choice > span").classList.add("disabled_background")
// 	}
// 	else{
// 		document.querySelector(".last_task_input").classList.remove("disabled")
// 		document.querySelector(".type_choice > span").classList.remove("disabled_background")
// 	}
// 	document.getElementById("date_picker").disabled=val;
// }
let shareVar={}
function TypeChoice({prj}){
	const tdDate=new Date();
	const today=`${tdDate.getFullYear()}-${tdDate.getMonth()+1}-${tdDate.getDate()}`
	const [data,setData]=useState({
		type:(prj?.D)??"+",
		day:(prj?.day)??0
	})
	let {type,day}=data
	useEffect(()=>{
		let dayInput=document.getElementById("prj_day")
		if(dayInput){
			dayInput.focus()
			dayInput.value=''
			dayInput.value=data.day
			if(data.day===0){
				document.querySelector("label[for=prj_day]").classList="empty"
			}
			else{
				document.querySelector("label[for=prj_day]").classList=""
			}
		}
	},[data])
	return(
		<div className='base_style day_pick'>
			<div>
				<h1>D</h1>
				<select defaultValue={type} className='base_style' name="type" id="prj_type" onChange={(e)=>{
					setData({...data,type:e.target.value})
					shareVar.InputTaskPart.setType(e.target.value)
				}}>
					<option vaule="+">+</option>
					<option vaule="-">-</option>
				</select>
				<span className='day_input'>
					{
						type==="+"?(
							<h1>0</h1>
						):(
							<span>
								<label htmlFor='prj_day'>
									{day}
								</label>
								<input className='base_style' type="number" id="prj_day" defaultValue={day} onChange={(event)=>{
									if(!Number(event.target.value)){
										document.querySelector("label[for=prj_day]").classList="empty"
									}
									else{
										document.querySelector("label[for=prj_day]").classList=""
									}

									let date=new Date()
									date.setDate(Number(date.getDate())+Number(event.target.value))
									let year=date.getFullYear()
									let month=date.getMonth()+1
									let dateVal=date.getDate()
									document.querySelector("input[type=date]").value=year+"-"+(month<10?"0"+month:month)+"-"+(dateVal<10?"0"+dateVal:dateVal)
									setData({...data,day:Number(event.target.value)})
									event.target.focus()
								}}></input>
							</span>
						)
					}
				</span>
			</div>
			{
				type==="+"?(
					<div>
					</div>
				):(
					<div>
						<input className='base_style' type="date" id="date_picker" defaultValue={today} onChange={(event)=>{
							let dateDelta=GetPickedDate(event.target.value)-GetOldDate()
							// console.log("date pick",GetPickedDate(event.target.value),GetOldDate(),dateDelta)
							if(dateDelta<=0){
								// Notice.Alert("오늘보다 이후의 날짜만 선택 가능합니다.")
								toastRef.SetMessage("오늘보다 이후의 날짜만 선택 가능합니다.")
								return;
							}
							setData({...data,day:dateDelta})
							// document.getElementById("prj_day").value=dateDelta;
						}}></input>
					</div>
				)
			}
		</div>
	)
}
// function TypeChoicePart(props){
// 	useEffect(()=>{
// 		if(props.defaultCheck=="+"){
// 			DisableInput(true);
// 		}
// 	},[])
// 	return(
// 		<div className="type_choice">
// 			<input defaultChecked={props.defaultCheck=="+"} id="D+" type="radio" value="D+" name="project_type" onClick={(event)=>{
// 				DisableInput(true);
// 			}}/>
// 			<label className='base_style' htmlFor='D+'>
// 				D+
// 			</label>
// 			<input defaultChecked={props.defaultCheck=="-"} id="D-" type="radio" value="D-" name="project_type" onClick={(event)=>{
// 				DisableInput(false);
// 			}}/>
// 			<label htmlFor='D-'>
// 				D-
// 			</label>
// 			<span>
// 				<input disabled={props.defaultCheck=="plus"} type="number" placeholder="일수" id="prj_day" defaultValue={props.day?props.day:""} onChange={(event)=>{
// 					let date=new Date()
					
// 					date.setDate(Number(date.getDate())+Number(event.target.value))
// 					let year=date.getFullYear()
// 					let month=date.getMonth()+1
// 					let dateVal=date.getDate()
// 					document.querySelector("input[type=date]").value=year+"-"+(month<10?"0"+month:month)+"-"+(dateVal<10?"0"+dateVal:dateVal)
// 				}}></input>
// 				<div style={{position: "relative"}}>
// 					<input className="center_align_ab" disabled={props.defaultCheck=="plus"} type="date" id="date_picker" onChange={(event)=>{
						
// 						let dateDelta=GetPickedDate(event.target.value)-GetOldDate()
// 						console.log("date pick",GetPickedDate(event.target.value),GetOldDate(),dateDelta)
// 						if(dateDelta<=0){
// 							Notice.Alert("오늘보다 이후의 날짜만 선택 가능합니다.")
// 							return;
// 						}
// 						document.getElementById("prj_day").value=dateDelta;
// 					}}></input>
// 				</div>
// 			</span>
			
// 		</div>
// 	);
// }
function InputTaskPart({prj}){
	const [type,setType]=useState((prj?.D)??"+")
	const [page,setPage]=useState(0) //0: 도전과제, 1: 최종 도전과제
	const data=useRef({
		tasks:(prj?.tasks)??{},
		lastTasks:(prj?.lastTasks)??{},
		perventionDuplication:1
	})
	let {tasks,lastTasks}=data.current
	shareVar.InputTaskPart={
		setType
	}
	useEffect(()=>{
		setPage(0)
	},[type])
	useEffect(()=>{
		// let {tasks,lastTasks}=data.current
		// if(data.current.perventionDuplication===1){
		// 	Object.keys(tasks).map((task)=>{
		// 		let inputCell=CreateTaskInputCell("task_input",task)
		// 		if(tasks[task]){
		// 			inputCell.input.disabled=true
		// 			inputCell.delBtn.disabled=true
		// 		}
		// 		GetElement("task_inputs").appendChild(inputCell.div)
		// 	})
		// 	Object.keys(lastTasks).map((task)=>{
		// 		let inputCell=CreateTaskInputCell("last_task_input",task)
		// 		if(lastTasks[task]){
		// 			inputCell.input.disabled=true
		// 			inputCell.delBtn.disabled=true
		// 		}
		// 		GetElement("last_task_inputs").appendChild(inputCell.div)
		// 	})
		// 	data.current.perventionDuplication++; 
		// }
	},[])
	return(
		<div className=''>
			<div className='task_tabmenu'>
				{
					type==="-"?(
						<>
							<input type="radio" defaultChecked={!page} name="menu" id="tabmenu1" onClick={()=>{
								setPage(0)
							}}/>
							<label style={!page?{backgroundColor:"#7965bd"}:{}} className='tab_radio_label' defaultChecked={page} htmlFor="tabmenu1">
								<span>할 일</span>
							</label>
							<input type="radio" name="menu" id="tabmenu2" onClick={()=>{
								setPage(1)
							}}/>
							<label style={page?{backgroundColor:"#7965bd"}:{}} className='tab_radio_label' htmlFor="tabmenu2">
								<span>최종 목표</span>
							</label>
						</>
					):(
						<>
							<input disabled type="radio" name="menu" id="tabmenu1" onClick={()=>{
								setPage(0)
							}}/>
							<label className='tab_radio_label' htmlFor="tabmenu1">할 일</label>
						</>
					)
				}
			</div>
			<div className='tab_cont'>
				<div style={!page?{}:{display:"none"}}>
					<label className='add_task'>
						<TextInput placeholder={'입력'} className={"input"} data={"task_input"} id="input_for_task"></TextInput>
						{/* <textarea className='input' placeholder='입력' rows="1" onKeyDown={TextAreaKeyInput}></textarea> */}
						{/* <input type="text" placeholder='입력'></input> */}
						<input type="button" value="+" onClick={(event)=>{
							let textInput=event.target.parentElement.childNodes[0]
							GetElement("task_inputs").appendChild(CreateTaskInputCell("task_input",textInput.value).div);
							// console.log(<TaskInputCell name="task_input" cntnt={textInput.value} disalbed={true}></TaskInputCell>)
							// GetElement("task_inputs").appendChild(<TaskInputCell name="task_input" cntnt={textInput.value} disalbed={true}></TaskInputCell>);
							textInput.value=""
							textInput.focus()
						}}></input>
					</label>
					<ul className="task_input_ul" id="task_inputs">
						{tasks?(
							Object.keys(tasks).map((task,index)=>{
								return <TaskInputCell key={index} name="task_input" cntnt={task} disabled={tasks[task]}></TaskInputCell>
							})
						):""}
					</ul>
				</div>
				<div style={page?{}:{display:"none"}}>
					<label className='add_task'>
						<TextInput  className='input' placeholder='입력' data={"last_task_input"} id="input_for_lasttask"></TextInput>
						{/* <textarea className='input' placeholder='입력' rows="1" onKeyDown={TextAreaKeyInput}></textarea> */}
						{/* <input type="text" placeholder='입력'></input> */}
						<input type="button" value="+" onClick={(event)=>{
							let textInput=event.target.parentElement.childNodes[0]
							GetElement("last_task_inputs").appendChild(CreateTaskInputCell("last_task_input",textInput.value).div);
							// GetElement("last_task_inputs").appendChild(<TaskInputCell name="last_task_input" cntnt={textInput.value} disalbed={true}></TaskInputCell>);
							textInput.value=""
							textInput.focus()
						}}></input>
					</label>
					<ul className="task_input_ul" id="last_task_inputs">
						{lastTasks?(
							Object.keys(lastTasks).map((task,index)=>{
								return <TaskInputCell key={index} name="last_task_input" cntnt={task} disalbed={lastTasks[task]}></TaskInputCell>
							})
						):""}
					</ul>
				</div>
			</div>
		</div>
	)
}
// function InputTaskPart({id,name,tasks}){
// 	let perventionDuplication=1;
	
// 	useEffect(()=>{
// 		if(tasks){
// 			if(perventionDuplication===1){
// 				for(let taskKey in tasks){
// 					let inputCell=CreateTaskInputCell(name,taskKey)
// 					if(tasks[taskKey]){
// 						inputCell.input.disabled=true
// 						inputCell.delBtn.disabled=true
// 					}
// 					GetElement(id).appendChild(inputCell.div)
// 				}
// 				perventionDuplication++; 
// 			}
// 		}
// 	},[])
	
// 	return(
// 		<div className={'task_div '+name}>
// 			<label>
// 				<input type="text" placeholder='도전과제'></input>
// 				<input type="button" value="추가" onClick={(event)=>{
// 					let textInput=event.target.parentElement.childNodes[0]
// 					GetElement(id).appendChild(CreateTaskInputCell(name,textInput.value).div);
// 					textInput.value=""
// 					textInput.focus()
// 				}}></input>
// 			</label>
// 			<ul className="task_input_ul" id={id}>
// 			</ul>
// 		</div>
// 	);
// }
function CreateBtn({modiPrjName,resultAction}){
	const navigate=useNavigate()
	return(
		<input className="function_btn" type="button" defaultValue="저장" onClick={()=>{
			let projectName=GetElement("prj_name").value;
			let discription=GetElement("prj_cntnt").value;
			let D=GetElement("prj_type").value
			let Day=(D==="+")?0:parseInt(GetElement("prj_day").value);
			let tasks=GetTaskFromInput("task_input");
			let lastTasks=(D==="+")?null:GetTaskFromInput("last_task_input"); //if lastTasks not exist, value is null
			let taskInputValue=GetElement("input_for_task").value
			let lasttaskInputValue=(GetElement("input_for_lasttask")?.value)??""

			if(taskInputValue!==""){
				toastRef.SetMessage("할 일의 입력칸을 비워주세요.")
				return
			}
			if(lasttaskInputValue!==""){
				toastRef.SetMessage("최종목표의 입력칸이 차있습니다.")
				return
			}

			if(projectName.length<=0){
				// Notice.Alert("프로젝트 이름이 비어있습니다.");
				toastRef.SetMessage("프로젝트 이름이 비어있습니다.")
				return;
			}
			if(!tasks){
				// Notice.Alert("도전과제가 비어있습니다.");
				toastRef.SetMessage("할 일이 비어있습니다.")
				return;
			}
			console.log("Day",typeof(Day))
			if(D==='-'&&Day===0){
				// Notice.Alert("일 수가 비어있습니다.");
				toastRef.SetMessage("일 수가 비어있습니다.")
				return;
			}

			let data=CreateDataObj(discription,tasks,D,Day,lastTasks)
			if(modiPrjName){
				projectBundle.Remove(modiPrjName)
			}
			if(!projectBundle.Append(projectName,data)){
				// Notice.Alert("같은 이름의 프로젝트가 존재합니다.");
				toastRef.SetMessage("같은 이름의 프로젝트가 존재합니다.")
				return
			}
			
			projectBundle.Save()
			
			// if(projectName===modiPrjName){
			// 	// navigate(-2)
			// 	return
			// }
			resultAction(projectName,projectName===modiPrjName)
			// navigate(-1)
			// navigate(`/Project?name=${projectName}`,{replace:true})
		}}></input>
	)
}
const TypeChoicePart=TypeChoice
export {CreateBtn,DeleteBtn,TypeChoicePart,InputTaskPart};