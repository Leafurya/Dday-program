import React from "react"
import "../style/TopNavi.css";

export default ()=>{
	return(
		<div className="top_navi">
			<input type="button" value="<" onClick={()=>{
				window.history.back()
			}}></input>
		</div>
	)
}