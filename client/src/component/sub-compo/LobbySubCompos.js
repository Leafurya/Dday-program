import { StyledLink } from '../../module/GlobalModule';
import projectBundle from '../../module/global/DataBundle';
import StateConst from '../../module/global/StateConst';
import todoList from '../../module/global/ToDo';

import "../../style/Template.css"
import ProgressBar from '../ProgressBar';

// const prjDoneStamp=<span className="project_done"></span>;
// const taskDoneStamp=<span className="done_stamp"></span>;

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
	let {day,name,taskDone,D,state}=project
	let id=Date.now()+Math.random()
	let value=(project.stat.checkedTaskCount/project.stat.taskCount)*100
	let stat=(state===StateConst.ProjectStart?((value).toFixed(1)+"%"):"-%")
	let tasks=project.GetNowTasks()
	
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
					<div className='project_list_content'>
						<div style={{display:"flex",flexDirection:"column"}}>
							<div className="project_list_day ">{project.GetDay()}</div>
							{/* <div className="project_list_day ">{"D"+D+project.GetDay()}</div> */}
							<div className="task_stat ">
								<span>{["프로젝트 끝","수정 대기중...","시작 대기중...",`성공률 ${stat}`][state]}</span>
							</div>
						</div>
						<div className="project_list_name">
							<span>{name}</span>
						</div>
					</div>
					<ProgressBar state={state} progress={(tasks.CountChecked()/tasks.GetTaskCount())*100}></ProgressBar>
					{/* {taskDone?taskDoneStamp:""} */}
				</label>
			</StyledLink>
		</li>
	)
}
function ToDoCard({}){
	let {done,stat,data}=todoList
	let id=Date.now()+Math.random()
	let value=(stat.checkedTaskCount/stat.taskCount)*100
	let _stat=((isNaN(value)?"0.0":(value.toFixed(1)))+"%")
	let progress=(data.CountChecked()/data.GetTaskCount())*100
	return(
		<li className="project_list_li" key={id}>
			<StyledLink to={`/ToDoToday`}>
				<input id={id} type="button" onClick={(event)=>{}}></input>
				<label className={"todo_style label_base"+(done?" task_done":"")} htmlFor={id}>
					<div className='project_list_content'>
						<div style={{display:"flex",flexDirection:"column"}}>
							<h2 className='base_style'>오늘 할 일</h2>
							<div className="task_stat base_style">
								<span>{stat.taskCount?`성공률 ${_stat}`:"오늘 뭐하지?"}</span>
							</div>
						</div>
					</div>
					<ProgressBar state={StateConst.ProjectStart} progress={isNaN(progress)?0:progress}></ProgressBar>
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