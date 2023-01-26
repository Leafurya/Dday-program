import React, {useEffect,useState} from 'react';

function Lobby(props){
	const [data,setData]=useState("");
	//프로젝트 데이터 받기
	// useEffect(()=>{
	// 	fetch("http://localhost:8080/lobbydata",{
	// 		method:"GET"
	// 	}).then(res=>{res.json();console.log(res)}).then(res=>{
	// 		console.log(res);
	// 	})
	// },[]);

	return(
		<div>
			<input type="button" value="project" onClick={()=>props.PageCallBack("Project",{name:"prj1"})}></input>
			lobby page
		</div>
	)
}
export default Lobby;