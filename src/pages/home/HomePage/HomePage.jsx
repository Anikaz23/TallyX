
import { TaskContext } from "../contexts/TaskContext.jsx"
import { useState, useEffect } from "react"
import TaskList from "../components/TaskList/TaskList.jsx"
import AddTask from "../components/AddTask/AddTask.jsx"
import Header from "../../../components/Header/Header.jsx"
import { send } from "vite"

export default function HomePage() {
    const [taskDict, setTaskDict] = useState({})

    const [ currentTaskId, setCurrentTaskId ] = useState(false)

    const [log, setLog] = useState({})


    useEffect(() => {
        chrome.runtime.sendMessage({action: "getTaskDict"}, (response) => {
            setTaskDict(response.taskDict)
        })

        chrome.runtime.sendMessage({action: "getLog"}, (response) => {
            setLog(response.log)
        })

        chrome.runtime.sendMessage({action: "getCurrentTask"}, (response) => {
            setCurrentTaskId(response.currentTask)
        })

        chrome.runtime.sendMessage({action: "checkUnassignedCommands"}, (response)=>{
            if(response.message){
                toast(
                    <span>
                        {response.message}
                        <a href={response.link} target="_blank" rel="noreferrer" style={{marginLeft: "5px", textDecoration: "underline"}}>Open!</a>
                    </span>

                )
            }
        })

        const handleMessage = (request, sender, sendResponse) => {
            console.log("HomePage received message:", request  )
            if(request.action === "updateTaskDict"){
                setTaskDict(request.taskDict)
                sendResponse({status: 0})
            }
        }

        chrome.runtime.onMessage.addListener(handleMessage)

        return () =>{
            chrome.runtime.onMessage.removeListener(handleMessage)
        }
    }, [])

    const updateTask = (taskId, updatedTask) => {
        setTaskDict((prev) => ({
            ...prev,
            [taskId]: updatedTask
        }))
        chrome.runtime.sendMessage({action: "setTask", taskId: taskId, task: updatedTask})

        const date = new Date().toISOString().split('T')[0];
        const newLog = {
            ...log,
            [date]: {
                ...log[date],
                [taskId]: [updatedTask.taskName, updatedTask.taskValue]
            }
        }
        setLog(newLog)
        chrome.runtime.sendMessage({action: "setLog", log: newLog})
    }

    const isATask = (taskName) => {
        return Object.values(taskDict).some(task => task.taskName === taskName);
    }

    const renameTask = (taskId, newTaskName) => {
        const updatedTask = {...taskDict[taskId], taskName: newTaskName}
        setTaskDict((prev) => ({...prev,
            [taskId]: updatedTask
        }))
        chrome.runtime.sendMessage({action: "setTask", taskId: taskId, task: updatedTask})
    }

    const isCurrent = (taskId) =>{
        return taskId === currentTaskId
    }

    const setCurrentTask = (taskId) => {
        setCurrentTaskId(taskId)
        chrome.runtime.sendMessage({action: "setCurrentTask", currentTask: taskId})
    }

    const deleteTask = (taskId) => {
        if(currentTaskId === taskId){
            setCurrentTaskId(false)
            chrome.runtime.sendMessage({action: "setCurrentTask", currentTask: false})
        }
        setTaskDict((prev) => {
            const updatedTasks = { ...prev };
            delete updatedTasks[taskId];
            return updatedTasks;
        })
        chrome.runtime.sendMessage({action: "deleteTask", taskId: taskId})

        const newLog = {};
        for (const date in log) {
            const day = log[date];
            const { [taskId]: _, ...rest } = day;
            newLog[date] = rest;
        }
        setLog(newLog)
        chrome.runtime.sendMessage({action: "setLog", log: newLog})
    }

    return(
        <div id="homePageDiv">
            < Header address={{to: "/log", name: "history"}}/>
            <TaskContext value={{updateTask, isATask, renameTask, setCurrentTask, isCurrent, deleteTask}}>
                < AddTask />
                < TaskList taskDict={taskDict} />
            </TaskContext>
        </div>
    )
}