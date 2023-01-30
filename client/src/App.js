import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
//let prjNames;

let oldDate;
function GetToday(){
	var date=new Date();
	var today="";
	today+=date.getFullYear();
	today+=(date.getMonth()+1);
	today+=date.getDate();
	return today;
}
function DateCheckFunc(NextDayCallback){
	var today=GetToday();
	
	if(oldDate!=today){
		NextDayCallback();
		localStorage.setItem("oldDate",today);
	}

}
function App() {
	const [nowPage,setPage]=useState("");
	let [data,setData]=useState("");
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
	}
	useEffect(()=>{
		oldDate=localStorage.getItem("oldDate");
		if(oldDate==null){
			oldDate=GetToday();
			localStorage.setItem("oldDate",oldDate);
		}
		setInterval(()=>{
			DateCheckFunc()
		},1000);
		var result=localStorage.getItem("projects");
		console.log("result",result)
		setData(result!=null?JSON.parse(result):{})

	},[]);
	if(typeof(data)!="string"&&nowPage!=""){
		return (
			<div className="App">
				{nowPage}
			</div>
		);
	}
	else if(typeof(data)!="string"){
		PageCallbackFunc("Lobby");
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