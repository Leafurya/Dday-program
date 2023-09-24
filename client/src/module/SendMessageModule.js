let SendMessageFunc=null
function SetSendMessage(func){
	SendMessageFunc=func
	// console.log("set SendMessage",SendMessage)
}
function SendMessage(msg,param){
	return SendMessageFunc(msg,param)
}


module.exports.SetSendMessage=SetSendMessage
module.exports.SendMessage=SendMessage