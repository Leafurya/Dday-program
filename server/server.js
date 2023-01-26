const express=require("express");
const app=express();
const port=8080;
const cors=require("cors");

let corsOption={
	origin:"http://localhost:3000",
	credentials:true
}
app.use(cors(corsOption));
//app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello react!");
});
app.get('/lobbydata',(req,res)=>{
	console.log(req.rawHeaders);
    res.send({name:"mango",data:"lobby"});
});

app.listen(port,()=>{
    console.log(port," server on");
});