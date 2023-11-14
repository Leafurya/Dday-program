import React, { useCallback, useRef } from "react";

export default ()=>{
	const installEvent=useRef()
	window.addEventListener('beforeinstallprompt',(e)=>{
		e.preventDefault()
		installEvent.current=e
		console.log(installEvent.current)
		return false
	})
	const installBtnBallback=useCallback(()=>{
		let event=installEvent.current
		if(event===undefined){
			return
		}
		event.prompt()
		event.userChoice.then((result)=>{
			if(result.outcome==="dismissed"){
				console.log("install cancelled")
			}
			else{
				console.log("install success")
			}
			event=null
		})
	})
	return(
		<div>
			install
			<input type="button" onClick={installBtnBallback} value="설치하기"></input>
		</div>
	)
}