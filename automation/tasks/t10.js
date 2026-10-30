eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "10_stub_mismatch"; CONSOLE = ["R3","R6"]; CAP = [["R3","show ip ospf neighbor"],["R6","show ip ospf neighbor"],["R3","show ip ospf"]]; runFromDisk("automation/capture.js");
STEP_TAG = "11_area2_stub"; STEP = [["R6","conf",["router ospf 1","area 2 stub"]]]; runFromDisk("automation/step.js");
