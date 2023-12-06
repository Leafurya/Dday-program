import "../style/Lobby.css";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js"
import {GetAttendance, UpdateAttendance} from '../module/AttendanceModule.js'
import Notice from '../module/Notice.js';
import { StyledLink} from "../module/GlobalModule";
import { GetOldDate, IsNextDay, UpdateOldDate } from "../module/TimeModule";
import projectBundle from "../module/global/DataBundle";
import todoList from "../module/global/ToDo";
import { toastRef } from "./Notices.js";
import { useNavigate } from "react-router-dom";

function Lobby(){
	let today=IsNextDay();
	const navigate=useNavigate()
	if(today){
		let dateDelta=today-GetOldDate();
		UpdateAttendance(dateDelta);
		todoList.DailyUpdate()
		projectBundle.DailyUpdate(dateDelta)
		projectBundle.Save()
		UpdateOldDate(today);
	}
	return(
		<div className="borad">
			{/* <input value="토스트 보이기" type="button" onClick={()=>{
				toastRef.SetMessage("토스트 메시지")
			}}></input> */}
			<ul className="project_list_ul">
				{/* <li className="project_list_li" >
					<StyledLink to={'/Create'}>
						<div className="plus_btn label_base">
							<div className="plus_btn_value base_style">+</div>
						</div>
					</StyledLink>
				</li> */}
				<ProjectLists></ProjectLists>
			</ul>
			<input style={{display:"none"}} type="button" id="create_btn" onClick={()=>{
				navigate("/Create")
			}}></input>
			<label htmlFor="create_btn">
				<div className="plus_btn label_base">
					<div className="plus_btn_value base_style">+</div>
				</div>
			</label>
			{/* <StyledLink to={'/Create'}>
				<div className="plus_btn label_base">
					<div className="plus_btn_value base_style">+</div>
				</div>
			</StyledLink> */}
		</div>
	)
}
export default Lobby;

