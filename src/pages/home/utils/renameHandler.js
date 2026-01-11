import { refacName } from "./refacName.js";

let originalName = false


export function renameHandler(renameTask) {


    const onInput = (taskNameEl) => {
        if(originalName) return
        originalName = taskNameEl.textContent
        taskNameEl.textContent = ""
        taskNameEl.contentEditable = "true"
        taskNameEl.focus()

    }

    const rename = (taskId, taskNameEl, isATask) => {
        taskNameEl.contentEditable = "false"
        const newTaskName = refacName(taskNameEl.textContent.trim())
        if(newTaskName === "" || isATask(newTaskName)){
            taskNameEl.textContent = originalName
            originalName = false
            return
        }
        else{
            renameTask(taskId, newTaskName)
            originalName = false
        }
    }
    return {onInput, rename}
}