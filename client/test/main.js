function GetDeg(myX,myZ,trgX,trgZ){
	let originX=trgX-myX
	let originZ=trgZ-myZ

	let deg=Math.atan(originZ/originX)*(180.0/Math.PI)
	if(originX<0){
		return deg-180
	}
	return deg
}
