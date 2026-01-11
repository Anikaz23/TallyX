import Header from '../../../components/Header/Header.jsx'
import Search from '../components/Search/Search.jsx'
import SearchList from '../components/SearchList/SearchList.jsx'
import { searchHandler } from '../utils/searchHandler.js'

import { useState, useEffect } from 'react'

import { SearchContext } from '../contexts/SearchContext.jsx'


export default function LogPage(){
    const [log, setLog] = useState({})
    const [searchResults, setSearchResults] = useState({})

    const searchHandlerInstance = searchHandler(setSearchResults, log)

    useEffect(() => {
        chrome.runtime.sendMessage({action: "getLog"}, (response) => {
            setLog(response.log)
            searchHandlerInstance.performSearch({value: null, label: ""})
        })
        return () => {}
    }, [])


    return(
        <SearchContext value={{ setSearchResults, log}}>
            < Header address={{to: "/", name: "home"}}/>
            <Search />
            < SearchList searchResults={searchResults} />
        </SearchContext>
    )
}