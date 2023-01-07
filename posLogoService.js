var Service = require("node-windows").Service;

var svc = new Service({
  name: "LS Hardware stationV1",
  description: "LS Hardware station for receipt Logo & Barcode & QRCode",
  script: "D:\\posLogo\\route.js",
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

// svc.on('install',function(){
//   svc.start();
// });

svc.install();
