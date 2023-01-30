import React, {useState} from 'react';

function Lobby(props){
	console.log(props.projects)
	let prjLists=[];
	for(var i=0;i<props.projects.length;i++){
		prjLists.push(<li key={i}><input type="button" value={props.projects[i]} key={i} onClick={
			(event)=>{
				console.log(event.target)
				props.PageCallback("Project",{name:event.target.value});
			}
		}></input></li>);
	}
	return(
		<div>
			<ol>
				{prjLists}
			</ol>
			<input type="button" value="생성" onClick={
				()=>{
					props.PageCallback("Create");
				}
			}></input>
		</div>
	)
}
export default Lobby;