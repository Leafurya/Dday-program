const { Link } = require("react-router-dom");
const { default: styled } = require("styled-components");

let StyledLink=styled(Link)`
	text-decoration:none;
	color:black;
`
let compoManager={}

module.exports.StyledLink=StyledLink
module.exports.compoManager=compoManager