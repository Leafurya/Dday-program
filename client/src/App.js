import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import Notice from './module/Notice.js';
import React, {useEffect,useState} from "react";

import {UpdateOldDate,InitDate,IsNextDay,GetOldDate} from './module/TimeModule'
import {UpdateData,DailyUpdateData} from './module/DataModule.js'
import {InitAttendance,UpdateAttendance} from './module/AttendanceModule.js'

const storageName="projects";

function App() {
	let [data,setData]=useState(JSON.parse(localStorage.getItem(storageName)??"{}"));
	const [nowPage,setPage]=useState("");
	//let oldPage;
	const PageCallbackFunc=(page,props)=>{
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
				setPage(<Create QuitCallback={QuitCallbackFunc} PageCallback={PageCallbackFunc} dataToModify={props} SaveDataCallback={CreatePrjCallbackFunc}></Create>)
				break;
			default:
				//setData("");
				break;
		}
	}
	const QuitCallbackFunc=(prjName)=>{
		delete data[prjName];
		console.log("QuitCallbackFunc prjName",prjName);
		console.log("QuitCallbackFunc ",data);
		UpdateData(data,setData);
	}
	const StartProjectCallbackFunc=(prjName)=>{
		if(data[prjName].day==="DAY"){
			//alert("프로젝트 재설정 부탁드립니다.");
			Notice.Alert("프로젝트 재설정 부탁드립니다.")
		}
		else{
			if(!data[prjName].start){
				data[prjName].start=true;
				UpdateData(data,setData)
				Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
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
		let today=IsNextDay();
		console.log("today in NextDayCallbackFunc",today);
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
		InitDate();
		InitAttendance();
		PageCallbackFunc("Lobby")
	},[])
	useEffect(()=>{
		NextDayCallbackFunc();
	},[nowPage]);
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