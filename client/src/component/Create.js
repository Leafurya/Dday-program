import React,{useRef,useEffect} from 'react';
function GetElement(id){
	return document.getElementById(id);
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
						//console.log(document.createElement("input[type='text'][value='"+cntnt+"']"));
						var cntnt=prompt("도전과제 내용을 적어주세요.");
						if(cntnt!=null){
							var input=document.createElement("input");
							input.type="text";
							input.value=cntnt;
							input.name="task_input";
							GetElement("task_inputs").appendChild(input);
						}
					}}></input>
				</ul>
			</div>
			<div>
				<input ref={inputRef} id="D+" type="radio" value="D+" name="project_type" onClick={()=>{
					GetElement("prj_day").disabled=true;
					GetElement("last_task").disabled=true;
				}}/>D+
				<input id="D-" type="radio" value="D-" name="project_type" onClick={()=>{
					GetElement("prj_day").disabled=false;
					GetElement("last_task").disabled=false;
				}}/>D-
				<input type="number" placeholder="일수" id="prj_day"></input>
				<ul id="last_task_inputs">
					<input id="last_task" type="button" value="최종 도전과제 추가" onClick={()=>{
						//console.log(document.createElement("input[type='text'][value='"+cntnt+"']"));
						var cntnt=prompt("도전과제 내용을 적어주세요.");
						if(cntnt!=null){
							var input=document.createElement("input");
							input.type="text";
							input.value=cntnt;
							input.name="last_task_input";
							GetElement("last_task_inputs").appendChild(input);
						}
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

					let tasks=document.getElementsByName("task_input");
					for(var i=0;i<tasks.length;i++){
						prj["tasks"][tasks[i].value]=false;
					}
					prj["D"]=GetElement("D+").checked?"+":"-";
					if(GetElement("D-").checked){
						prj["Day"]=GetElement("prj_day").value;
						tasks=document.getElementsByName("last_task_input");
						prj["LastTasks"]={}
						for(var i=0;i<tasks.length;i++){
							prj["LastTasks"][tasks[i].value]=false;
						}
					}
					console.log(data);
					if(!(prjName in props.prjs)){

						props.DataSendCallback(data){

						}
					}
				}}></input>
			</div>
		</div>
	)
}
export default Create;