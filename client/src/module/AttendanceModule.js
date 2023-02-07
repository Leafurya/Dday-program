let attendance;
function InitAttendance(){
	attendance=localStorage.getItem("attendance");
	if(attendance==null){
		attendance=0;
		localStorage.setItem("attendance",0);
	}
}
function UpdateAttendance(dateDelta){
	attendance++;
	if(dateDelta>1){
		attendance=0;
	}
	localStorage.setItem("attendance",attendance);
}
function GetAttendance(){
	return attendance;
}

module.exports.InitAttendance=InitAttendance;
module.exports.UpdateAttendance=UpdateAttendance;
module.exports.GetAttendance=GetAttendance;