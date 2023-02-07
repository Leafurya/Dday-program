function GetTime(){
    var today=Date.now()+32400000
    var day=Math.floor(today/86400000)
    today-=(day*86400000)
    var hour=Math.floor(today/3600000)
    today-=(hour*3600000)
    var min=Math.floor(today/60000)
    today-=(min*60000)
    var sec=Math.floor(today/1000)
    
	return (""+day+"/"+hour+"/"+min+"/"+sec)
}
function GetDay(){
	let today=Date.now()+32400000;//now ms + 9hour ms
	return Math.floor(today/86400000);//86400000
}
// }
let oldDate;
function InitDate(){
	oldDate=localStorage.getItem("oldDate");
	if(oldDate==null){ //non exist data in localstorage
		oldDate=GetDay();
		localStorage.setItem("oldDate",oldDate); //create oldDate item
	}
	else{
		oldDate=Number(oldDate);
	}
}
function UpdateOldDate(dateDelta){
	oldDate+=dateDelta;
	localStorage.setItem("oldDate",(oldDate+dateDelta));
}
function IsNextDay(){
	let today=GetDay();
	let delta=today-oldDate;
	console.log("delta",delta);
	return delta;
}

module.exports.GetTime=GetTime;
module.exports.GetDay=GetDay;
module.exports.UpdateOldDate=UpdateOldDate;
module.exports.IsNextDay=IsNextDay;
module.exports.InitDate=InitDate;