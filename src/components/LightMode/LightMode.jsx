import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import styles from './LightMode.module.css'

export default function LightMode(){

    const { toggleLightMode } = useContext(ThemeContext)
    return(
        <div className={styles.lightModeToggle} onClick={toggleLightMode}>
            <span className="material-icons">light_mode</span>
            <span className="material-icons">dark_mode</span>
        </div>
    )
}