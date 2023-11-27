import React from "react";

export default ({children,article})=>{
	return(
		<div className="notice_background">
			<div className="platform_base">
				<div className="article">
					{article}
				</div>
				{children}
			</div>
		</div>
	)
}