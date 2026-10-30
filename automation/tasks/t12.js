eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "12_area2_totally_stubby"; CONSOLE = []; CAP = [["R6","show ip ospf neighbor"],["R6","show ip ospf database"],["R6","show ip route"],["R3","show running-config | section router ospf"]]; runFromDisk("automation/capture.js");
STEP_TAG = "13_area3_nssa"; STEP = [["R4","conf",["router ospf 1","area 3 nssa"]],["R7","conf",["router ospf 1","area 3 nssa"]],["R4","exec",["clear ip ospf process"]],["R7","exec",["clear ip ospf process"]]]; runFromDisk("automation/step.js");
