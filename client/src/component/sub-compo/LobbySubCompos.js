import { useNavigate } from 'react-router-dom';
import { StyledLink } from '../../module/GlobalModule';
import projectBundle from '../../module/global/DataBundle';
import StateConst from '../../module/global/StateConst';
import todoList from '../../module/global/ToDo';

import "../../style/Template.css"
import "../../style/ProjectCardStyle.css"
import ProgressBar from '../ProgressBar';
import { useState } from 'react';
import { toastRef } from '../Notices';

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
// function ProjectCard({project}){
// 	let {day,name,taskDone,D,state}=project
// 	let id=Date.now()+Math.random()
// 	let value=(project.stat.checkedTaskCount/project.stat.taskCount)*100
// 	let stat=(state===StateConst.ProjectStart?((value).toFixed(1)+"%"):"-%")
// 	let tasks=project.GetNowTasks()
// 	const navigate=useNavigate()
	
// 	return(
// 		<li className="project_list_li" key={id}>
// 			{/* <StyledLink to={`/Project?name=${name}`}> */}
// 				<input id={id} type="button" value={name} onClick={
// 					(event)=>{
// 						navigate(`/Project?name=${name}`)
// 					}
// 				}></input>
// 				{/* style={GetProgressGraph((tasks.CountChecked()/tasks.GetTaskCount())*100)}(taskDone?" task_done":"") */}

// 				<label className={"base_style project_list_label label_base "} htmlFor={id}>
// 					{/* <Progress stat={(tasks.CountChecked()/tasks.GetTaskCount())*100}></Progress> */}
// 					<div className='project_list_content'>
// 						<div style={{display:"flex",flexDirection:"column"}}>
// 							<div className="project_list_day ">{project.GetDay()}</div>
// 							{/* <div className="project_list_day ">{"D"+D+project.GetDay()}</div> */}
// 							<div className="task_stat ">
// 								<span>{["프로젝트 끝","수정 대기중...","시작 대기중...",`성공률 ${stat}`][state]}</span>
// 							</div>
// 						</div>
// 						<div className="project_list_name">
// 							<span>{name}</span>
// 						</div>
// 					</div>
// 					<ProgressBar state={state} progress={(tasks.CountChecked()/tasks.GetTaskCount())*100}></ProgressBar>
// 					{/* {taskDone?taskDoneStamp:""} */}
// 				</label>
// 			{/* </StyledLink> */}
// 		</li>
// 	)
// }
function Task({task,value,index,onChange}){
	// let task=project.GetNowTasks()
	return(
		<li>
			<input className='when_start' type="checkbox" id={"task"+index} defaultChecked={value} value={task} onChange={onChange}></input>
			<label className={`${value?" checked":""} task`} htmlFor={"task"+index}>
				<span className='check_box'></span>
				<span>&nbsp;{`${task}`}&nbsp;</span>
			</label>
		</li>
	)
}
function ProjectCard({project,day,title,tasks}){
	// let {day,name,taskDone,D,state}=project
	let id=Date.now()+Math.random()
	// let stat=(state===StateConst.ProjectStart?((value).toFixed(1)+"%"):"-%")
	// let tasks=project.GetNowTasks()
	const navigate=useNavigate()

	const [refresh,pageUpdate]=useState([]);

	console.log(tasks)

	return(
		<li style={{marginTop:"7px"}} className="card " key={id}>
			<header style={{display:"flex",flexDirection:"column"}}>
				<div className="title" style={{display:"flex", justifyContent:"space-between",padding:"15px 15px 5px 15px"}}>
					<input id={`day${id}`} type="button" onClick={
						(event)=>{
							
						}
					}></input>
					<input id={`title${id}`} type="button" onClick={
						(event)=>{
							
						}
					}></input>


					<label htmlFor={`day${id}`}>
						<span className=" project_list_day ">{day}</span>
					</label>
					<label className=" title" htmlFor={`title${id}`}>
						{title}
					</label>
				</div>
			</header>
			<div>
				<ul className="task_list">
					{
						Object.keys(tasks).map((task,index)=>{
							return <Task key={index} task={task} value={tasks[task]} index={index} onChange={(event)=>{
								project.taskDone=tasks.Set(task,event.target.checked)
								if(event.target.checked){
									document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
									document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
									project.stat.checkedTaskCount++
								}
								else{
									document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
									project.stat.checkedTaskCount--
								}
								projectBundle.Save()
								todoList.Save()
								pageUpdate([])
							}}></Task>
						})
					}
				</ul>
			</div>
			<div className="func_btns" style={{display:"flex",width:"100%",height:"20px"}}>
				<div>
					<input id={`modi${id}`} type="button" value={"수정"} onClick={
						(event)=>{
							/**
							 * 프로젝트 데이터 요청?
							 */
						}
					}></input>
					<label htmlFor={`modi${id}`}>
						<span className="base_style project_list_day ">수정</span>
					</label>
				</div>
			</div>
		</li>
	)
}
// function ToDoCard({}){
// 	let {done,stat,data,state}=todoList
// 	let id=Date.now()+Math.random()
// 	let progress=(data.CountChecked()/data.GetTaskCount())*100
// 	const navigate=useNavigate()

// 	console.log(todoList)

// 	return(
// 		<li className="project_list_li" key={id}>
// 			<div>
// 				<header style={{display:"flex",flexDirection:"column"}}>
// 					<div className='project_list_content title'>
// 						<div style={{display:"flex",flexDirection:"column"}}>
// 							<div style={{marginBottom:"5px"}} className=''>오늘 할 일</div>
// 						</div>
// 					</div>
					
// 				</header>
// 				<div>

// 				</div>
// 				<div className="func_btns" style={{display:"flex",width:"100%",height:"20px"}}>
// 					<div>
// 						<input id={`modi${id}`} type="button" value={"수정"} onClick={
// 							(event)=>{
// 								navigate(`/ToDoModify`)
// 							}
// 						}></input>
// 						<label htmlFor={`modi${id}`}>
// 							<span className="base_style project_list_day ">오늘 뭐하지?</span>
// 						</label>
// 					</div>
// 				</div>
// 			</div>
// 		</li>
// 	)
// }

function ProjectLists(){
	// let lists=[<ToDoCard key={Date.now()}></ToDoCard>]

	// Object.values(projectBundle.data).map((project)=>{
	// 	lists.push(<ProjectCard key={project.name} project={project}></ProjectCard>)
	// })
	return (
	<ul className="project_list_ul">
		<ProjectCard project={todoList} tasks={todoList.GetNowTasks()} day={"오늘 할 일"} title=""></ProjectCard>
		{
			Object.values(projectBundle.data).map((project)=>{
				return <ProjectCard key={project.name} project={project} tasks={project.GetNowTasks()} day={project.GetDay()} title={project.name}></ProjectCard>
			})
		}
	</ul>
	);
}
export {ProjectLists};