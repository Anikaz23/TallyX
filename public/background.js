import { getKeyValue, setKeyValue, getTaskDict, deleteKey} from "./services/storageService.js"


let currentTask = null

chrome.storage.onChanged.addListener( async (changes, area) => {
    for (let key in changes) {
        if (key === "currentTask"){

            const taskId = changes[key].newValue || null
            if(taskId) {
                getKeyValue(taskId).then(
                    (task) => {
                        currentTask = {[taskId]: task}
                        toggleBadge()
                    }
                )
            } else {
                currentTask = null
                toggleBadge()
            }
        }
        if(currentTask && key == Object.keys(currentTask)[0]){
            currentTask = {[key]: changes[key].newValue}
            toggleBadge()
        }
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    handleRequest(request, sendResponse)
    return true
})

chrome.commands.onCommand.addListener(async (command) => {
    const contexts = await chrome.runtime.getContexts({contextTypes:["POPUP"]})
    if(contexts.length === 0){
        handleCommand()
    }
})


// functions

async function handleRequest(request, sendResponse){
    switch(request.action){
        case "getTaskDict":
            const taskDict =  await getTaskDict()
            sendResponse({taskDict: taskDict})
            break
        case "setTask":
            await setKeyValue(request.taskId, request.task)
            break
        case "deleteTask":
            await deleteKey(request.taskId)
            break
        case "setLog":
            await setKeyValue("log", request.log)
            break
        case "getLog":
            const log = await getKeyValue("log")
            sendResponse({log: log})
            break
        case "setCurrentTask":
            await setKeyValue("currentTask", request.currentTask)
            break
        case "getCurrentTask":
            const currentTask = await getKeyValue("currentTask")
            sendResponse({currentTask: currentTask})
            break
        case "setLightMode":
            await setKeyValue("lightMode", request.lightMode)
            break
        case "getLightMode":
            const lightMode = await getKeyValue("lightMode")
            sendResponse({lightMode: lightMode})
            break
    }
}

async function handleCommand(){
    if(currentTask && Object.keys(currentTask).length > 0){
        const taskId = Object.keys(currentTask)[0]
        const task = currentTask[taskId]
        task.taskValue += 1
        await setKeyValue(taskId, task)
        currentTask[taskId] = task
        toggleBadge()
    } else {
        console.error("No current task set")
    }
}

function toggleBadge(){
    if(currentTask){
        chrome.action.setBadgeBackgroundColor({color: 'rgb(48, 3, 83)'})
        const taskId = Object.keys(currentTask)[0]
        const taskValue = currentTask[taskId].taskValue
        chrome.action.setBadgeText({text: taskValue.toString()})
    }
    else chrome.action.setBadgeText({text: ""})
}


