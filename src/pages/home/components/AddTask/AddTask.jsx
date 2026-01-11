import {useRef,useContext} from "react"
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from "../../contexts/TaskContext.jsx"
import { refacName } from "../../utils/refacName.js";
import styles from './AddTask.module.css'

export default function AddTask() {
    const {updateTask, isATask} = useContext(TaskContext)
    const taskNameRef = useRef(null)
    const errRef = useRef(null)

    const blackList = ["log", "currenttask", "lightmode"]

    const addTask = () =>{
        if(taskNameRef.current.value.trim() === ""){
            errRef.current.innerText = "Task name cannot be empty!"
            return
        }

        let taskName = refacName(taskNameRef.current.value.trim())
        if(isATask(taskName)){
            errRef.current.innerText = "Task with this name already exists!"
            return
        }

        if(blackList.includes(taskName.toLowerCase())){
            errRef.current.innerText = "This task name is not allowed!"
            return
        }
        errRef.current.innerText = ""
        const newTaskId = uuidv4()
        const newTask = {
            taskName: taskName,
            taskValue: 0
        }
        updateTask(newTaskId, newTask)
        taskNameRef.current.value = ""
    }

    return (
        <div className={styles.addTaskDiv}>
            <input className={styles.addInp} type="text" placeholder="Enter task name" ref={taskNameRef}
                onKeyDown={(e)=>{
                    if(e.key === "Enter") addTask()
                }}
                onInput={()=>{
                    if(errRef.current) errRef.current.innerText = ""
                }}
            />
            <button className={styles.addBtn} onClick={addTask}>Add Task</button>
            <span className={styles.addErr} ref={errRef}></span>
        </div>
    )
}