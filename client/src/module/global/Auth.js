let authResult=false

export function Authentication(callback){
	// console.log(`${process.env.REACT_APP_API_HOST}/api/signin`)
	fetch(`${process.env.REACT_APP_API_HOST}/api/signin`,{
		credentials:"include"
	}).then((res)=>{
		if(res.status===200){
			authResult=true
			return res.json()
		}
		authResult=false
		return
		// callback()
		// return res.json()
	}).then((data)=>{
		console.log(data)
		if(data!==undefined){
			callback(data)
		}
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