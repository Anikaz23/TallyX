
export function searchHandler(setSearchResults, log) {

    const generateSearchTerms = () =>{
        let terms = {}

        for(const date in log){
            if(!terms[date]) {
                const formattedDate = formatDateString(date)
                terms[date] = {value: date, label: formattedDate}
            }
            for(const entry in log[date]){
                const [name, count] = log[date][entry]
                if(!terms[entry]) terms[entry] = {value: entry, label: name}
            }
        }
        return Object.values(terms)
    }

    const performSearch = (obj) => {
        const {value, label} = obj
        let type = null
        let results = {}

        const date = new Date(label)
        if (!value) type = "all"
        else if(isNaN(date)) type = "task"
        else type = "date"

        if(type === "date"){
            results[label] = {}
            for(const entry in log[value]){
                const [name, count] = log[value][entry]
                results[label][name] = count
            }
        }
        else if(type === "task"){
            results[label] = {}
            for(const date in log){
                const formattedDate = formatDateString(date)
                for (const entry in log[date]){
                    const [name, count] = log[date][entry]
                    if(entry === value){
                        if(!results[label][formattedDate]) results[label][formattedDate] = {}
                        results[label][formattedDate] =  count
                    }
                }
            }
        }
        else {
            for(const date in log){
                const formattedDate = formatDateString(date)
                for(const entry in log[date]){
                    const [name, count] = log[date][entry]
                    if(!results[formattedDate]) results[formattedDate] = {}
                    results[formattedDate][name] = count
                }
            }
        }

        if(!results) console.error("No results found")
        setSearchResults(results)
    }


    return {generateSearchTerms, performSearch}
}

function formatDateString(dateString) {
    const dateObj = new Date(dateString)
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(dateObj);
}