function orderRect(arr) {
    let result = [];
    for (let [width, height] of arr) {
        let rect = createRect(width, height);
        result.push(rect);
    }
    result.sort((a, b) => a.compareTo(b));
    return result;

    function createRect(width, height) {

        let rect = {
            width: width,
            height: height,
            area: function () {
                return rect.width * rect.height;
            },
            compareTo: function (other) {
                let result = other.area() - rect.area();
                return result || (other.width - rect.width);
            }
        };
        return rect;
    }
}
