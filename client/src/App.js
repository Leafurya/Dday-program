import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";
//let prjNames;

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
				console.log(props.name);
				setPage(<Project name={props.name} PageCallback={PageCallbackFunc}></Project>);
				break;
			case "Create":
				console.log("data", data);
				setPage(<Create PageCallback={PageCallbackFunc} prjs={Object.keys(data)} DataSendCallback={CreatePrjCallbackFunc}></Create>)
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
			//setData(newData);
			fetch("http://localhost:8080/savedata",{
				method:"POST",
				body:JSON.stringify(data),
				headers:{
					'Content-Type':"application/json"
				}
			}).then((res)=>{
				console.log(res.status);
				if(res.status==200){
					alert(name+"프로젝트가 저장되었습니다!");
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
			//data=res;
			setData(res);
			/*prjNames=[];
			console.log(res);
			for(var p in res){
				prjNames.push(p);
			}*/
			
			//setPage(<Lobby PageCallback={PageCallbackFunc} projects={prjNames}></Lobby>)
		})
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