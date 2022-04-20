

var m = require('mithril')
var render = require('mithril-node-render')


var html = render.sync(m('span', 'huhu'))

module.exports = {
  AppView: html
}