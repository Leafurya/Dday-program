import React, {useEffect,useState} from 'react';

function Project(props){
	const [data,setData]=useState("");
	//프로젝트 데이터 요청.
	return(
		<div>
			<input type="button" value="lobby" onClick={()=>{props.PageCallBack("Lobby")}}></input>
			project page
			name:{props.name}
		</div>
	)
}
export default Project;