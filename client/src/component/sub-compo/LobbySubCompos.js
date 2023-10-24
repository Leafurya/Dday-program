import { StyledLink } from '../../module/GlobalModule';
import projectBundle from '../../module/global/DataBundle';
import todoList from '../../module/global/ToDo';

import "../../style/Template.css"

const prjDoneStamp=<span className="project_done"></span>;
const taskDoneStamp=<span className="done_stamp"></span>;

function Progress({stat}){
	return(
		<div style={
			{
				position:"absolute",
				backgroundColor:"rgba(200,200,200,.5)",
				width:`${stat}%`,
				height:"100%",
				left:0
			}
		}></div>
	)
}
function GetProgressGraph(stat){
	if(stat===0){
		return{
			backgroundColor:"rgba(0,0,0,0)",
		}
	}
	return{
		background: `linear-gradient(to right,rgba(50,10,255,.3) ${stat}%,rgba(1,1,1,0) ${100-stat}%)`,
		// backgroundSize:`${stat}% 100%`,
		// backgroundRepeat:"no-repeat",
		// backgroundColor:"rgba(200,200,200,.5)",
	}
}
function ProjectCard({project}){
	let {name,start,taskDone,D,prjDone}=project
	let id=Date.now()+Math.random()
	let value=(project.stat.checkedTaskCount/project.stat.taskCount)*100
	let stat=(start?((value).toFixed(1)+"%"):"-%")
	let tasks=project.GetNowTasks()
	let state

	if(prjDone){
		state="프로젝트 끝"
	}
	else if(!start){
		state="시작 대기중..."
	}
	else{
		state=`성공률 ${stat}`
	}
	
	return(
		<li className="project_list_li" key={id}>
			<StyledLink to={`/Project?name=${name}`}>
				<input id={id} type="button" value={name} onClick={
					(event)=>{
					}
				}></input>
				{/* style={GetProgressGraph((tasks.CountChecked()/tasks.GetTaskCount())*100)}(taskDone?" task_done":"") */}

				<label className={"base_style project_list_label label_base "} htmlFor={id}>
					{/* <Progress stat={(tasks.CountChecked()/tasks.GetTaskCount())*100}></Progress> */}
					<div style={{display:"flex",flexDirection:"column"}}>
						<div className="project_list_day ">{"D"+D+project.GetDay()}</div>
						{/* {prjDone?prjDoneStamp:""} */}
						<div className="task_stat ">
							<span>{state}</span>
						</div>
					</div>
					<div className="project_list_name ">
						<span>{name}</span>
					</div>
					{/* {taskDone?taskDoneStamp:""} */}
					
				</label>
			</StyledLink>
		</li>
	)
}
function ToDoCard({}){
	let {done,stat}=todoList
	let id=Date.now()+Math.random()
	let value=(stat.checkedTaskCount/stat.taskCount)*100
	let _stat=((isNaN(value)?"0.0":(value.toFixed(1)))+"%")

	return(
		<li className="project_list_li" key={id}>
			<StyledLink to={`/ToDoToday`}>
				<input id={id} type="button" onClick={(event)=>{}}></input>
				<label className={"todo_style label_base"+(done?" task_done":"")} htmlFor={id}>
					<h2 className='base_style'>오늘 할 일</h2>
					{/* <div className="project_list_name">{name}</div> */}
					{/* {done?taskDoneStamp:""} */}
					<div className="task_stat base_style">
						<span>{`성공률 ${_stat}`}</span>
					</div>
				</label>
			</StyledLink>
		</li>
	)
}

function ProjectLists(){
	let lists=[<ToDoCard key={Date.now()}></ToDoCard>]

	Object.values(projectBundle.data).map((project)=>{
		lists.push(<ProjectCard key={project.name} project={project}></ProjectCard>)
	})
	return lists;
}
export {ProjectLists};