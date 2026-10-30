eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "14_area3_totally_nssa"; CONSOLE = []; CAP = [["R7","show ip ospf neighbor"],["R7","show ip ospf database"],["R7","show ip route"],["R1","show ip route ospf"]]; runFromDisk("automation/capture.js");
STEP_TAG = "15_summary_r2"; STEP = [["R2","conf",["router ospf 1","area 1 range 10.1.0.0 255.255.0.0"]]]; runFromDisk("automation/step.js");
