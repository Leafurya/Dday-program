import "../style/Lobby.css";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js"
import { CreateElement } from '../module/CreateCompModule.js';
import {GetAttendance} from '../module/AttendanceModule.js'
import Notice from '../module/Notice.js';
import { SendMessage } from '../module/SendMessageModule';


const closeNotiEle=CreateElement({element:"div",classList:"close_noti"});
closeNotiEle.innerHTML="버튼을 한 번 더 누르면 앱을 종료합니다.";

function Lobby(props){
	return(
		<div className="lobby">
			<ul className="project_list_ul">
				<li className="project_list_li" >
					<input id="create_btn" type="button" value="생성" onClick={
						()=>{
							// props.PageCallback("Create");
							SendMessage("change_page",["Create"])
							// SendMessage("msgtest")
						}
					}></input>
					<label  className="plus_btn label_base" htmlFor="create_btn">
						<div className="plus_btn_value">+</div>
					</label>
				</li>
				<ProjectLists></ProjectLists>
			</ul>
			<div className="navi_btns">
				<input type="button" className="information_btn" value="정보" onClick={()=>{
					// alert("버전: alpha 1.3.1\n연속 출석 "+GetAttendance()+"일째");
					//version: system.function.design
					Notice.Alert("버전: alpha 2.4.2<br/>연속 출석 "+GetAttendance()+"일째")
					// console.log("start promise")
					// // Notice.Prompt("test")
					// console.log("end promise")
				}}></input>
			</div>
		</div>
	)
}
export default Lobby;

