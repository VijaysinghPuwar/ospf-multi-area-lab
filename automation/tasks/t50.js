eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "50_final";
CAP = [].concat(each("show ip ospf neighbor"), each("show ip route ospf"), each("show ip ospf interface brief"),
  [["R1","show ip ospf database"],["R2","show ip ospf database"],["R6","show ip ospf database"],["R8","show ip route"],["R6","show ip route"],["R7","show ip route"],
   ["R1","show ip ospf database asbr-summary"],["R1","show ip ospf database external"],["R1","show ip ospf"],["R2","show ip ospf"],["R1","show ip protocols"],
   ["R2","show ip ospf interface GigabitEthernet0/1"],["R1","show ip ospf interface GigabitEthernet0/0"],["R1","show ipv6 ospf neighbor"],["R1","show ipv6 route ospf"],["R5","show ipv6 route ospf"]]);
runFromDisk("automation/capture.js");
var P = [["PC-A","ping 172.16.0.1"],["PC-B","ping 203.0.113.1"],["PC-B","ping 10.4.1.1"],["PC-A","ping 10.2.10.10"]];
for (var i = 0; i < P.length; i++) getCL(dev(P[i][0])).enterCommand(P[i][1]);
