import React,{useRef,useEffect} from 'react';
import "../style/Create.css";
import "../style/Align.css";

function GetElement(id){
	return document.getElementById(id);
}
let taskInputID=0;
function CreateTaskInput(name,cntnt){
	let input=document.createElement("input");
	input.type="text";
	input.value=cntnt;
	input.name=name;
	return input;
}
function GetTaskInput(id,name,val){
	var cntnt=val??prompt("도전과제 내용을 적어주세요.");
	if(cntnt!=null){
		var div=document.createElement("div");
		div.classList="task_input_div";
		div.id=(taskInputID)+"task_input";

		var input=CreateTaskInput(name,cntnt)
		
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
	const modiData=props.modiData??null;
	const plusRef=useRef(null);
	const minRef=useRef(null);
	let taskInputs=[];
	let lastTaskInputs=[];
	let deleteBtn=<input className="function_btn" type="button" value="삭제" onClick={()=>{
		if(window.confirm('프로젝트 삭제를 원하신다면 확인을 눌러주십시오.\n한번 삭제한 프로젝트는 복구가 불가능합니다.')){
			props.QuitCallback(modiData.name);
			alert("프로젝트를 삭제하였습니다.");
			props.PageCallback("Lobby");
		}
	}}></input>;
	console.log("modiData",props.modiData);
	let t=1;
	useEffect(()=>{
		if(!modiData){
			plusRef.current.click();
		}
		else{
			modiData.data.D=="+"?plusRef.current.click():minRef.current.click();
			if(t===1){
				for(t in modiData.data.tasks){
					console.log("t",t);
					taskInputs.push(GetTaskInput("task_inputs","task_input",t))
				}
				console.log("taskInputs",taskInputs);
				for(t in modiData.data.lastTasks){
					console.log("t",t);
					lastTaskInputs.push(GetTaskInput("last_task_inputs","last_task_input",t))
				}
				console.log("lastTaskInputs",lastTaskInputs);
			}
		}
	},[]);
	return(
		<div className="borad">
			<h1 className="col_align_re">프로젝트 {modiData?"수정":"생성"}</h1>
			<input className="col_align_re" id="prj_name" type="text" placeholder="프로젝트 이름" defaultValue={modiData?modiData.name:""}></input>
			<textarea rows="5" className="col_align_re" id="prj_cntnt" placeholder="프로젝트 내용" defaultValue={modiData?modiData.data.cntnt:""}></textarea>
			<div className='col_align_re sub_div'>
				<div>
					<input className="add_task_btn col_align_re" type="button" value="도전과제 추가" onClick={()=>{
						GetTaskInput("task_inputs","task_input");
					}}></input>
					<ul className="task_input_ul" id="task_inputs">
						{taskInputs}
					</ul>
				</div>
			</div>
			<div className="col_align_re sub_div">
				<div className="col_align_re type_choice">
					<input ref={plusRef} id="D+" type="radio" value="D+" name="project_type" onClick={()=>{
						Disable(true);
					}}/>D+
					<input ref={minRef} id="D-" type="radio" value="D-" name="project_type" onClick={()=>{
						Disable(false);
					}}/>D-
					<input type="number" placeholder="일수" id="prj_day" defaultValue={modiData?modiData.data.Day:""}></input>
				</div>
				<div>
					<input className="add_task_btn col_align_re" id="last_task" type="button" value="최종 도전과제 추가" onClick={()=>{
						GetTaskInput("last_task_inputs","last_task_input");
					}}></input>
					<ul id="last_task_inputs" className="task_input_ul">
						{lastTaskInputs}
					</ul>
				</div>
			</div>
			<div className="bottom_padding"></div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="취소" onClick={()=>{props.PageCallback("Lobby")}}></input>
				<input className="function_btn" type="button" value={modiData?"저장":"생성"} onClick={()=>{
					if(modiData){
						props.QuitCallback(modiData.name);
					}
					let data={};
					let prjName=GetElement("prj_name").value;
					data[prjName]={};
					let prj=data[prjName];
					prj["cntnt"]=GetElement("prj_cntnt").value;
					prj["tasks"]={}

					GetTaskValue(prj["tasks"],"task_input");
					if(GetElement("D-").checked){
						prj["D"]="-";
						if(GetElement("prj_day").value==""){
							alert("일수를 입력해주세요");
							return;
						}
						prj["Day"]=GetElement("prj_day").value;
						prj["lastTasks"]={}
						GetTaskValue(prj["lastTasks"],"last_task_input");
					}
					else{
						prj["D"]="+";
						prj["Day"]=0;
					}
					prj["Start"]=false;
					prj["taskDone"]=false;
					prj["prjDone"]=false;
					prj["stat"]={
						taskCount:Object.keys(prj["tasks"]).length,
						checkedTaskCount:0
					};
					//console.log("data",data);
					props.SaveDataCallback(data);
				}}></input>
				
				{modiData?deleteBtn:""}
			</div>
		</div>
	)
}
export default Create;