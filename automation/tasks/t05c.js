eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "05b_prio_zero"; CONSOLE = ["R2","R4"]; CAP = [].concat(each("show ip ospf neighbor", ["R1","R2","R3","R4"]), [["R1","show ip ospf interface GigabitEthernet0/0"],["R4","show ip ospf interface GigabitEthernet0/0"]]); runFromDisk("automation/capture.js");
