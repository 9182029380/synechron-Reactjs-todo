import{ useState,useEffect } from "react";
import api from "./api";
import "./App.css";


function App1(){
    const [tasks, setTasks] = useState([]);
    const[task, setTask] = useState("");
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(true);
    const[saving, setSaving] = useState(false);

    async function fetchTasks(){
        try{
            setError("");
            const response = await api.get("/");
            setTasks(response.data);
        }catch (error){
            setError(error.response?.data?.message || "Failed to fetch tasks");
        }finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchTasks();
    },[]);

    async function addTask(){
        event.preventDefault();
        if(!task.trim()){
            setError("Task title cannot be empty");
            return;
        }
        try{
            setSaving(true);
            setError("");
            const response = await api.post("/", {title: task.trim()});
            setTasks((previousTasks) => [response.data, ...previousTasks]);
            setTask("");
        }catch (error){
            setError(error.response?.data?.message || "Failed to add task");
        } finally {
            setSaving(false);
        }
    }
    async function toggleTask(id,completed) {
        try {
            setError("");
            const response = await api.put(`/${id}`, {completed: !completed});
            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task.id === id ? response.data : task
                )
            );

        } catch (error) {
            setError(error.response?.data?.message || "Failed to update task");
        }

    }
    async  function deleteTask(id) {
        try {
            setError("");
            await api.delete(`/${id}`);
            setTasks((previousTasks) =>
                previousTasks.filter((task) => task.id !== id)
            );
        } catch (error) {
            setError(error.response?.data?.message || "Failed to delete task");
        }
    }

    const completedTasksCount = tasks.filter((task) => task.completed).length;

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <p>Organize your daily tasks</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={addTask} className="input-section">
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Add"}
                </button>
            </form>
            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="empty-message">No tasks available. Add a new task!</p>
            ) : (
                <>
                    <h3>My Tasks ({tasks.length})</h3>
                    <ul className="task-list">
                        {tasks.map((item) => (
                            <li key={item.id} className="task-item">
                                <label className="task-label">
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        onChange={() => toggleTask(item.id, item.completed)}
                                    />
                                    <span className={item.completed ? "completed" : ""}>
                                        {item.title}
                                    </span>
                                </label>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(item.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p>Completed Tasks: {completedTasksCount}</p>
                </>
            )}
        </div>
    );

}

export default App1;