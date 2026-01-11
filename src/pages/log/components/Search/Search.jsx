import Select from "react-select"
import { useContext, useEffect} from "react"
import {searchHandler} from "../../utils/searchHandler.js"
import { SearchContext } from '../../contexts/SearchContext.jsx'

export default function Search (){

    const { setSearchResults, log } = useContext(SearchContext)

    const { generateSearchTerms, performSearch } = searchHandler(setSearchResults, log)

    useEffect(() => {
        performSearch({value: null, label: ""})
    }, [log])

    const styles = {
        container: (baseStyles) => ({...baseStyles,
             display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px'
        }),
        control: (baseStyles) => ({...baseStyles,
            width: '80%', height: '20px', fontSize: '14px', fontWeight: '600',
            color: 'var(--deep-purp)',
        }),
        menu: (baseStyles) => ({...baseStyles,
            width: '80%',
        }),
        option: (baseStyles, state) => ({...baseStyles,
            backgroundColor: state.isFocused ? 'var(--selected-task-bg-color)' : 'var(--deep-purp)',
            color: 'var(--white)',
            cursor: 'pointer',
            fontWeight: '300',
            ':active': {
            backgroundColor: 'var(--deep-purp)',
            }
        }),

    }
    return (
    <div className={styles.searchDiv}>
        <Select
            options={generateSearchTerms()}
            defaultValue={{}}
            onChange={(value, actionMeta) => {
                if(actionMeta.action === "select-option") performSearch(value)
                else if(actionMeta.action === "clear") performSearch({value: null, label: ""})
            }}
            isSearchable={true}
            placeholder={"Try '25 Nov 2025' or 'Lunch'"}
            isClearable={true}
            closeMenuOnSelect={true}
            styles={styles}
        />
    </div>
    )
}