eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "11b_area2_stub_clean"; CONSOLE = []; CAP = [["R6","show ip ospf neighbor"],["R6","show ip ospf database"],["R6","show ip route"],["R3","show ip ospf"],["R3","show ip ospf database summary 0.0.0.0"]]; runFromDisk("automation/capture.js");
STEP_TAG = "12_area2_totally_stubby"; STEP_NAME = "no_summary_and_clear";
STEP = [["R3","conf",["router ospf 1","area 2 stub no-summary"]],["R3","exec",["clear ip ospf process"]],["R6","exec",["clear ip ospf process"]]];
runFromDisk("automation/step.js");
