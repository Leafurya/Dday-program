import React from "react";

function NotiBase({children,btns}){
	return(
		<div className="notice_background">
			<div className="platform_base">
				<div style={{padding:"5px 10px"}}>
					{children}
				</div>
				{/* <div  style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
				</div> */}
				<div style={{display:"flex",bottom:0,margin:0,height:"35px"}}>
					{
						btns.map((btn,index)=>{
							return(
								<input type="button" style={{flex:1}} value={btn.title} key={index} onClick={btn.onClick}></input>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

function Alert({children}){
	return(
		<NotiBase btns={[{
			title:"확인",
			onClick:(e)=>{window.history.back()}
		}]}>
			<div>
				{children}
			</div>
		</NotiBase>
	)
}
function Confrim({children,ResultCallback}){
	return(
		<NotiBase btns={[{
			title:"확인",
			onClick:(e)=>{ResultCallback("ok",e)}
		},{
			title:"취소",
			onClick:(e)=>{ResultCallback("cancel",e)}
		}]}>
			<div>
				{children}
			</div>
		</NotiBase>
	)
}
function Prompt({children,ResultCallback}){
	return(
		<NotiBase btns={[{
			title:"확인",
			onClick:(e)=>{
				ResultCallback("ok",e)
			}
		},{
			title:"취소",
			onClick:(e)=>{
				ResultCallback("cancel",e)
			}
		}]}>
			<div style={{textAlign:"center", color:"white", fontSize:"large"}}>
				{children}
			</div>
			<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
				<input style={{margin:0,width:"100%"}} type="text" id="prompt_ok"></input>
			</div>
		</NotiBase>
	)
}
function Toast({children}){
	return(
		<div>
			{children}
		</div>
	)
}
export{Alert,Confrim,Prompt}