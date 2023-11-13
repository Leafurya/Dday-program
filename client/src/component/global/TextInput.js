import React from "react";
import { TextAreaKeyInput } from "../../module/CreateCompModule";

export default ({placeholder,className,name,value,disabled})=>{
	return(
		<textarea style={{
			border:"none",
			fontSize:"x-large",
			background:'none',
			color:"white",
			padding:"5px 20px",
			margin:"0",
		}} className={className} placeholder={placeholder} rows="1" onKeyDown={TextAreaKeyInput} wrap="off" data-name={name} defaultValue={value} disabled={disabled}></textarea>
	)
}