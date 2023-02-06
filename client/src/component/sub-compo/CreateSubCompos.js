import React,{useEffect,useState} from 'react';

function DeleteBtn(props){
	return(
		<input className="function_btn" type="button" value="삭제" onClick={
			()=>{
				if(window.confirm('프로젝트 삭제를 원하신다면 확인을 눌러주십시오.\n한번 삭제한 프로젝트는 복구가 불가능합니다.')){
					props.QuitCallback(props.dataToModify.name);
					alert("프로젝트를 삭제하였습니다.");
					props.PageCallback("Lobby");
				}
			}
		}></input>
	)
}
function TypeChoicePart(props){
	return(
		<div className="col_align_re type_choice">
			<input defaultChecked={props.defaultCheck=="+"} id="D+" type="radio" value="D+" name="project_type" onClick={(event)=>{
				document.getElementById("prj_day").disabled=true;
			}}/>D+
			<input defaultChecked={props.defaultCheck=="-"} id="D-" type="radio" value="D-" name="project_type" onClick={(event)=>{
				document.getElementById("prj_day").disabled=false;
			}}/>D-
			<input disabled={props.defaultCheck=="plus"} type="number" placeholder="일수" id="prj_day" defaultValue={props.day?props.day:""}></input>
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
		<div>
			<input className="add_task_btn col_align_re" type="button" value={props.value} onClick={()=>{
				GetElement(props.id).appendChild(CreateTaskInputCell(props.name,prompt("도전과제 내용을 적어주세요.")));
				//GetTaskInput("task_inputs","task_input");
			}}></input>
			<ul className="task_input_ul" id={props.id}>
				{console.log("return taskInputs",taskInputs)}
			</ul>
		</div>
	);
}
function CreateBtn(props){
	let dataToModify=props.dataToModify;
	return(
		<input className="function_btn" type="button" defaultValue={dataToModify?"수정":"생성"} onClick={()=>{
			if(dataToModify){
				props.QuitCallback(dataToModify.name);
			}
			let projectName=props.GetElement("prj_name").value;
			let discription=props.GetElement("prj_cntnt").value;
			let tasks=props.GetTaskFromInput("task_input");
			let lastTasks=props.GetTaskFromInput("last_task_input"); //if lastTasks not exist, value is null
			let D=props.GetElement("D+").checked?"+":"-";
			let Day=(D=="+")?0:props.GetElement("prj_day").value;

			let data=props.CreateDataObj(projectName,discription,tasks,D,Day,lastTasks)
			console.log("new create data",data);
			props.SaveDataCallback(data);
			props.PageCallback("Lobby");
		}}></input>
	)
}

export {CreateBtn,DeleteBtn,TypeChoicePart,InputTaskPart};