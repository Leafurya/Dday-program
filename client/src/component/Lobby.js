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
				<li className="project_list_li" >
					<StyledLink to={'/Create'}>
						<div className="plus_btn label_base">
							<div className="plus_btn_value">+</div>
						</div>
					</StyledLink>
				</li>
				<ProjectLists></ProjectLists>
			</ul>
			{/* <div className="navi_btns">
				<input type="button" className="information_btn" value="정보" onClick={()=>{
					Notice.Alert("버전: alpha 2.4.3<br/>연속 출석 "+GetAttendance()+"일째")
				}}></input>
			</div> */}
		</div>
	)
}
export default Lobby;

