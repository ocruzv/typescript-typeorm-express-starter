import * as fs from 'fs';

let routes: Object = {};

fs.readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.ts$/) !== null && file !== 'index.ts') {
    var name = file.replace('.ts', '');
    routes[name] = require('./' + file).default;
  }
});

export default routes;
