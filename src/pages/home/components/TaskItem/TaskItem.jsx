import styles from './TaskItem.module.css'
import {useContext, useRef} from "react"
import { TaskContext } from '../../contexts/TaskContext.jsx'
import {renameHandler} from '../../utils/renameHandler.js'
import { deleteHandler } from '../../utils/deleteHandler.js'


export default function TaskItem({taskId, taskName, taskValue, selectedBg}) {


    const taskHandler = useContext(TaskContext)
    const renameHandlerInst = renameHandler(taskHandler.renameTask)
    const deleteHandlerInst = deleteHandler(taskHandler.deleteTask)

    const taskRef = useRef(null)
    const deleteBarRef = useRef(null)
    const taskNameRef = useRef(null)
    const bgStyle = selectedBg ? {backgroundColor: selectedBg} : {}

    const counterHandler = (type) => {
        if(type === 'increment'){
            const updatedTask = {
                taskName: taskName,
                taskValue: taskValue + 1
            }
            taskHandler.updateTask(taskId, updatedTask)
        }
        else{
            if(taskValue === 0) return
            const updatedTask = {
                taskName: taskName,
                taskValue: taskValue - 1
            }
            taskHandler.updateTask(taskId, updatedTask)
        }
    }

    const selectHandler = () => {
        if(!taskHandler.isCurrent(taskId)){
            taskHandler.setCurrentTask(taskId)
        }
        else{
            taskHandler.setCurrentTask(false)
        }
    }

    return(
        <li className={styles.taskLi} style={bgStyle} >
            <div className = {styles.taskDiv} ref={taskRef} onClick={(e)=>{
                if(e.target === taskRef.current) selectHandler() }}>
                <span className={styles.taskNameSpan} ref={taskNameRef} onDoubleClick={() => renameHandlerInst.onInput(taskNameRef.current)} onKeyDown={(e) => {
                    if(e.key === "Enter")renameHandlerInst.rename(taskId, taskNameRef.current, taskHandler.isATask)}
                    }>
                    {taskName}
                </span>
                <div className={styles.counterDiv} >
                    <button className={styles.incrementBtn} onClick={()=>counterHandler("increment")}>+</button>
                    <span className={styles.taskValueSpan}>{taskValue}</span>
                    <button className={styles.decrementBtn} onClick={()=>counterHandler("decrement")}>-</button>
                    <span className={styles.deleteHvrSpan} onMouseOver={() => deleteHandlerInst.showDeleteBtn(taskRef.current, deleteBarRef.current)}></span>
                </div>
            </div>
            <div className={styles.deleteBarDiv} ref={deleteBarRef}>
                <span className={`${styles.deleteBtnSpan} material-icons`} onClick={() => deleteHandlerInst.deleteTaskInst(taskId, taskRef.current, deleteBarRef.current)}
                    onMouseLeave={() => deleteHandlerInst.hideDeleteBtn(taskRef.current, deleteBarRef.current)}>delete</span>
            </div>
        </li>
    )
}