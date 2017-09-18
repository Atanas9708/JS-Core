let array = require('./data');

function sortProp(prop) {
    return array.sort((a, b) => a[prop].localeCompare(b[prop]))
}

function filterProp(prop, value) {
    return array.filter(a => a[prop] === value)
}

module.exports = {sortProp, filterProp};