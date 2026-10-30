eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "15_summary_r2"; CONSOLE = []; CAP = [["R1","show ip route ospf"],["R1","show ip ospf database summary"],["R2","show ip route 10.1.0.0 255.255.0.0"],["R2","show ip route"],["R6","show ip route"]]; runFromDisk("automation/capture.js");
STEP_TAG = "16_virtual_link"; STEP = [["R2","conf",["router ospf 1","area 1 virtual-link 5.5.5.5"]],["R5","conf",["router ospf 1","area 1 virtual-link 2.2.2.2"]]]; runFromDisk("automation/step.js");
