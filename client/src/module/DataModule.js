import StateConst from "./global/StateConst"

// const _nowDataVersion=2
export class Stat{
	constructor(taskCount){
		this.taskCount=taskCount
		this.checkedTaskCount=0
	}
}
class DPlus{
	constructor(day,discription,tasks){
		// this.version=_nowDataVersion
		this.D="+"
		this.state=StateConst.WaitToStart
		// this.start=false
		this.tasks=tasks
		this.day=day
		this.discription=discription
		this.stat=new Stat(Object.keys(tasks).length)
		// this.prjDone=false
		this.taskDone=false
	}
}
class DMinus{
	constructor(day,discription,tasks,lastTasks){
		// this.version=_nowDataVersion
		this.D="-"
		this.state=StateConst.WaitToStart
		// this.start=false
		this.tasks=tasks
		this.day=day
		this.discription=discription
		this.stat=new Stat(Object.keys(tasks).length)
		// this.prjDone=false
		this.taskDone=false

		if(lastTasks){
			this.lastTasks=lastTasks
		}
	}
}
function CreateDataObj(discription,tasks,D,day,lastTasks){
	let data
	switch(D){
		case "+":
			data=new DPlus(day,discription,tasks)
			break
		case "-":
			data=new DMinus(day,discription,tasks,lastTasks)
			break
	}
	return data
}

export{CreateDataObj}
