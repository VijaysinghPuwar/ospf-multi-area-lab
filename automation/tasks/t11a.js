eval(SFM.getFileContents(BASE + "automation/caps.js"));
STEP_TAG = "11b_area2_stub_clean"; STEP_NAME = "revert_to_stub_and_clear";
STEP = [["R3","conf",["router ospf 1","no area 2 stub no-summary"]],["R3","exec",["show running-config | section router ospf","clear ip ospf process"]],["R6","exec",["clear ip ospf process"]]];
runFromDisk("automation/step.js");
