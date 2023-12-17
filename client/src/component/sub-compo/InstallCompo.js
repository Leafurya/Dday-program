import React, { useCallback, useRef } from "react";

function Title(){
	return(
		<div style={{display:"flex",width:"100%",height:70}}>{/*title*/}
			<div style={{backgroundImage:"url(./applogo192prev.png)",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat", flex:1}}></div>
			<div style={{flex:3}}>
				<h1 style={{margin:0,color:"white",fontSize:"x-large",transform:"translateY(-50%)",top:"50%",position:"relative"}}>목표와 반복</h1>
			</div>
		</div>
	)
}
function SimpleDescription(){
	return(
		<div>
			<h2>
				행동을 반복하면 목표를 이룰겁니다
			</h2>
			<div>
				
			</div>
		</div>
	)
}

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
				console.log("install canceled")
			}
			else{
				console.log("install success")
			}
			event=null
		})
	})
	let isMobile = /Mobi/i.test(window.navigator.userAgent);
	return(
		<div style={{backgroundColor:"white",display:"flex",flexDirection:"column",height:"100%",position:"absolute",overflowY:"scroll",width:"100%"}}>
			<div className="app_information">
				{isMobile?"":(
					<div>
						이 앱은 모바일만 지원합니다!
					</div>
				)}
				<div style={{backgroundColor:"#947fda",display:"flex",flexDirection:"column"}}>
					<Title></Title>
					<SimpleDescription></SimpleDescription>
				</div>
				<div>

				</div>
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