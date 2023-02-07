import "../style/Lobby.css";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js"
import { CreateElement } from '../module/CreateCompModule.js';

let closeInterval;
let closeBtnClickCount=0;
const closeNotiEle=CreateElement({element:"div",classList:"close_noti"});
closeNotiEle.innerHTML="버튼을 한 번 더 누르면 앱을 종료합니다.";

function Lobby(props){
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
				<ProjectLists projects={props.projects} PageCallback={props.PageCallback}></ProjectLists>
			</ul>
			<div className="navi_btns">
				<input className="close_btn" type="button" value="CLOSE" onClick={
					()=>{
						closeBtnClickCount++;
						if(closeBtnClickCount>=2){
							window.close();
						}
						else{
							closeNotiEle.classList="close_noti"
							document.querySelector(".App").appendChild(closeNotiEle)
							closeInterval=setInterval(()=>{
								closeBtnClickCount=0;
								closeNotiEle.classList.remove("close_noti")
								document.querySelector(".App").removeChild(closeNotiEle)
								clearInterval(closeInterval)
							},1990)
						}
					}
				}></input>
				<input type="button" className="information_btn" value="정보" onClick={()=>{
					alert("버전: alpha 1.0.0\n연속 출석 "+props.attendance+"일째");
				}}></input>
			</div>
		</div>
	)
}
export default Lobby;