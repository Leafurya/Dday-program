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
	let isMobile = /Mobi/i.test(window.navigator.userAgent);
	return(
		<div style={{backgroundColor:"white",display:"flex",flexDirection:"column",height:"100%",position:"absolute",overflowY:"scroll"}}>
			<div className="app_information">
				{isMobile?"mobile":"pc"}
				<h1>목표와 반복</h1>
				앱 정보가 보여야된다.
				앱 정보라 함은 일단 개발자가 누군지, 앱 이름이 뭔지, 이 앱의 목적이 뭔지 정도 있으면 되지 않을까?
				앱 사용법도 보여주면 좋겠지?
				앱 이름을 왜 이렇게 정했는지 알려주면 이 앱의 의의를 더 잘 알 수 있겠지?

				이 앱은 투두 리스트에 가깝습니다. 반복적으로 해야 하는 일을 지정해 놓고 D-Day 프로젝트로 만들고 실행해 보세요!
			</div>
			<div className="install_btn_platform" style={{backgroundColor:"#95f",width:"50%"}}>
				
				<input type="button" onClick={installBtnCallback} value="설치하기" disabled={!isMobile}></input>
			</div>
			<div className="contact" style={{marginTop:"auto",width:"100%",height:"100px",backgroundColor:"#947fda"}}>
				연락 방법 적어놓기
			</div>
			
		</div>
	)
}

/**
 * 앱이름
 * dday
 * 
 */