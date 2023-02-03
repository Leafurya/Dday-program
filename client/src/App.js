import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
//let prjNames;

const storageName="projects";
let oldDate;
let intervalHandle=null;
function GetDay(){
	return Math.floor(Date.now()/86400000);//86400000
}
function UpdateData(data,setData){
	localStorage.setItem(storageName,JSON.stringify(data));
	setData(data);
}
function App() {
	let [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??"{}"));
	const [nowPage,setPage]=useState("");
	//let oldPage;
	const PageCallbackFunc=(page,props)=>{
		//let data=tempData;
		// console.log("page callback data",data);
		// console.log("props",props);
		
		switch(page){
			case "Lobby":
				setPage(<Lobby PageCallback={PageCallbackFunc} projects={data}></Lobby>);
				break;
			case "Project":
				console.log("name", props.name);
				setPage(<Project projectName={props.name} projectData={data[props.name]} SaveDataCallback={SaveDataCallbackFunc} QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} StartProjectCallback={StartProjectCallbackFunc}></Project>);
				break;
			case "Create":
				console.log("data", data);
				setPage(<Create QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} modiData={props} SaveDataCallback={CreatePrjCallbackFunc}></Create>)
				break;
			default:
				//setData("");
				break;
		}
	}
	const QuitCallbackFunc=(prjName)=>{
		console.log(data);
		delete data[prjName];
		console.log(data);
		UpdateData(data,setData);
	}
	const StartProjectCallbackFunc=(prjName)=>{
		if(data[prjName].Day=="DAY"){
			alert("프로젝트 재설정 부탁드립니다.");
		}
		else{
			if(!data[prjName].Start){
				data[prjName].Start=true;
				UpdateData(data,setData)
				alert(prjName+"프로젝트가 시작됐습니다.")
				PageCallbackFunc("Project",{name:prjName});
				return true;
			}
		}
		return false;
	}
	const CreatePrjCallbackFunc=(newPrj)=>{
		console.log(data);
		var name=Object.keys(newPrj)[0];
		console.log(name in data);
		if(!(name in data)){
			//var newData={...data};
			data[name]=newPrj[name];
			console.log("newdata",data);
			localStorage.setItem(storageName,JSON.stringify(data));
			PageCallbackFunc("Lobby");
		}
	}
	const SaveDataCallbackFunc=()=>{
		UpdateData(data,setData)
	}
	const InitProject=(prj)=>{
		console.log("init before",prj);
		prj.Day="DAY";
		prj.Start=false;
		let t;
		for(t in prj.tasks){
			prj.tasks[t]=false;
		}
		for(t in prj.lastTasks){
			prj.lastTasks[t]=false;
		}
		prj.prjDone=false;
		prj.taskDone=false;
		console.log("init after",prj);
	}
	const NextDayCallbackFunc=()=>{
		let today=GetDay();
		console.log("today",today);
		console.log("oldDate",oldDate);
		if(oldDate!=today){
			let d;
			let task;
			for(var prj in data){
				d=data[prj];
				if(d.Start){
					console.log("prj",prj);
					switch(d.D){
						case "+":
							d.Day+=(today-oldDate);
							task=d.tasks;
							break;
						case "-":
							if(d.Day>0){
								d.Day-=(today-oldDate);
								task=d.tasks;
							}
							if(d.Day==0){
								d.Day="DAY";
								task=Object.keys(data.lastTasks).length>0?d.lastTasks:d.tasks;
							}
							else if(d.Day<0||d.Day=="DAY"){
								InitProject(d);
								d.prjDone=true;
							}
							// if(d.Day<=0){
							// 	if(d.Day==="DAY"){
							// 		InitProject(d);
							// 		d.prjDone=true;
							// 	}
							// 	else{
							// 		d.Day="DAY";
							// 		task=d.lastTasks;
							// 	}
							// }
							break;
					}
					for(var t in task){
						task[t]=false;
					}
					d.taskDone=false;
				}
				
			}
			UpdateData(data,setData)
			oldDate=today;
			localStorage.setItem("oldDate",oldDate);
		}
	}
	useEffect(()=>{
		oldDate=localStorage.getItem("oldDate");
		console.log("oldDate",oldDate);
		if(oldDate==null){
			oldDate=GetDay();
			localStorage.setItem("oldDate",oldDate);
		}
		//console.log("intervalHandle",intervalHandle);
		
		// if(intervalHandle==null){
		// 	intervalHandle=setInterval(()=>{
		// 		NextDayCallbackFunc()
		// 	},1000);
		// }
		PageCallbackFunc("Lobby");
	},[]);
	useEffect(()=>{
		NextDayCallbackFunc();
	},[nowPage]);
	if(nowPage!=""){
		return (
			<div className="App">
				{nowPage}
			</div>
		);
	}
    else{
		return(
			<div>
				Loading...
			</div>
		)
	}
}

export default App;