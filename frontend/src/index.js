// Make Mithril happy
if (!global.window) {
    global.window = global.document = global.requestAnimationFrame = undefined;
}
var m = require('mithril');
var render = require('mithril-node-render');

function App() {
    return render.sync(m('span', 'huhu'))
}

App()
