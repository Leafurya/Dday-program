import { useGoogleLogin } from "@react-oauth/google"

export default ()=>{
	const login=useGoogleLogin({
		onSuccess: async (tokenResponse)=>{
			try{
				const {code}=tokenResponse
				console.log(tokenResponse)
				const res=await fetch("https://aiv.p-e.kr:2020/auth/google",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({code})
				})
				const data=await res.json()
				console.log(data)
			}catch(e){
				console.log(e)
			}
			// try{
			// 	const {access_token}=tokenResponse
			// 	console.log(tokenResponse)
			// 	const res=await fetch("https://aiv.p-e.kr:2020/api/signin/google",{
			// 		method:"POST",
			// 		headers:{
			// 			"Content-Type":"application/json"
			// 		},
			// 		body:JSON.stringify({token:access_token})
			// 	})
			// 	const data=await res.json()
			// 	console.log(data)
			// }catch(e){
			// 	console.log(e)
			// }
		},
		onFailure:(res)=>{console.log(res)},
		flow:"auth_code",
		accessType:"offline"
	})

	return(
		<input type="button" onClick={()=>{
			login()
		}} value="구글 로그인"></input>
	)
}
//  "4/0ATx3LY44bemqFDA9z_X0AI_scanqFs_gHwzhlvhrgcqTsuV4V-peCSus_y0ifSJMzimWPQ"