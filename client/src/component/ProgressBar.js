import React from 'react'
import "../style/Progressbar.css"

 export default ({state,progress})=>{
	let className=["bar_prj_done","bar_wait","bar_start"]

	if(state===2){
		if(progress===0){
			return(
				<div className='bar_base' style={{background: "rgb(121 101 189)"}}></div>
			)
		}
		return(
			<div className='bar_base' style={{background: `linear-gradient(to right,white ${progress}%,rgb(121 101 189) ${100-progress}%)`}}></div>
		)
	}
	return(
		<div className={`bar_base ${className[state]}`}></div>
	)
 }