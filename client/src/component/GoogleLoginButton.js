import { useGoogleLogin } from "@react-oauth/google"

export default ()=>{
	const login=useGoogleLogin({
		onSuccess:(res)=>{console.log(res)},
		onFailure:(res)=>{console.log(res)},
		flow:"auth_code"
	})

	return(
		<input type="button" onClick={()=>(login())} value="구글 로그인"></input>
	)
}
//  "4/0ATx3LY44bemqFDA9z_X0AI_scanqFs_gHwzhlvhrgcqTsuV4V-peCSus_y0ifSJMzimWPQ"