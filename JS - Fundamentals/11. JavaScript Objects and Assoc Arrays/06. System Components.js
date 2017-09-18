function system(input) {

    let map = new Map();

    for (let row of input){

        let splitTokens = row.split(' | ');
        let systemName = splitTokens[0];
        let componentName = splitTokens[1];
        let subcomponentName = splitTokens[2];

        if(!map.has(systemName)){
            map.set(systemName, new Map());
        }

        if(!map.get(systemName).get(componentName)){
            map.get(systemName).set(componentName, []);
        }

        map.get(systemName).get(componentName).push(subcomponentName);
    }

    let sortedMap = Array.from(map.keys()).sort((s1, s2) => sortSystems(s1, s2));

    for (let system of sortedMap){

        console.log(system);
        let componentsSorted = Array.from(map.get(system).keys()).sort((c1, c2) => sortComponents(system, c1, c2));

        for (let component of componentsSorted){

            console.log(`|||${component}`);
            map.get(system).get(component).forEach(sc => console.log(`||||||${sc}`));
        }
    }

    function sortSystems(s1, s2) {
        if(map.get(s1).size != map.get(s2).size) {
            return map.get(s2).size - map.get(s1).size;
        } else {
            return s1.toLowerCase().localeCompare(s2.toLowerCase());
        }
    }

    function sortComponents(system, c1, c2) {
        return map.get(system).get(c2).length - map.get(system).get(c1).length;
    }

}

system([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
])