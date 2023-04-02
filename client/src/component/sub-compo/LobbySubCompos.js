const prjDoneStamp=<span className="project_done"></span>;
const taskDoneStamp=<span className="done_stamp"></span>;
function ProjectCard(props){
	let name=props.project.name;
	let data=props.project.data;
	let i=props.index;
	console.log("ProjectCard",data);
	return(
		<li className="project_list_li" key={i}>
			<input id={"prj"+i} type="button" value={name} onClick={
				(event)=>{
					props.PageCallback("Project",{name:event.target.value});
				}
			}></input>
			<label className={"project_list_label label_base"+(data.start?"":" not_start")+(data.taskDone?" task_done":"")} htmlFor={"prj"+i}>
				<div className="project_list_day">{"D"+data.D+data.day}{data.prjDone?prjDoneStamp:""}</div>
				<div className="project_list_name">{name}</div>
				{/* <div></div>
				<div></div> */}
				{data.taskDone?taskDoneStamp:""}
				<span className="task_stat">
					<span>{"성공률"}</span><br></br>
					<span>{props.stat}</span>
				</span>
			</label>
		</li>
	)
}
function ProjectLists(props){
	let projects=props.projects;
	let project;
	let stat;
	let lists=[];
	let index=0;
	for(let name in projects){
		project=projects[name]
		stat="";
		stat=(project.start?(((project.stat.checkedTaskCount/project.stat.taskCount)*100).toFixed(1)+"%"):"-%")
		lists.push(<ProjectCard key={index} PageCallback={props.PageCallback} project={{"name":name,"data":project}} stat={stat} index={index}></ProjectCard>)
		index++;
	}
	return lists;
}
export {ProjectLists};