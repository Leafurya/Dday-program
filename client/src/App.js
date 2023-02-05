import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
//let prjNames;

const storageName="projects";
let oldDate;
let delta;
let intervalHandle;

function GetTime(){
    var today=Date.now()+32400000
    var day=Math.floor(today/86400000)
    today-=(day*86400000)
    var hour=Math.floor(today/3600000)
    today-=(hour*3600000)
    var min=Math.floor(today/60000)
    today-=(min*60000)
    var sec=Math.floor(today/1000)
    
	return (""+day+"/"+hour+"/"+min+"/"+sec)
}
function GetDay(){
	let today=Date.now()+32400000;//now ms + 9hour ms
	return Math.floor(today/86400000);//86400000
}
function UpdateData(data,setData){
	localStorage.setItem(storageName,JSON.stringify(data));
	setData(data);
}
function App() {
	let [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??"{}"));
	const [nowPage,setPage]=useState("");
	const [time,setTime]=useState(GetTime());
	let attendance;
	//let oldPage;
	const PageCallbackFunc=(page,props)=>{
		//let data=tempData;
		// console.log("page callback data",data);
		// console.log("props",props);
		
		switch(page){
			case "Lobby":
				setPage(<Lobby attendance={attendance} PageCallback={PageCallbackFunc} projects={data}></Lobby>);
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
		delete data[prjName];
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
			attendance++;
			if((today-oldDate)>1){
				attendance=0;
			}
			localStorage.setItem("attendance",attendance);
			delta="next day";
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
								if(data.lastTasks){
									task=Object.keys(data.lastTasks).length>0?d.lastTasks:d.tasks;
								}
							}
							else if(d.Day<0||d.Day=="DAY"){
								InitProject(d);
								d.prjDone=true;
							}
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
		else{
			delta="-";
		}
	}
	useEffect(()=>{
		oldDate=localStorage.getItem("oldDate");
		console.log("localStorage",oldDate);
		if(oldDate==null){
			oldDate=GetDay();
			localStorage.setItem("oldDate",oldDate);
		}
		attendance=localStorage.getItem("attendance");
		if(attendance==null){
			attendance=0;
			localStorage.setItem("attendacne",0);
		}
		//NextDayCallbackFunc();
		// console.log("intervalHandle",intervalHandle);
		
		if(intervalHandle==null){
			intervalHandle=setInterval(()=>{
				setTime(GetTime());
			},1000);
		}
		PageCallbackFunc("Lobby");
	},[]);
	useEffect(()=>{
		NextDayCallbackFunc();
	},[nowPage]);
	if(nowPage!=""){
		return (
			<div className="App">
				
				{time}
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