import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useRef,useState} from "react";

import {InitDate} from './module/TimeModule'
import {InitAttendance} from './module/AttendanceModule.js'
import projectBundle from './module/global/DataBundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import todoList from './module/global/ToDo';
import ToDoToday from './component/ToDoToday';
import ToDoModify from './component/ToDoModify';
import InstallCompo from './component/sub-compo/InstallCompo.js';

// window.addEventListener('beforeinstallprompt',(e)=>{
// 	e.preventDefault()
// 	console.log("before install")
// 	if(window.matchMedia('(display-mode: standalone').matches){
// 		console.log("standalone")
// 	}
// 	else{
// 		console.log("install")
// 	}
// })
function App() {
	const install=useRef()
	const [re,setRe]=useState([])
	// var deferredPrompt;
	// window.addEventListener('beforeinstallprompt', function(e) {
	// 	console.log('beforeinstallprompt Event fired');
	// 	e.preventDefault();// Stash the event so it can be triggered later.
	// 	deferredPrompt = e;
	// 	return false;
	// });  // 특정 버튼 클릭 시 설치 시작
	// btnSave.addEventListener('click', function() {
	// 	if(deferredPrompt !== undefined) {     // The user has had a postive interaction with our app and Chrome     // has tried to prompt previously, so let's show the prompt.
	// 		deferredPrompt.prompt();      // Follow what the user has done with the prompt.
	// 		deferredPrompt.userChoice.then(function(choiceResult) {
	// 			console.log(choiceResult.outcome);
	// 			if(choiceResult.outcome == 'dismissed') {      
	// 			   console.log('User cancelled home screen install');
	// 			}
	// 			else {
	// 				console.log('User added to home screen');
	// 			}        // We no longer need the prompt.  Clear it up.
	// 			deferredPrompt = null;
	// 		});
	// 	}
	// });
	
	
	useEffect(()=>{
		InitAttendance()
		InitDate()
		todoList.Init()
		projectBundle.Init()
		console.log("todoList",todoList)
		setRe([])
	},[])
	
	if(!window.matchMedia("(display-mode: standalone)").matches){
		return <InstallCompo></InstallCompo>
	}

	console.log("app",projectBundle)
	if(Object.keys(projectBundle).length){
		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route  path="/" element={<Lobby/>}></Route>
						<Route path="/Create" element={<Create/>}></Route>
						<Route path="/Project" element={<Project/>}></Route>
						<Route path="/ToDoToday" element={<ToDoToday/>}></Route>
						<Route path="/ToDoModify" element={<ToDoModify/>}></Route>
					</Routes>
				</BrowserRouter>
			</div>
		)
	}
	else{
		return "loading"
	}
}

export default App;