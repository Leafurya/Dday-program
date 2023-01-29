import React,{useRef,useEffect} from 'react';
function GetElement(id){
	return document.getElementById(id);
}
let taskInputID=0;
function GetTaskInput(id,name){
	var cntnt=prompt("도전과제 내용을 적어주세요.");
	if(cntnt!=null){
		var div=document.createElement("div");
		div.id=(taskInputID)+"task_input";

		var input=document.createElement("input");
		input.type="text";
		input.value=cntnt;
		input.name=name;
		

		var delBtn=document.createElement("input");
		delBtn.type="button";
		delBtn.value="-";
		delBtn.name=(taskInputID++)+"task_input";
		delBtn.onclick=(event)=>{
			GetElement(event.target.name).remove();
		}
		div.appendChild(input);
		div.appendChild(delBtn);

		GetElement(id).appendChild(div);
	}
}
function Disable(disabled){
	GetElement("prj_day").disabled=disabled;
	GetElement("last_task").disabled=disabled;
}
function GetTaskValue(obj,targetName){
	let tasks=document.getElementsByName(targetName);
	for(var i=0;i<tasks.length;i++){
		if(tasks[i].value!=""){
			obj[tasks[i].value]=false;
		}
	}
}

function Create(props){
	const inputRef=useRef(null);
	useEffect(()=>{
		inputRef.current.click();
	},[]);
	return(
		<div>
			<h1>프로젝트 생성</h1>
			<input id="prj_name" type="text" placeholder="프로젝트 이름"></input>
			<textarea id="prj_cntnt" placeholder="프로젝트 내용"></textarea>
			<div>
				<ul id="task_inputs">
					<input type="button" value="도전과제 추가" onClick={()=>{
						GetTaskInput("task_inputs","task_input");
					}}></input>
				</ul>
			</div>
			<div>
				<input ref={inputRef} id="D+" type="radio" value="D+" name="project_type" onClick={()=>{
					Disable(true);
				}}/>D+
				<input id="D-" type="radio" value="D-" name="project_type" onClick={()=>{
					Disable(false);
				}}/>D-
				<input type="number" placeholder="일수" id="prj_day"></input>
				<ul id="last_task_inputs">
					<input id="last_task" type="button" value="최종 도전과제 추가" onClick={()=>{
						GetTaskInput("last_task_inputs","last_task_input");
					}}></input>
				</ul>
			
				
			</div>
			<div>
				<input type="button" value="취소" onClick={()=>{props.PageCallback("Lobby")}}></input>
				<input type="button" value="생성" onClick={()=>{
					let data={};
					let prjName=GetElement("prj_name").value;
					data[prjName]={};
					let prj=data[prjName];
					prj["cntnt"]=GetElement("prj_cntnt").value;
					prj["tasks"]={}

					GetTaskValue(prj["tasks"],"task_input");
					prj["D"]=GetElement("D+").checked?"+":"-";
					if(GetElement("D-").checked){
						if(GetElement("prj_day").value==""){
							alert("일수를 입력해주세요");
							return;
						}
						prj["Day"]=GetElement("prj_day").value;
						prj["lastTasks"]={}
						GetTaskValue(prj["lastTasks"],"last_task_input");
					}
					//console.log("data",data);
					props.DataSendCallback(data);
				}}></input>
			</div>
		</div>
	)
}
export default Create;