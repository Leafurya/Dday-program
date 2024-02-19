import StateConst from "./global/StateConst"

// const _nowDataVersion=2
/**
 * history는 하루가 지나고 앱을 켰을때 그 날의 히스토리가 생성되고 할 일이 업데이트 될때마다 히스토리도 업데이트 된다.
 * history객체는 프로젝트당 하나씩 가지고 있다. 오늘 뭐 하지 또한 history객체를 가지고 있다.
 */
class History{ //프로젝트 시작 날짜. 총 할 일 개수. 각 일마다 완료한 할 일 개수.
	constructor(){
		this.startDay=1 //Date
		this.todoHistory=1 //{Date:[total,done], ...}
	}
}
export class Stat{
	constructor(taskCount){
		this.taskCount=taskCount
		this.checkedTaskCount=0
	}
}
class DPlus{
	constructor(day,description,tasks){
		// this.version=_nowDataVersion
		this.D="+"
		this.state=StateConst.WaitToStart
		// this.start=false
		this.tasks=tasks
		this.day=day
		this.description=description
		try{
			this.stat=new Stat(Object.keys(tasks).length)
		}catch(e){
			this.stat=new Stat(0)
		}
		// this.prjDone=false
		this.taskDone=false
	}
}
class DMinus{
	constructor(day,description,tasks,lastTasks){
		// this.version=_nowDataVersion
		this.D="-"
		this.state=StateConst.WaitToStart
		// this.start=false
		this.tasks=tasks
		this.day=day
		this.description=description
		try{
			this.stat=new Stat(Object.keys(tasks).length)
		}catch(e){
			this.stat=new Stat(0)
		}
		// this.prjDone=false
		this.taskDone=false

		if(lastTasks){
			this.lastTasks=lastTasks
		}
	}
}
function CreateDataObj(description,tasks,D,day,lastTasks){
	let data
	switch(D){
		case "+":
			data=new DPlus(day,description,tasks)
			break
		case "-":
			data=new DMinus(day,description,tasks,lastTasks)
			break
	}
	return data
}

export{CreateDataObj}
