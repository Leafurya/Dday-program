import { StyledLink } from '../../module/GlobalModule';
import { SendMessage } from '../../module/SendMessageModule';
import projectBundle from '../../module/global/DataBundle';

const prjDoneStamp=<span className="project_done"></span>;
const taskDoneStamp=<span className="done_stamp"></span>;

function ProjectCard({project}){
	let {name,start,taskDone,D,day,prjDone}=project
	// let name=project.name;
	// let data=project.data;
	console.log("ProjectCard",project);
	let id=Date.now()+Math.random()

	let stat=(start?(((project.stat.checkedTaskCount/project.stat.taskCount)*100).toFixed(1)+"%"):"-%")

	return(
		<li className="project_list_li" key={id}>
			<StyledLink to={`/Project?name=${name}`}>
				<input id={id} type="button" value={name} onClick={
					(event)=>{
						//props.PageCallback("Project",{name:event.target.value});
						// SendMessage("change_page",["Project",event.target.value])
					}
				}></input>
				<label className={"project_list_label label_base"+(start?"":" not_start")+(taskDone?" task_done":"")} htmlFor={id}>
					<div className="project_list_day">{"D"+D+project.GetDay()}{prjDone?prjDoneStamp:""}</div>
					<div className="project_list_name">{name}</div>
					{/* <div></div>
					<div></div> */}
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

function ProjectLists(){
	let lists=[]
	// console.log("ProjectLists",projects)

	Object.values(projectBundle.data).map((project)=>{
		lists.push(<ProjectCard key={project.name} project={project}></ProjectCard>)
	})
	return lists;
}
export {ProjectLists};