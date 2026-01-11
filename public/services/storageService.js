export async function setKeyValue(key, value) {
    chrome.storage.local.set({ [key]: value })
}

export async function getKeyValue(key) {
    const res = await chrome.storage.local.get([key])
    return res[key] || {}
}

export async function getTaskDict() {
    const res = await chrome.storage.local.get()
    let taskDict = {}
    const excludeKeys = ["log", "currentTask", "lightMode"]
    for(const key in res){
        if(!excludeKeys.includes(key)){
            taskDict[key] = res[key]
        }
    }
    return taskDict
}

export async function deleteKey(key) {
    chrome.storage.local.remove([key])
}
