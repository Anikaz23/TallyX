import {useState} from 'react'

export default function useLightMode() {
    const [isLightMode, setIsLightMode] = useState(chrome.runtime.sendMessage({action: "getLightMode"}), (response) => {
        return response.lightMode
    })

    const toggleLightMode = () => {
        setIsLightMode(!isLightMode)
        if(!isLightMode) document.body.classList.add('light-mode')
        else document.body.classList.remove('light-mode')

        chrome.runtime.sendMessage({action: "setLightMode", lightMode: !isLightMode})
    }
    return toggleLightMode
}