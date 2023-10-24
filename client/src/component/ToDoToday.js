import React from 'react'
import TopNavigator from './TopNavigator';
import { TaskLists } from './sub-compo/ProjectSubCompos';
import todoList from '../module/global/ToDo';
import { useNavigate } from 'react-router-dom';
import { GetAttendance } from '../module/AttendanceModule';

export default ({})=>{
	const navigate=useNavigate()
	return(
		<div className="borad">
			<TopNavigator title="오늘 할 일" stat={0}></TopNavigator>
			<div className={"main_platform project_board"}>
				<div>
					<div><h2 className='base_style'>꾸준함의 힘</h2></div>
					<div className='base_style'>{`연속 출석 ${GetAttendance()}일째`}</div>
				</div>
				{/* <div><h4 className="project_content base_style"></h4></div> */}
				<ul>
					<TaskLists project={todoList}></TaskLists>
				</ul>
			</div>
			<div className="function_btns">
				<input className='function_btn' type="button" value="뒤로" onClick={()=>{
					window.history.back()
				}}></input>
				<input className="when_ready function_btn" type="button" value="수정" onClick={()=>{
					navigate(`/ToDoModify`)
				}}></input>
			</div>
		</div>
	)
}