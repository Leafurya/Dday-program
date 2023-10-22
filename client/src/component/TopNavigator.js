import React from "react"
import "../style/TopNavi.css";

export default ({title})=>{
	return(
		<div className="top_navi">
			<input type="button" value="<" onClick={()=>{
				window.history.back()
			}}></input>
			<span className="title">{title}</span>
		</div>
	)
}