eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "33_drills_b_restored"; CAP = [].concat(each("show ip ospf neighbor"), [["R1","show ip route ospf"],["R6","show ip ospf"],["R1","show ip ospf interface GigabitEthernet0/2"]]); runFromDisk("automation/capture.js");
