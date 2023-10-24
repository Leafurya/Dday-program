import { StyledLink } from '../../module/GlobalModule';
import projectBundle from '../../module/global/DataBundle';
import todoList from '../../module/global/ToDo';
import ToDoToday from '../ToDoToday';

const prjDoneStamp=<span className="project_done"></span>;
const taskDoneStamp=<span className="done_stamp"></span>;

function ProjectCard({project}){
	let {name,start,taskDone,D,prjDone}=project
	let id=Date.now()+Math.random()

	let stat=(start?(((project.stat.checkedTaskCount/project.stat.taskCount)*100).toFixed(1)+"%"):"-%")

	return(
		<li className="project_list_li" key={id}>
			<StyledLink to={`/Project?name=${name}`}>
				<input id={id} type="button" value={name} onClick={
					(event)=>{
					}
				}></input>
				<label className={"project_list_label label_base"+(start?"":" not_start")+(taskDone?" task_done":"")} htmlFor={id}>
					<div className="project_list_day">{"D"+D+project.GetDay()}{prjDone?prjDoneStamp:""}</div>
					<div className="project_list_name">{name}</div>
					{taskDone?taskDoneStamp:""}
					<span className="task_stat">
						<span>{"성공률"}</span><br></br>
						<span>{stat}</span>
					</span>
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
				<label className={"project_list_label label_base"+(done?" task_done":"")} htmlFor={id}>
					<h2>오늘 할 일</h2>
					{/* <div className="project_list_name">{name}</div> */}
					{done?taskDoneStamp:""}
					<span className="task_stat">
						<span>{"성공률"}</span><br></br>
						<span>{_stat}</span>
					</span>
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