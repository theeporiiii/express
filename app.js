;  const express = require("express");
const morgan =require("morgan");
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// in memory storage for task
let tasks=[];

//routes to get all tasks
app.get('/',(req,res)=>{
    res.json(tasks)
})

//route to create a new task
app.post('/tasks',(req,res)=>{
const task=req.body
    tasks.push(task);
    res.send({
        message:"Tasks added",tasks
    })
})
//get tasks by id
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task = tasks.find(task=>task.id==id);
    if(!task){
        res.send("task not found")
    }else{
        res.json(task)
    }
    
})

//update
app.put('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const updatedTask=req.body
    const index=tasks.find(task=>task.id==id);
    if(index===-1){
        res.send("Task not found")
    
    }else{
        tasks.splice(index,1,updatedTask);
        //tasks[index]=updatedTasks
        res.send(tasks)
    }
})
app.delete('/dlt/:id',(req,res)=>{
    const id =req.params.id;
    const index=tasks.find(task=>task.id==id);
    if(index===-1){
        res.send("Task not found")
    
    }else{
        tasks.splice(index,1);
        res.send(tasks)
    }
})

app.listen(3005,(req,res)=>{
    console.log("port is up")
})