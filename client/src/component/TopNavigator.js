import React from "react"
import "../style/TopNavi.css";

export default ({title,stat})=>{
	return(
		<div className="top_navi">
			<div className={"todo_style label_base"} htmlFor={1}>
				<h2 className='base_style'>{title}</h2>
				<div className="task_stat base_style">
					<span>{`성공률 ${stat}`}</span>
				</div>
			</div>
		</div>
	)
}