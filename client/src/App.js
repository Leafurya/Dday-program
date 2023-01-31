import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
//let prjNames;

let oldDate;
let intervalHandle=null;
function GetDay(){
	return Math.floor(Date.now()/86400000);//86400000
}
function App() {
	let [data,setData]=useState(JSON.parse((localStorage.getItem("projects")??"{}")));
	const [nowPage,setPage]=useState("");
	//let oldPage;
	const PageCallbackFunc=(page,props)=>{
		//let data=tempData;
		console.log("page callback data",data);
		switch(page){
			case "Lobby":
				setPage(<Lobby PageCallback={PageCallbackFunc} projects={Object.keys(data)}></Lobby>);
				break;
			case "Project":
				console.log("name", props.name);
				setPage(<Project projectName={props.name} projectData={data[props.name]} PageCallback={PageCallbackFunc} SaveDataCallback={SaveDataCallbackFunc}></Project>);
				break;
			case "Create":
				console.log("data", data);
				setPage(<Create PageCallback={PageCallbackFunc} DataSendCallback={CreatePrjCallbackFunc}></Create>)
				break;
			default:
				//setData("");
				break;
		}
	}
	const CreatePrjCallbackFunc=(newPrj)=>{
		console.log(data);
		var name=Object.keys(newPrj)[0];
		console.log(name in data);
		if(!(name in data)){
			//var newData={...data};
			data[name]=newPrj[name];
			console.log("newdata",data);
			localStorage.setItem("projects",JSON.stringify(data));
			PageCallbackFunc("Lobby");
		}
	}
	const SaveDataCallbackFunc=()=>{
		console.log("data in app",data)
		console.log("stringify",JSON.stringify(data))
		localStorage.setItem("projects",JSON.stringify(data));
	}
	const NextDayCallbackFunc=()=>{
		let today=GetDay();
		console.log("today",today);
		if(oldDate!=today){
			let d;
			for(var prj in data){
				d=data[prj];
				switch(d.D){
					case "+":
						d.Day+=(today-oldDate);
						break;
					case "-":
						d.Day-=(today-oldDate);
						break;
				}
				
			}
			localStorage.setItem("projects",JSON.stringify(data));
			setData(data);
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