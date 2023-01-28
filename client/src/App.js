import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
let prjNames;

function App() {
	const [nowPage,setPage]=useState("");
	const [data,setData]=useState("");
	//let oldPage;
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
				console.log("data", data);
				setPage(<Create PageCallback={PageCallbackFunc} prjs={data} DataSendCallback={CreatePrjCallbackFunc}></Create>)
				break;
			default:
				setData("");
				break;
		}
	}
	const CreatePrjCallbackFunc=(data,newPrj)=>{
		console.log(data);
		var name=Object.keys(newPrj)[0];
		console.log(name in data);
		if(!(name in data)){
			var newData={...data};
			newData[name]=newPrj[name];
			console.log("newdata",newData);
			fetch("http://localhost:8080/savedata",{
				method:"POST",
				body:JSON.stringify(newData),
				headers:{
					'Content-Type':"application/json"
				}
			}).then(res=>{
				console.log(res.status);
				if(res.status==200){
					setData(newData);
					console.log("newData",newData);
					prjNames=[];
					console.log(newData);
					for(var p in newData){
						prjNames.push(p);
					}
					PageCallbackFunc("Lobby");
				}
				else{
					alert("저장에 실패했습니다.")
				}
			})
		}
	}
	useEffect(()=>{
		fetch("http://localhost:8080/getdata",{
			method:"GET",
		}).then(res=>res.json()).then(res=>{
			//setData(res);
			//console.log(res);
			setData(res);
			prjNames=[];
			console.log(res);
			for(var p in res){
				prjNames.push(p);
			}
			
			//setPage(<Lobby PageCallback={PageCallbackFunc} projects={prjNames}></Lobby>)
		})
	},[]);
	if(typeof(data)!="string"&&nowPage!=""){
		console.log("prjNames",prjNames);	
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