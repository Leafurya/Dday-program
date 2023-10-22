import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useEffect,useState} from "react";

import {InitDate} from './module/TimeModule'
import {InitAttendance} from './module/AttendanceModule.js'
import projectBundle from './module/global/DataBundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getCount } from './module/global/Count';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkHhMK0XzCao6sAoG8hfglLtYd9zxS40I",
  authDomain: "dday-38612.firebaseapp.com",
  projectId: "dday-38612",
  storageBucket: "dday-38612.appspot.com",
  messagingSenderId: "1077048953916",
  appId: "1:1077048953916:web:04bc21c7e0f189a3ae0739",
  measurementId: "G-Q7N9YZYMJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



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
					// ShowNotification()
					console.log(getCount())
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

export function ShowNotification(){
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