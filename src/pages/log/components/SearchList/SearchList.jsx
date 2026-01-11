
import React from "react"
import styles from './SearchList.module.css'
export default function SearchList(props){
    return(
        <div className={styles.searchListDiv}>
            {Object.entries(props.searchResults).map(([key, value])=>(
                <React.Fragment key={key}>
                    <h3 className={styles.titleHead}>{key}</h3>
                    <ul className={styles.searchUl}>
                        {Object.entries(value).map(([item, val])=>(
                            <li className={styles.searchLi} key={`${key}_${item}`}>
                                <span className={styles.itemSpan}>{item}</span>
                                <span className={styles.valSpan}>{val}</span>
                            </li>
                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </div>
    )
}