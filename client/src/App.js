import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import Notice from './module/Notice.js';
import React, {useCallback, useEffect,useMemo,useRef,useState} from "react";

import {UpdateOldDate,InitDate,IsNextDay,GetOldDate} from './module/TimeModule'
import {UpdateData,DailyUpdateData,LoadData} from './module/DataModule.js'
import {InitAttendance,UpdateAttendance} from './module/AttendanceModule.js'
import { SetSendMessage } from './module/SendMessageModule';
import { compoManager } from './module/GlobalModule';
import projectBundle, { InitBundle, ProjectBundle } from './module/global/DataBundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	
	
	// console.log("data",data)
	// const [nowPage,setPage]=useState("");
	
	// const QuitCallbackFunc=(prjName)=>{
	// 	delete data[prjName];
	// 	UpdateData(data);
	// }
	// const StartProjectCallbackFunc=(prjName)=>{
	// 	if(data[prjName].day==="DAY"){
	// 		//alert("프로젝트 재설정 부탁드립니다.");
	// 		Notice.Alert("프로젝트 재설정 부탁드립니다.")
	// 	}
	// 	else{
	// 		if(!data[prjName].start){
	// 			let tData={...data}
	// 			tData[prjName].start=true;
	// 			setData(tData)//setData(tData)
	// 			UpdateData(data)
	// 			Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
	// 			ChangePage("Project",prjName);
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }
	// const SendMessage=(msg,param)=>{
	// 	let tData
	// 	console.log("msg param",msg,param)
	// 	// console.log("SendMessage data",data)
	// 	switch(msg){
	// 		case "change_page":
	// 			let page=param[0]
	// 			let props=param[1]
	// 			// console.log("page",page,props)
	// 			// ChangePage(page,props)
	// 			console.log("change page is not used anymore")
	// 			break
	// 		case "get_data":
	// 			let result=param?data[param]:data
	// 			console.log("SendMessage get_data result",result)
	// 			console.log("SendMessage get_data data",data)
	// 			return result
	// 		case "quit_project":
	// 			QuitCallbackFunc(param)
	// 			break
	// 		case "start_project":
	// 			return StartProjectCallbackFunc(param)
	// 		case "save_data":
	// 			UpdateData(data)
	// 			break
	// 		case "set_data":
	// 			tData={...data}
	// 			tData[param[0]][param[1]]=param[2]
	// 			//setData(tData)
	// 			setData(tData)
	// 			localStorage.setItem("projects",JSON.stringify(data))
	// 			break
	// 		case "set_stat":
	// 			tData={...data}
	// 			// console.log("tData",tData)
	// 			switch(param[1]){
	// 				case "plus_checkedTaskCount":
	// 					tData[param[0]].stat.checkedTaskCount++
	// 					break
	// 				case "minus_checkedTaskCount":
	// 					tData[param[0]].stat.checkedTaskCount--
	// 					break
	// 			}
	// 			setData(tData)//setData(tData)
	// 			localStorage.setItem("projects",JSON.stringify(data))
	// 			break
	// 		case "set_tasks":
	// 			tData={...data}
	// 			console.log("tData.day",tData[param[0]].day)
	// 			if(tData[param[0]].day==="DAY"&&tData[param[0]].lastTasks){
	// 				tData[param[0]].lastTasks[param[1]]=param[2]
	// 			}
	// 			else{
	// 				tData[param[0]].tasks[param[1]]=param[2]
	// 			}
	// 			setData(tData)//setData(tData)
	// 			break
	// 		case "append_project":
	// 			AppendProject(param)
	// 			break
			
	// 		case "msgtest":
	// 			console.log("message test",data)
	// 			break
			
	// 		default:
	// 			console.log("unkown msg",msg)
	// 			break;
	// 	}
	// }
	
	// // const PageCallbackFunc=(page,props)=>{
	// // 	switch(page){
	// // 		case "Lobby":
	// // 			setPage(<Lobby PageCallback={PageCallbackFunc} projects={data}></Lobby>);
	// // 			break;
	// // 		case "Project":
	// // 			console.log("name", props.name);
	// // 			setPage(<Project projectName={props.name} projectData={data[props.name]} SaveDataCallback={SaveDataCallbackFunc} QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} StartProjectCallback={StartProjectCallbackFunc}></Project>);
	// // 			break;
	// // 		case "Create":
	// // 			console.log("data", data);
	// // 			setPage(<Create QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} dataToModify={props} SaveDataCallback={CreatePrjCallbackFunc}></Create>)
	// // 			break;
	// // 		default:
	// // 			//setData("");
	// // 			break;
	// // 	}
	// // }
	// // const QuitCallbackFunc=(prjName)=>{
	// // 	delete data[prjName];
	// // 	console.log("QuitCallbackFunc prjName",prjName);
	// // 	console.log("QuitCallbackFunc ",data);
	// // 	UpdateData(data,setData);
	// // }
	// // const StartProjectCallbackFunc=(prjName)=>{
	// // 	if(data[prjName].day==="DAY"){
	// // 		//alert("프로젝트 재설정 부탁드립니다.");
	// // 		Notice.Alert("프로젝트 재설정 부탁드립니다.")
	// // 	}
	// // 	else{
	// // 		if(!data[prjName].start){
	// // 			data[prjName].start=true;
	// // 			UpdateData(data,setData)
	// // 			Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
	// // 			PageCallbackFunc("Project",{name:prjName});
	// // 			return true;
	// // 		}
	// // 	}
	// // 	return false;
	// // }
	// const AppendProject=(newPrj)=>{
	// 	console.log("newPrj",newPrj)
	// 	let name=newPrj.name
	// 	let newData=newPrj.data
	// 	// console.log(name in data)
	// 	let tData={...data}
	// 	onDataChanged=()=>{
	// 		// ChangePage("Lobby")
	// 		window.history.back()
	// 	}
	// 	if(!(name in tData)){
	// 		//var newData={...data};
	// 		tData[name]=newData
	// 		console.log("tData",tData)
	// 		localStorage.setItem(storageName,JSON.stringify(tData))
	// 		setData(tData)//setData(tData)
	// 		console.log("append done")
	// 		window.history.back()
	// 	}
	// }
	// const NextDayCallbackFunc=()=>{
	// 	let today=IsNextDay();
	// 	// console.log("today in NextDayCallbackFunc",today);
	// 	if(today){
	// 		let dateDelta=today-GetOldDate();
	// 		UpdateAttendance(dateDelta);
	// 		for(let projectName in data){
	// 			DailyUpdateData(data[projectName],dateDelta);
	// 			console.log("data[projectName]",data[projectName]);
	// 		}
	// 		UpdateData(data);
	// 		UpdateOldDate(today);
	// 	}
	// }
	// SetSendMessage(SendMessage)
	// useEffect(()=>{
	// 	// SetSendMessage(SendMessage)
	// 	InitDate();
	// 	InitAttendance();
		
	// 	// SendMessage("change_page",["Lobby"])
	// },[])
	// useEffect(()=>{
		
	// 	console.log("data useEffect",data)
	// 	// SetSendMessage(SendMessage)
	// 	console.log("onDataChanged",onDataChanged)
	// 	if(onDataChanged){
	// 		onDataChanged()
	// 		onDataChanged=null
	// 	}
	// },[data])
	// console.log("app compo")
	// InitBundle()
	// projectBundle.Init()
	const [re,setRe]=useState([])
	useEffect(()=>{
		InitAttendance()
		InitDate()
		projectBundle.Init()
		setRe([])
	},[])
	
	console.log("app",projectBundle)
	if(Object.keys(projectBundle).length){
		return (
			<div className="App">
				<input type="button" value="noti" onClick={()=>{
					ShowNotification()
				}}></input>
				<BrowserRouter>
					<Routes>
						<Route  path="/" element={<Lobby/>}></Route>
						<Route path="/Create" element={<Create/>}></Route>
						<Route path="/Project" element={<Project/>}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		)
	}
	else{
		return "loading"
	}
}
function ShowNotification(){
	Notification.requestPermission((result)=>{
		if(result==="granted"){
			navigator.serviceWorker.ready.then((registration)=>{
				registration.showNotification("noti sample",{
					body:"body",
					icon:"./logo.svg",
					vibrate:[100,100,200,200,300,300],
					tag:"noti tag"
				})
			})
		}
	})
}

export default App;