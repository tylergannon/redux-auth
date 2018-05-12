var borth = {
    "react": "^15.2.1",
    "react-addons-test-utils": "^0.14.3",
    "react-dom": "^15.2.1",
    "react-hot-loader": "1.3.0",
    "react-redux": "^3.1.2",
    "react-select": "^1.0.0-beta13",
    "react-tap-event-plugin": "^0.2.1",
    "react-transmit": "3.0.6"
}

var reducer = function(record, item) {
    var name = item[0]
    var version = item[1]
    if (name.indexOf('@')==0) {
        record.remove.push('babel-' + name.split('/')[1])
    } else {
        record.remove.push(name)
    }
    record.add.push(name + '@latest')
    return record
}

var entries = Object.entries(borth).reduce(reducer, {remove: [], add: []})
console.log('yarn remove ' + entries.remove.join(' '))
console.log('yarn add ' + entries.add.join(' '))

