function GetElement(id){ //씀
	return document.getElementById(id);
}

function CreateElement(obj){ //씀
	let ele=document.createElement(obj.element);
	// if(obj?.name){ele.name=obj.name;}
	// if(obj?.id) {ele.id=obj.id;}
	// if(obj?.type) {ele.type=obj.type;}
	// if(obj?.value) {ele.value=obj.value;}
	// if(obj?.classList) {ele.classList=obj.classList;}
	// if(obj?.onclick){ele.onclick=obj.onclick;}

	for(let attr in obj){
		ele[attr]=obj[attr]
	}
	//console.log("ele?.value",ele);
	return ele;
}
const taskCellIdSuffix="task_input";
let taskCellCount=0;
function CreateTaskInputCell(name,cntnt){ //씀
	let div=CreateElement({element:"li",classList:"task_input_div",id:taskCellCount+taskCellIdSuffix})
	let input=CreateElement({element:"textarea",name:name,value:cntnt,classList:["input"], rows:"1"})
	// let input=CreateElement({element:"input",name:name,value:cntnt,type:"text"})
	let delBtn=CreateElement({element:"input",name:(taskCellCount++)+"task_input",value:"-",type:"button",
		onclick:(event)=>{
			GetElement(event.target.name).remove();
		}
	})

	div.appendChild(input);
	div.appendChild(delBtn);

	taskCellCount++;
	return {div,input,delBtn};
}
function GetTaskFromInput(targetName){ //씀
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
function TextAreaKeyInput(e){
	console.log(e)
	if(e.keyCode===13){
		let textInput=e.target.parentElement.childNodes[0]
		GetElement("task_inputs").appendChild(CreateTaskInputCell("task_input",textInput.value).div);
		textInput.value=""
		textInput.focus()
		e.preventDefault()
	}
}

module.exports.CreateTaskInputCell=CreateTaskInputCell;
module.exports.GetElement=GetElement;
module.exports.GetTaskFromInput=GetTaskFromInput;
module.exports.CreateElement=CreateElement;
module.exports.TextAreaKeyInput=TextAreaKeyInput;
