const express=require("express");
const app=express();
const port=8080;
const cors=require("cors");
const fs=require('fs');

let corsOption={
	origin:"http://localhost:3000",
	credentials:true
}
app.use(cors(corsOption));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello react!");
});
app.get('/getdata',(req,res)=>{
	//var data;
	fs.readFile("./data/data.json","utf-8",(err,data)=>{
		//data=d;
		res.send(JSON.parse(data));
	});
	
});
app.post("/savedata",(req,res)=>{
	fs.readFile("./data/data.json","utf-8",(err,data)=>{
		var json=res.recv();
		data+=json
	})
})

app.listen(port,()=>{
    console.log(port," server on");
});