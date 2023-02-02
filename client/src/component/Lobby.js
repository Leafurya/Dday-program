import React, {useState} from 'react';
import "../style/Lobby.css";

function Lobby(props){
	let prjs=props.projects;
	let prj;
	let prjName;
	let prjLists=[];
	let i=0;
	console.log("lobby props",prjs);
	for(prjName in prjs){
		prj=prjs[prjName];
		prjLists.push(
		<li className="project_list_li" key={i}><input id={"prj"+i} type="button" value={prjName} onClick={
			(event)=>{
				console.log(event.target)
				props.PageCallback("Project",{name:event.target.value});
			}
		}></input>
			<label className="project_list_label" htmlFor={"prj"+i}>
				<div><span className="project_list_day">{"D"+prj.D+prj.Day}</span></div>
				<div><span className="project_list_name">{prjName}</span></div>
			</label>
		</li>);
		i++;
	}
	return(
		<div>
			<ul className="project_list_ul">
				<li className="project_list_li" >
					<input id="create_btn" type="button" value="생성" onClick={
						()=>{
							props.PageCallback("Create");
						}
					}></input>
					<label  className="project_list_label plus_btn" htmlFor="create_btn">
						<span className="plus_btn_value">+</span>
					</label>
				</li>
				{prjLists}
			</ul>
			
		</div>
	)
}
export default Lobby;