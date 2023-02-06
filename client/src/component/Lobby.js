import "../style/Lobby.css";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js"

function Lobby(props){
	return(
		<div>
			<div className="lobby_stat">
				<span>{"연속출석 "+props.attendance+"일째"}</span>
			</div>
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
				<ProjectLists projects={props.projects} PageCallback={props.PageCallback}></ProjectLists>
			</ul>
		</div>
	)
}
export default Lobby;