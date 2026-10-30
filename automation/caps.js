// Shared capture lists
var ROUTERS = ["R1","R2","R3","R4","R5","R6","R7","R8"];
function each(cmd, devs) { var a = []; devs = devs || ROUTERS; for (var i = 0; i < devs.length; i++) a.push([devs[i], cmd]); return a; }
