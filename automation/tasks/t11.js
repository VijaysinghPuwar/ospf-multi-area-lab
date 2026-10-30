eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "11_area2_stub"; CONSOLE = ["R6"]; CAP = [["R6","show ip ospf neighbor"],["R6","show ip ospf database"],["R6","show ip route"],["R6","show ip ospf database summary 0.0.0.0"],["R3","show ip ospf"]]; runFromDisk("automation/capture.js");
STEP_TAG = "12_area2_totally_stubby"; STEP = [["R3","conf",["router ospf 1","area 2 stub no-summary"]]]; runFromDisk("automation/step.js");
