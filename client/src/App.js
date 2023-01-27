import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";

function App() {
	var prjNames;
	let oldPage;
	const PageCallbackFunc=(page,props)=>{
		switch(page){
			case "Lobby":
				setPage(<Lobby PageCallback={PageCallbackFunc} projects={prjNames}></Lobby>);
				break;
			case "Project":
				console.log(props.name);
				setPage(<Project name={props.name} PageCallback={PageCallbackFunc}></Project>);
				break;
			case "Create":
				setPage(<Create PageCallback={PageCallbackFunc} prjs={data} DataSendCallback={DataSendCallbackFunc}></Create>)
				break;
		}
	}
	const DataSendCallbackFunc=(data)=>{
		
	}
	const DataRecvCallbackFunc=()=>{

	}
	const [nowPage,setPage]=useState(<Lobby PageCallBack={PageCallbackFunc}></Lobby>);
	const [data,setData]=useState("");
	useEffect(()=>{
		fetch("http://localhost:8080/getdata",{
			method:"GET",
		}).then(res=>res.json()).then(res=>{
			//setData(res);
			//console.log(res);
			setData(res);
			console.log(res);
			prjNames=[];
			for(var p in res){
				prjNames.push(p);
			}
			//setPage(<Lobby PageCallback={PageCallbackFunc} projects={prjNames}></Lobby>)
			PageCallbackFunc("Create");
		})
	},[]);
	if(typeof(data)!="string"){
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