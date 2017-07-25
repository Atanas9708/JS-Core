function mapSort(map, sortCriteria) {
    if(sortCriteria === undefined){
        sortCriteria = function (a,b ) {
            return a[0].toString().localeCompare(b[0].toString());
        }
    }

    let sortedMap = new Map();
    for (let [key, value] of Array.from(map).sort(sortCriteria)){
        sortedMap.set(key, value);
    }

    return sortedMap;
}

module.exports = mapSort;