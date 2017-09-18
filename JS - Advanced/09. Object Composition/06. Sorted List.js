function solve() {
    
    let sortedList = (function () {
        let arr = [];
        return{
            size: 0,
            add: function (n) {
                arr.push(n);
                this.size++;
                arr = arr.sort((a, b) => a - b);
            },
            remove: function (index) {
                if (index >= 0 && index < arr.length){
                    arr.splice(index,1);
                    this.size--;
                    arr = arr.sort((a, b) => a - b);
                }
            },
            get: function (index) {
                if (index < arr.length && index >= 0){
                    return arr[index];
                }
            }
        }
    })();

    return sortedList;
}

let list = solve();
list.add(1);
list.add(2);
list.add(3);
console.log(list.size);
list.remove(1);
console.log(list.size);
console.log(list.get(1));


