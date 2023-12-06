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
		<div style={{backgroundColor:"white",display:"flex",flexDirection:"column",height:"100%",position:"absolute",overflowY:"scroll",width:"100%"}}>
			<div className="app_information">
				{isMobile?"":(
					<div>
						이 앱은 모바일만 지원합니다!
					</div>
				)}
				<div style={{backgroundColor:"#947fda",display:"flex",flexDirection:"column"}}>
					<Title></Title>
					<div style={{color:"white",fontSize:"large"}}>
						습관을 만들고 싶었어요.<br/>
						목표를 정하고 하루하루 반복하는 것 만큼 확실한 방법은 없다고 생각했죠.<br/>
						그래서 디데이와 투두리스트를 합쳐 이 앱을 만들었습니다!<br/>
						사용은 간단하게. 기능은 확실하게. 이 앱의 방향성입니다!
						{/* 
						앱 개발 이유
						앱 방향성
						앱 기대 효과

						앱 정보가 보여야된다.
						앱 정보라 함은 일단 개발자가 누군지, 앱 이름이 뭔지, 이 앱의 목적이 뭔지 정도 있으면 되지 않을까?
						앱 사용법도 보여주면 좋겠지?
						앱 이름을 왜 이렇게 정했는지 알려주면 이 앱의 의의를 더 잘 알 수 있겠지?

						이 앱은 투두 리스트에 가깝습니다. 반복적으로 해야 하는 일을 지정해 놓고 D-Day 프로젝트로 만들고 실행해 보세요!

						디스코드 사이트 참고해서 만들어보면 좋을듯? */}
					</div>
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