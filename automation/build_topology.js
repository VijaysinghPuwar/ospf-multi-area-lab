// OSPF lab topology builder (Packet Tracer 9 Script Engine). Re-runnable: removes every device first.
eval(SFM.getFileContents(BASE + "automation/lib.js"));
var T = { router: 0, sw: 1, pc: 8 };
var STRAIGHT = 8100, CROSS = 8101;
// name, type, model, x, y
var DEVICES = [
  ["ISP",     T.router, "2911",      700,  60],
  ["R1",      T.router, "2911",      700, 190],
  ["SW-BB",   T.sw,     "2960-24TT", 700, 330],
  ["R2",      T.router, "2911",      450, 330],
  ["R3",      T.router, "2911",      700, 470],
  ["R4",      T.router, "2911",      950, 330],
  ["R5",      T.router, "2911",      230, 330],
  ["R8",      T.router, "2911",       40, 330],
  ["PC-A",    T.pc,     "PC-PT",     230, 480],
  ["R6",      T.router, "2911",      700, 610],
  ["PC-B",    T.pc,     "PC-PT",     700, 740],
  ["R7",      T.router, "2911",     1170, 330],
  ["PARTNER", T.router, "2911",     1170, 190]
];
// id, devA, portA, devB, portB, cable
var LINKS = [
  ["L1",  "R1", "GigabitEthernet0/0", "SW-BB", "FastEthernet0/1", STRAIGHT],
  ["L2",  "R2", "GigabitEthernet0/0", "SW-BB", "FastEthernet0/2", STRAIGHT],
  ["L3",  "R3", "GigabitEthernet0/0", "SW-BB", "FastEthernet0/3", STRAIGHT],
  ["L4",  "R4", "GigabitEthernet0/0", "SW-BB", "FastEthernet0/4", STRAIGHT],
  ["L5",  "R1", "GigabitEthernet0/2", "R2", "GigabitEthernet0/2", CROSS],
  ["L6",  "R1", "GigabitEthernet0/1", "ISP", "GigabitEthernet0/0", CROSS],
  ["L7",  "R2", "GigabitEthernet0/1", "R5", "GigabitEthernet0/0", CROSS],
  ["L8",  "R5", "GigabitEthernet0/1", "R8", "GigabitEthernet0/0", CROSS],
  ["L9",  "R5", "GigabitEthernet0/2", "PC-A", "FastEthernet0", CROSS],
  ["L10", "R3", "GigabitEthernet0/1", "R6", "GigabitEthernet0/0", CROSS],
  ["L11", "R6", "GigabitEthernet0/1", "PC-B", "FastEthernet0", CROSS],
  ["L12", "R4", "GigabitEthernet0/1", "R7", "GigabitEthernet0/0", CROSS],
  ["L13", "R7", "GigabitEthernet0/1", "PARTNER", "GigabitEthernet0/0", CROSS]
];
var HOSTS = [ ["PC-A", "10.1.10.10", "255.255.255.0", "10.1.10.1"], ["PC-B", "10.2.10.10", "255.255.255.0", "10.2.10.1"] ];

// 1. clean
var names = [];
for (var i = 0; i < NET.getDeviceCount(); i++) names.push(NET.getDeviceAt(i).getName());
for (var i = 0; i < names.length; i++) { LW.removeDevice(names[i]); log("removed " + names[i]); }
// 2. devices
for (var i = 0; i < DEVICES.length; i++) {
  var d = DEVICES[i], auto = LW.addDevice(d[1], d[2], d[3], d[4]), o = dev(auto);
  o.setName(d[0]);
  try { if (typeof o.skipBoot === "function") o.skipBoot(); } catch (e) {}
  log("device " + d[0] + " (" + d[2] + ") <- " + auto);
}
// 3. cables
var ok = 0;
for (var i = 0; i < LINKS.length; i++) {
  var L = LINKS[i], r = LW.createLink(L[1], L[2], L[3], L[4], L[5]);
  if (r) ok++;
  log("link " + L[0] + " " + L[1] + " " + L[2] + " <-> " + L[3] + " " + L[4] + " => " + r);
}
log("links created " + ok + "/" + LINKS.length);
// 4. hosts
for (var i = 0; i < HOSTS.length; i++) {
  var h = HOSTS[i], o = dev(h[0]), p = o.getPort("FastEthernet0");
  try { o.setDhcpFlag(false); } catch (e) {}
  p.setIpSubnetMask(h[1], h[2]);
  try { o.setDefaultGateway(h[3]); } catch (e) { p.setDefaultGateway(h[3]); }
  log("host " + h[0] + " " + h[1] + " gw " + h[3]);
}
log("BUILD COMPLETE devices=" + NET.getDeviceCount() + " links=" + NET.getLinkCount());
flushLog("automation/logs/build_topology.log");
