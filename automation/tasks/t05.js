eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "05_prio_clear"; CONSOLE = ["R1","R2","R3","R4"]; CAP = [].concat(each("show ip ospf neighbor", ["R1","R2","R3","R4"]), [["R1","show ip ospf interface GigabitEthernet0/0"],["R3","show ip ospf interface GigabitEthernet0/0"],["R1","show ip ospf database"]]); runFromDisk("automation/capture.js");
