let timeout = null
const WAIT_TIME = 300


export function deleteHandler(deleteTask) {

    const showDeleteBtn = (taskEl, deleteEl) => {
        if(timeout && (new Date().getTime() - timeout) < WAIT_TIME) return
        taskEl.style.transform = "translateX(-40px)"
        deleteEl.style.opacity = "1"
    }

    const hideDeleteBtn = (taskEl, deleteEl) => {
        taskEl.style.transform = "translateX(0)"
        deleteEl.style.opacity = "0"
        timeout = new Date().getTime()
    }

    const deleteTaskInst = (taskId, taskEl, deleteEl) => {
        deleteEl.style.opacity = "0"
        taskEl.style.transform = "translateX(-100%)"
        setTimeout(() => {
            deleteTask(taskId)
        }, 200);
    }

    return {showDeleteBtn, hideDeleteBtn, deleteTaskInst}
}