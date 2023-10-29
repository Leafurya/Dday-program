import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";

import {InitDate} from './module/TimeModule'
import {InitAttendance} from './module/AttendanceModule.js'
import projectBundle from './module/global/DataBundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import todoList from './module/global/ToDo';
import ToDoToday from './component/ToDoToday';
import ToDoModify from './component/ToDoModify';

function App() {
	const [re,setRe]=useState([])
	useEffect(()=>{
		InitAttendance()
		InitDate()
		todoList.Init()
		projectBundle.Init()
		console.log("todoList",todoList)
		setRe([])
	},[])
	
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