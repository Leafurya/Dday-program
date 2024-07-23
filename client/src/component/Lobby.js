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
// import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import userInfo from "../module/global/User.js";
import GoogleLoginButton from "./GoogleLoginButton.js";
import { GetAuthResult } from "../module/global/Auth.js";

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
	// console.log(window.sessionStorage)
	return(
		<div className="borad">
			<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
				{
					GetAuthResult()?(
						<input type="button" value="로그아웃"></input>
					):(
						<GoogleLoginButton></GoogleLoginButton>
					)
				}
			</div>
			<ProjectLists></ProjectLists>
			{/* <ul className="project_list_ul">
			</ul> */}
			<input style={{display:"none"}} type="button" id="create_btn" onClick={()=>{
				fetch("")
				navigate("/Create")
			}}></input>
			<label htmlFor="create_btn">
				<div className="plus_btn label_base">
					<div className="plus_btn_value base_style">+</div>
				</div>
			</label>
		</div>
	)
}
export default Lobby;

