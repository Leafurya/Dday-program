import { SendMessage } from '../../module/SendMessageModule';

const prjDoneStamp=<span className="project_done"></span>;
const taskDoneStamp=<span className="done_stamp"></span>;

function ProjectCard(props){
	let name=props.project.name;
	let data=props.project.data;
	console.log("ProjectCard",data);
	let id=Date.now()+Math.random()

	let stat=(data.start?(((data.stat.checkedTaskCount/data.stat.taskCount)*100).toFixed(1)+"%"):"-%")

	return(
		<li className="project_list_li" key={id}>
			<input id={id} type="button" value={name} onClick={
				(event)=>{
					//props.PageCallback("Project",{name:event.target.value});
					SendMessage("change_page",["Project",event.target.value])
				}
			}></input>
			<label className={"project_list_label label_base"+(data.start?"":" not_start")+(data.taskDone?" task_done":"")} htmlFor={id}>
				<div className="project_list_day">{"D"+data.D+data.day}{data.prjDone?prjDoneStamp:""}</div>
				<div className="project_list_name">{name}</div>
				{/* <div></div>
				<div></div> */}
				{data.taskDone?taskDoneStamp:""}
				<span className="task_stat">
					<span>{"성공률"}</span><br></br>
					<span>{stat}</span>
				</span>
			</label>
		</li>
	)
}

function ProjectLists(props){
	let lists=[]
	const projects=SendMessage("get_data")
	// console.log("ProjectLists",projects)

	Object.keys(projects).map((prjName)=>{
		let project=projects[prjName]
		lists.push(<ProjectCard key={prjName} project={{"name":prjName,"data":project}}></ProjectCard>)
	})
	return lists;
}
export {ProjectLists};