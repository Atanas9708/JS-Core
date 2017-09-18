function sortArray(arr, arg) {

    let ascendingSort = function (a, b) {
        return a - b;
    };

    let descendingSort = function (a, b) {
        return b - a;
    };

    let sortingArgs = {
        'asc':ascendingSort,
        'desc':descendingSort
    };

    return arr.sort(sortingArgs[arg]);
}

console.log(sortArray([14, 7, 17, 6, 8], 'desc'));