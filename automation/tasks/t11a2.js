eval(SFM.getFileContents(BASE + "automation/caps.js"));
STEP_TAG = "11b_area2_stub_clean"; STEP_NAME = "readd_stub_and_clear";
STEP = [["R3","conf",["router ospf 1","area 2 stub"]],["R3","exec",["show running-config | section router ospf 1","clear ip ospf process"]],["R6","exec",["clear ip ospf process"]]];
runFromDisk("automation/step.js");
