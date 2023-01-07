var Service = require('node-windows').Service;

var svc = new Service({
  name:'POS Logo & Barcode & QR Helper',
  description: 'LS BUSINESS CENTRAL POS Logo & Barcode & QR Helper',
  script: 'D:\\posLogo\\route.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
});



// svc.on('install',function(){
//   svc.start();
// });

svc.install();