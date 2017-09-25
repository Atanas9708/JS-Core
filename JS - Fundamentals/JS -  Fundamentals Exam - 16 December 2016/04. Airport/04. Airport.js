function solve(input) {

    let airport = new Map();
    let statistics = new Map();
    let planes = new Map();

    for (let line of input){
        let [planeId, town, passengers, action] = line.split(' ');

        if (action === 'land'){
            if (airport.has(planeId)){
                continue;
            } else {
                airport.set(planeId, 'land');
            }

            if (!statistics.has(town)){
                statistics.set(town, [0, 0]);
            }

            if (!planes.has(town)){
                planes.set(town, new Set());
            }

            statistics.get(town)[0] += Number(passengers);
            planes.get(town).add(planeId);
        } else {
            if (airport.has(planeId)){
                airport.delete(planeId);
            } else {
                continue;
            }

            if (!statistics.has(town)){
                statistics.set(town, [0, 0]);
            }

            if (!planes.has(town)){
                planes.set(town, new Set());
            }

            statistics.get(town)[1] += Number(passengers);
            planes.get(town).add(planeId);
        }
    }

    let sortedAirport = Array.from(airport).sort((a, b) => a[0].localeCompare(b[0]));
    console.log('Planes left:');
    for (let [plane, action] of sortedAirport){
        console.log(`- ${plane}`);
    }

    let sortedTowns = Array.from(statistics.entries()).sort(sortTowns);

    for (let [town, passengers] of sortedTowns){
        console.log(`${town}`);
        console.log(`Arrivals: ${passengers[0]}`);
        console.log(`Departures: ${passengers[1]}`);
        let sortedPlanes = Array.from(planes.get(town).values()).sort((a, b) => a.localeCompare(b));
        console.log('Planes:');
        for (let town of sortedPlanes){
            console.log(`-- ${town}`)
        }
    }

    function sortTowns(a, b) {
        let aArrivals = a[1][0];
        let bArrivals = b[1][0];

        let firstCriteria = bArrivals - aArrivals;

        if (firstCriteria !== 0){
            return firstCriteria;
        } else {
            return a[0].localeCompare(b[0]);
        }
    }
}

solve(
    [
        "Boeing474 Madrid 300 land",
        "AirForceOne WashingtonDC 178 land",
        "Airbus London 265 depart",
        "ATR72 WashingtonDC 272 land",
        "ATR72 Madrid 135 depart"
    ]
);