import React, { useCallback, useRef } from "react";

export default ()=>{
	const installEvent=useRef()
	window.addEventListener('beforeinstallprompt',(e)=>{
		e.preventDefault()
		installEvent.current=e
		console.log(installEvent.current)
		return false
	})
	const installBtnCallback=useCallback(()=>{
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
			<div className="app_information">
				앱 정보가 보여야된다.
				앱 정보라 함은 일단 개발자가 누군지, 앱 이름이 뭔지, 이 앱의 목적이 뭔지 정도 있으면 되지 않을까?
				앱 사용법도 보여주면 좋겠지?
			</div>
			<div className="install_btn_platform">
				<input type="button" onClick={installBtnCallback} value="설치하기"></input>
			</div>
		</div>
	)
}

/**
 * 앱이름
 * dday
 * 
 */