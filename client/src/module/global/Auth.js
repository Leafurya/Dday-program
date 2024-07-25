let authResult=false

export function Authentication(callback){
	console.log(`${process.env.REACT_APP_API_HOST}/api/signin`)
	fetch(`${process.env.REACT_APP_API_HOST}/api/signin`,{
		credentials:"include"
	}).then((res)=>{
		if(res.status===200){
			authResult=true
			return res.text()
		}
		authResult=false
		callback()
	}).then((data)=>{
		console.log(data)
		callback()
	})
}
export function GetAuthResult(){
	return authResult
}
export function SetAuthResult(value){
	authResult=value
}
export function Logout(){
	
}