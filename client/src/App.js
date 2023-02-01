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
	console.log("typeof",localStorage.getItem(storageName));
	let [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??"{}"));
	const [nowPage,setPage]=useState("");
	//let oldPage;
	const PageCallbackFunc=(page,props)=>{
		//let data=tempData;
		console.log("page callback data",data);
		console.log("props",props);
		
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
		if(!data[prjName].Start){
			data[prjName].Start=true;
			UpdateData(data,setData)
			alert(prjName+"프로젝트가 시작됐습니다.")
			PageCallbackFunc("Project",{name:prjName});
			return true;
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
	const NextDayCallbackFunc=()=>{
		let today=GetDay();
		console.log("today",today);
		if(oldDate!=today){
			let d;
			for(var prj in data){
				d=data[prj];
				if(d.Start){
					switch(d.D){
						case "+":
							d.Day+=(today-oldDate);
							break;
						case "-":
							d.Day-=(today-oldDate);
							break;
					}
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
		console.log("intervalHandle",intervalHandle);
		if(intervalHandle==null){
			intervalHandle=setInterval(()=>{
				NextDayCallbackFunc()
			},1000);
		}
		PageCallbackFunc("Lobby");
	},[]);
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