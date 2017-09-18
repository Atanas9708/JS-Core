function aggregateElements(arr) {

    function aggregateElements(elem,start,func) {

        for (let e of elem){

            start = func(start,e );
        }
        return start;
    }

    console.log(aggregateElements(arr, 0, (a,b) => a + b));
    console.log(aggregateElements(arr, 0, (a,b) => a + 1/b));
    console.log(aggregateElements(arr, '', (a,b) => a + b));
}

console.log(aggregateElements([1,2,3,4,5]));