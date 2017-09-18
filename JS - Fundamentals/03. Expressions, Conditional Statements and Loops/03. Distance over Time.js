function distanceOverTime(input) {

    let v1 = Number(input[0])*1000;
    let v2 = Number(input[1])*1000;
    let time = Number(input[2])/3600;

    let distance = Math.abs(v1 * time - v2 * time);
    console.log(distance);
}