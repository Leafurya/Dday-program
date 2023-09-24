const { Link } = require("react-router-dom");
const { default: styled } = require("styled-components");

const StyledLink=styled(Link)`
	text-decoration:none;
	color:black;
`
const compoManager={}

// module.exports.StyledLink=StyledLink
export {StyledLink,compoManager}