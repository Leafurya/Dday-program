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
import { Toast } from './component/Notices.js';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Authentication } from './module/global/Auth.js';

function App() {
	const install=useRef()
	const [re,setRe]=useState([])

	useEffect(()=>{
		InitAttendance()
		InitDate()
		todoList.Init()
		projectBundle.Init()
		Authentication(()=>{
			setRe([])
		})
		//access code 저장?
		//
	},[])
	
	if(process.env.NODE_ENV!=="development"){
		if(!window.matchMedia("(display-mode: standalone)").matches){
			return <InstallCompo></InstallCompo>
		}
	}

	if(Object.keys(projectBundle).length){
		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Lobby/>}></Route>
						<Route path="/Create" element={<Create/>}></Route>
						<Route path="/Project" element={<Project/>}></Route>
						<Route path="/ToDoToday" element={<ToDoToday/>}></Route>
						<Route path="/ToDoModify" element={<ToDoModify/>}></Route>
					</Routes>
				</BrowserRouter>
				<Toast></Toast>
				
			</div>
		)
	}
	else{
		return "loading"
	}
}

export default App;