var Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  name: 'Shutdown Remote Service',
  description: 'Serviço de desligamento remoto',
  script: path.resolve(__dirname, 'server.js'),
});

svc.on('uninstall', function () {
  console.log('Uninstall complete.');
});
svc.uninstall();
