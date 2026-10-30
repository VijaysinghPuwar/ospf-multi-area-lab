eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "13_area3_nssa"; CONSOLE = ["R7"]; CAP = [["R7","show ip ospf neighbor"],["R7","show ip ospf database"],["R7","show ip route"],["R4","show ip ospf database"],["R4","show ip ospf"],["R1","show ip ospf database external"],["R1","show ip route ospf"],["R4","show ip route ospf"]]; runFromDisk("automation/capture.js");
STEP_TAG = "14_area3_totally_nssa"; STEP = [["R4","conf",["router ospf 1","area 3 nssa no-summary"]],["R4","exec",["clear ip ospf process"]],["R7","exec",["clear ip ospf process"]]]; runFromDisk("automation/step.js");
