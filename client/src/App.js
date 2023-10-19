import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";

import {InitDate} from './module/TimeModule'
import {InitAttendance} from './module/AttendanceModule.js'
import projectBundle from './module/global/DataBundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
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