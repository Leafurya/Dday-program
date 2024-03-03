import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


export default React.memo(()=>{
	const [param,setParam]=useSearchParams()
	const navigate=useNavigate()

	let project=param.get('name')

	return(
		<div>
			
		</div>
	)
})