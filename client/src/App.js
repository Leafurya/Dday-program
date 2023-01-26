import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import React, {useState} from "react";

function App() {
	const PageCallbackFunc=(page,props)=>{
		switch(page){
			case "Lobby":
				setPage(<Lobby PageCallBack={PageCallbackFunc}></Lobby>);
				break;
			case "Project":
				setPage(<Project name={props.name} PageCallBack={PageCallbackFunc}></Project>);
				break;
		}
	}
	const [nowPage,setPage]=useState(<Lobby PageCallBack={PageCallbackFunc}></Lobby>);

	
    return (
        <div className="App">
            {nowPage}
        </div>
    );
}

export default App;