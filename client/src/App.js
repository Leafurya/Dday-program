import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
import {createBrowserHistory} from 'history';


import {GetTime,UpdateOldDate,InitDate,IsNextDay} from './module/TimeModule.js'
import {UpdateData,DailyUpdateData} from './module/DataModule.js'
import {InitAttendance,UpdateAttendance,GetAttendance} from './module/AttendanceModule.js'
//let prjNames;

const storageName="projects";
const history=createBrowserHistory();

let intervalHandle;

function App() {
	let [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??"{}"));
	const [nowPage,setPage]=useState("");
	const [time,setTime]=useState(GetTime());
	//let oldPage;
	const PageCallbackFunc=(page,props)=>{
		switch(page){
			case "Lobby":
				setPage(<Lobby attendance={GetAttendance()} PageCallback={PageCallbackFunc} projects={data}></Lobby>);
				break;
			case "Project":
				console.log("name", props.name);
				setPage(<Project projectName={props.name} projectData={data[props.name]} SaveDataCallback={SaveDataCallbackFunc} QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} StartProjectCallback={StartProjectCallbackFunc}></Project>);
				break;
			case "Create":
				console.log("data", data);
				setPage(<Create QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} dataToModify={props} SaveDataCallback={CreatePrjCallbackFunc}></Create>)
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
		if(data[prjName].day==="DAY"){
			alert("프로젝트 재설정 부탁드립니다.");
		}
		else{
			if(!data[prjName].start){
				data[prjName].start=true;
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
	const NextDayCallbackFunc=()=>{
		let dateDelta=IsNextDay();
		if(dateDelta){
			console.log("next day",dateDelta);
			UpdateAttendance(dateDelta);
			for(let projectName in data){
				DailyUpdateData(data[projectName],dateDelta);
				console.log("data[projectName]",data[projectName]);
			}
			UpdateData(data,setData);
			UpdateOldDate(dateDelta);
		}
	}

	useEffect(()=>{
		InitDate();
		InitAttendance();
		
		if(intervalHandle==null){
			intervalHandle=setInterval(()=>{
				setTime(GetTime());
			},1000);
		}
		PageCallbackFunc("Lobby");
		history.listen((location)=>{
			if(history.action==="POP"){
				alert("뒤로가기");
			}
		})
	},[]);
	useEffect(()=>{
		NextDayCallbackFunc();
	},[nowPage]);
	// window.onpageshow=(event)=>{
	// 	if(event.persisted||(window.performance&&window.performance.navigation.type==2)){
	// 		alert("뒤로가기 입력")
	// 		event.preventdefault();
	// 	}
	// }
	if(nowPage!==""){
		return (
			<div className="App">
				{time}
				{nowPage}
				<div className="close_app">
					<input type="button" value="CLOSE" onClick={
						()=>{
							window.close();
						}
					}></input>
				</div>
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