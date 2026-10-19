import { useState } from 'react'
import './App.css'

function App() {
    const[tasks,setTasks]=useState([]);
    console.log(tasks);
    const [task,setTask]=useState("");

    function addTask(){
        if(task.trim()===""){
            return;
        }
        const newTask={
            id:Date.now(),
            title:task,
            completed:false
        };
        setTasks([...tasks,newTask]);
        setTask("");
    }
    function toggleTask(id){
        const updatedTasks=tasks.map((task)=>{
            if(task.id===id){
                return {
                    ...task,
                    completed:!task.completed
                };
            }
            return task;
        });
        setTasks(updatedTasks);
    }
    function deleteTask(id){
        const updatedTasks=tasks.filter((task)=>task.id!==id);
        setTasks(updatedTasks);
    }
    return (
        <div className="App">
            <h1>Task Manager</h1>
            <p>Organize your daily tasks</p>
            <div className ="input-section">
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={task}
                    onChange={(e)=>setTask(e.target.value)}
                    onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                    addTask();
                    }
                    }
                    }/>
                <button onClick={addTask} >Add </button>
            </div>
            <h3> My Tasks({tasks.length})</h3>

            {tasks.length===0 ?(
                <p className= "empty-message">No tasks available. Add a new task!</p>
            ):(
                <ul className="task-list">
                    {tasks.map((item)=>(
                        <li key={item.id} className=" task-item">
                            <label className="task-label">
                                <input type="checkbox"
                                       checked={item.completed}
                                       onChange={()=>toggleTask(item.id)}/>
                                <span className={item.completed ? "completed" : ""}>{item.title}</span>
                            </label>
                            <button className="delete-button" onClick={()=>deleteTask(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>


            );

}

export default App
