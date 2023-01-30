import React, {useEffect,useState} from 'react';

function Project(props){
	console.log("data",props.projectData)
	let data=props.projectData;
	let taskEles=[];
	var eleID=0;
	const TaskCheck=(task,val)=>{
		data.tasks[task]=val;
	}
	for(var t in data.tasks){
		taskEles.push(
		<li key={eleID}>
			<input type="checkbox" id={"task"+eleID} defaultChecked={data.tasks[t]} value={t} onChange={(event)=>{
				console.log();
				TaskCheck(event.target.value,event.target.checked);
				console.log("data in project",data);
				props.SaveDataCallback();
			}}></input>
			<label htmlFor={"task"+eleID}>{t}</label>
		</li>)
		eleID++;
	}
	return(
		<div>
			<input type="button" value="lobby" onClick={()=>{props.PageCallback("Lobby")}}></input>
			<h1>{"D"+data.D+data.Day}</h1>
			<h2>{props.projectName}</h2>
			<h4>{data.cntnt}</h4>
			<ul>
			{taskEles}
			</ul>
		</div>
	)
}
export default Project;