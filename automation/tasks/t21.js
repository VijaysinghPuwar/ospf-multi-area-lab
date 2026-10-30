eval(SFM.getFileContents(BASE + "automation/caps.js"));
eval(SFM.getFileContents(BASE + "automation/lib.js"));
var inv = []; for (var i = 0; i < NET.getDeviceCount(); i++) { var d = NET.getDeviceAt(i); inv.push(d.getName() + " | model " + d.getModel() + " | type " + d.getType()); }
SFM.writePlainTextToFile(BASE + "evidence/21_stage2_fresh/INVENTORY.txt", inv.join("\n") + "\n");
CAP_TAG = "21_stage2_fresh";
CAP = [].concat(each("show ip ospf neighbor"), each("show ip route ospf"), each("show ip ospf interface brief"),
  [["R1","show ip ospf database"],["R2","show ip ospf database"],["R6","show ip ospf database"],["R7","show ip ospf database"],["R1","show ip ospf database asbr-summary"],["R1","show ip ospf database external"],
   ["R6","show ip route"],["R8","show ip route"],["R2","show ip route"],["R1","show ip ospf interface GigabitEthernet0/0"],["R1","show ipv6 ospf neighbor"],["R1","show ipv6 route ospf"]]);
runFromDisk("automation/capture.js");
