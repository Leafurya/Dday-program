import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import Notice from './module/Notice.js';
import React, {useEffect,useState} from "react";

import {UpdateOldDate,InitDate,IsNextDay,GetOldDate} from './module/TimeModule'
import {UpdateData,DailyUpdateData,LoadData} from './module/DataModule.js'
import {InitAttendance,UpdateAttendance} from './module/AttendanceModule.js'
import { SetSendMessage } from './module/SendMessageModule';

const storageName="projects";
let onDataChanged=null

function App() {
	// const [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??{}));
	const [data,setData]=useState(LoadData());
	const [nowPage,setPage]=useState("");
	// let data
	//let oldPage;
	const ChangePage=(page,props)=>{
		switch(page){
			case "Lobby":
				setPage(<Lobby></Lobby>);
				break;
			case "Project":
				console.log("name", props);
				setPage(<Project projectName={props}></Project>);
				break;
			case "Create":
				console.log("dataToModify", props);
				setPage(<Create dataToModify={props}></Create>)
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
			//alert("프로젝트 재설정 부탁드립니다.");
			Notice.Alert("프로젝트 재설정 부탁드립니다.")
		}
		else{
			if(!data[prjName].start){
				let tData={...data}
				tData[prjName].start=true;
				setData(tData)
				UpdateData(data,setData)
				Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
				ChangePage("Project",prjName);
				return true;
			}
		}
		return false;
	}
	const SendMessage=(msg,param)=>{
		let tData
		console.log("msg param",msg,param)
		// console.log("SendMessage data",data)
		switch(msg){
			case "change_page":
				let page=param[0]
				let props=param[1]
				// console.log("page",page,props)
				ChangePage(page,props)
				break
			case "get_data":
				let result=param?data[param]:data
				console.log("SendMessage get_data result",result)
				console.log("SendMessage get_data data",data)
				return result
			case "quit_project":
				QuitCallbackFunc(param)
				break
			case "start_project":
				return StartProjectCallbackFunc(param)
			case "save_data":
				UpdateData(data,setData)
				break
			case "set_data":
				tData={...data}
				tData[param[0]][param[1]]=param[2]
				setData(tData)
				localStorage.setItem("projects",JSON.stringify(data))
				break
			case "set_stat":
				tData={...data}
				// console.log("tData",tData)
				switch(param[1]){
					case "plus_checkedTaskCount":
						tData[param[0]].stat.checkedTaskCount++
						break
					case "minus_checkedTaskCount":
						tData[param[0]].stat.checkedTaskCount--
						break
				}
				setData(tData)
				localStorage.setItem("projects",JSON.stringify(data))
				break
			case "set_tasks":
				tData={...data}
				console.log("tData.day",tData[param[0]].day)
				if(tData[param[0]].day==="DAY"){
					tData[param[0]].lastTasks[param[1]]=param[2]
				}
				else{
					tData[param[0]].tasks[param[1]]=param[2]
				}
				setData(tData)
				break
			case "append_project":
				AppendProject(param)
				break
			
			case "msgtest":
				console.log("message test",data)
				break
			
			default:
				console.log("unkown msg",msg)
				break;
		}
	}
	
	// const PageCallbackFunc=(page,props)=>{
	// 	switch(page){
	// 		case "Lobby":
	// 			setPage(<Lobby PageCallback={PageCallbackFunc} projects={data}></Lobby>);
	// 			break;
	// 		case "Project":
	// 			console.log("name", props.name);
	// 			setPage(<Project projectName={props.name} projectData={data[props.name]} SaveDataCallback={SaveDataCallbackFunc} QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} StartProjectCallback={StartProjectCallbackFunc}></Project>);
	// 			break;
	// 		case "Create":
	// 			console.log("data", data);
	// 			setPage(<Create QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} dataToModify={props} SaveDataCallback={CreatePrjCallbackFunc}></Create>)
	// 			break;
	// 		default:
	// 			//setData("");
	// 			break;
	// 	}
	// }
	// const QuitCallbackFunc=(prjName)=>{
	// 	delete data[prjName];
	// 	console.log("QuitCallbackFunc prjName",prjName);
	// 	console.log("QuitCallbackFunc ",data);
	// 	UpdateData(data,setData);
	// }
	// const StartProjectCallbackFunc=(prjName)=>{
	// 	if(data[prjName].day==="DAY"){
	// 		//alert("프로젝트 재설정 부탁드립니다.");
	// 		Notice.Alert("프로젝트 재설정 부탁드립니다.")
	// 	}
	// 	else{
	// 		if(!data[prjName].start){
	// 			data[prjName].start=true;
	// 			UpdateData(data,setData)
	// 			Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
	// 			PageCallbackFunc("Project",{name:prjName});
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }
	const AppendProject=(newPrj)=>{
		console.log("newPrj",newPrj)
		let name=newPrj.name
		let newData=newPrj.data
		// console.log(name in data)
		let tData={...data}
		onDataChanged=()=>{
			ChangePage("Lobby")
		}
		if(!(name in tData)){
			//var newData={...data};
			tData[name]=newData
			console.log("tData",tData)
			localStorage.setItem(storageName,JSON.stringify(tData))
			setData(tData)
			console.log("append done")
		}
	}
	const NextDayCallbackFunc=()=>{
		let today=IsNextDay();
		// console.log("today in NextDayCallbackFunc",today);
		if(today){
			let dateDelta=today-GetOldDate();
			UpdateAttendance(dateDelta);
			for(let projectName in data){
				DailyUpdateData(data[projectName],dateDelta);
				console.log("data[projectName]",data[projectName]);
			}
			UpdateData(data,setData);
			UpdateOldDate(today);
		}
	}

	useEffect(()=>{
		SetSendMessage(SendMessage)
		InitDate();
		InitAttendance();
		SendMessage("change_page",["Lobby"])
	},[])
	useEffect(()=>{
		console.log("data useEffect",data)
		SetSendMessage(SendMessage)
		console.log("onDataChanged",onDataChanged)
		if(onDataChanged){
			onDataChanged()
			onDataChanged=null
		}
	},[data])
	useEffect(()=>{
		NextDayCallbackFunc();
		SetSendMessage(SendMessage)
		console.log("nowPage useEffect",nowPage)
	},[nowPage])
	if(nowPage!==""){
		return (
			<div className="App">
				{nowPage}
				{/* <div className="notice_background">
					<div className="confirm_platform center_align platform_base">
						<div className="article">
							<span className="row_align_re">
								프로젝트 포기를 원하신다면<br/>
								"포기하겠습니다"<br/>
								를 적고 확인을 눌러주십시오.<br/>
								한번 포기한 프로젝트는 복구가 불가능합니다.
							</span>
						</div>
						<div className="okcancle">
							<input type="button" value="확인"></input>
							<input type="button" value="취소"></input>
						</div>
					</div>
				</div>  */}
				{/* <div className="notice_background">
					<div className="alert_platform center_align platform_base">
						<div className="article">
							<span className="center_align_ab">
								alert
							</span>
						</div>
						<input type="button" value="확인"></input>
					</div>
				</div> */}
				{/* <div className="notice_background">
					<div className="prompt_platform center_align platform_base"> 
						<div className="article">
							<span className="row_align_re">
								프로젝트 포기를 원하신다면<br/>
								"포기하겠습니다"<br/>
								를 적고 확인을 눌러주십시오.<br/>
								한번 포기한 프로젝트는 복구가 불가능합니다.
							</span>
						</div>
						<div>
							<input type="text" className="col_align_re"></input>
						</div>
						<div className="okcancle">
							<input type="button" value="확인"></input>
							<input type="button" value="취소"></input>
						</div>
					</div>
				</div> */}
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