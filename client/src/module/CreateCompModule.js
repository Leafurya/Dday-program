function GetElement(id){
	return document.getElementById(id);
}

function CreateElement(obj){
	let ele=document.createElement(obj.element);
	if(obj?.name){ele.name=obj.name;}
	if(obj?.id) {ele.id=obj.id;}
	if(obj?.type) {ele.type=obj.type;}
	if(obj?.value) {ele.value=obj.value;}
	if(obj?.classList) {ele.classList=obj.classList;}
	if(obj?.onclick){ele.onclick=obj.onclick;}
	//console.log("ele?.value",ele);
	return ele;
}
const taskCellIdSuffix="task_input";
let taskCellCount=0;
function CreateTaskInputCell(name,cntnt){
	let div=CreateElement({element:"li",classList:"task_input_div",id:taskCellCount+taskCellIdSuffix})
	let input=CreateElement({element:"input",name:name,value:cntnt,type:"text"})
	let delBtn=CreateElement({element:"input",name:(taskCellCount++)+"task_input",value:"-",type:"button",
		onclick:(event)=>{
			GetElement(event.target.name).remove();
		}
	})

	div.appendChild(input);
	div.appendChild(delBtn);

	taskCellCount++;
	console.log("CreateTaskInputCell",div);
	return div;
}
function GetTaskFromInput(targetName){
	let taskInputs=document.getElementsByName(targetName);
	let tasks={};
	for(var i=0;i<taskInputs.length;i++){
		if(taskInputs[i].value!=""){
			tasks[taskInputs[i].value]=false;
		}
	}
	if(Object.keys(tasks).length==0){
		tasks=null;
	}
	return tasks;
}

module.exports.CreateTaskInputCell=CreateTaskInputCell;
module.exports.GetElement=GetElement;
module.exports.GetTaskFromInput=GetTaskFromInput;
module.exports.CreateElement=CreateElement;
