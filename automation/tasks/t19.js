eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "19_auth_both"; CONSOLE = ["R5"]; CAP = [["R2","show ip ospf neighbor"],["R2","show ip ospf interface GigabitEthernet0/1"],["R2","show ip ospf virtual-links"],["R8","show ip route"],["R1","show ip route ospf"]]; runFromDisk("automation/capture.js");
