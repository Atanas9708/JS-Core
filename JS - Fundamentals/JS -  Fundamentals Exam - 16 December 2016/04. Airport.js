function airport(input) {

  let landed = [];
  let towns = {}

  for (let row of input){

      let [id, town, passengers, action] = row.split(' ');
      passengers = Number(passengers);

      if(action === 'depart'){
          if(landed.includes(id)){
              if(!towns.hasOwnProperty(town)){
                  towns[town] = {

                      arrivals: 0,
                      departures: 0,
                      planes: new Set()
                  };
              }

              towns[town].departures += passengers;
              landed.splice(landed.indexOf(id), 1);
              towns[town].planes.add(id);
          }
      } else {
          if(!landed.includes(id)){
              if(!towns.hasOwnProperty(town)){
                  towns[town] = {
                      arrivals: 0,
                      departures: 0,
                      planes: new Set()
                  };
              }
              towns[town].arrivals += passengers;
              landed.push(id);
              towns[town].planes.add(id);
          }
      }
  }

  landed = landed.sort((a, b) => a.localeCompare(b)).map(p => `- ${p}`);
    console.log('Planes left:');
    landed.forEach(p => console.log(p));

    function sort(a, b) {
        return towns[b].arrivals - towns[a].arrivals || a.localeCompare(b);
    }

    let townSortedKeys = Object.keys(towns).sort((a, b) => sort(a, b));

    for (let town of townSortedKeys){

        let planes = Array.from(towns[town].planes).sort((a, b) => a.localeCompare(b)).map(p => `-- ${p}`);

        console.log(town);
        console.log(`Arrivals: ${towns[town].arrivals}`);
        console.log(`Departures: ${towns[town].departures}`);
        console.log('Planes:');
        planes.forEach(p => console.log(p));
    }
}

airport([
    "Boeing474 Madrid 300 land",
    "AirForceOne WashingtonDC 178 land",
    "Airbus London 265 depart",
    "ATR72 WashingtonDC 272 land",
    "ATR72 Madrid 135 depart"
])