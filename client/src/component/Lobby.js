import "../style/Lobby.css";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js"
import {GetAttendance, UpdateAttendance} from '../module/AttendanceModule.js'
import Notice from '../module/Notice.js';
import { StyledLink} from "../module/GlobalModule";
import { GetOldDate, IsNextDay, UpdateOldDate } from "../module/TimeModule";
import projectBundle from "../module/global/DataBundle";
import todoList from "../module/global/ToDo";

function Lobby(){
	let today=IsNextDay();
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
			<StyledLink to={'/Create'}>
				<div className="plus_btn label_base">
					<div className="plus_btn_value base_style">+</div>
				</div>
			</StyledLink>
		</div>
	)
}
export default Lobby;

