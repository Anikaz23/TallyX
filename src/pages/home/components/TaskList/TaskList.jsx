
import TaskItem from "../TaskItem/TaskItem.jsx"
import styles from './TaskList.module.css'
import { useContext } from "react"

import { TaskContext } from "../../contexts/TaskContext.jsx"

export default function TaskList({taskDict}) {

    const {isCurrent} = useContext(TaskContext)

    return (
        <ul id={styles.taskListUl}>
            {Object.entries(taskDict).map(([taskId, taskData]) => (
                <TaskItem key={taskId} taskId={taskId} taskName={taskData.taskName} taskValue={taskData.taskValue}
                selectedBg={isCurrent(taskId) ? "rgba(121, 80, 179, 0.8)" : null}/>
            ))}
        </ul>
    )
}