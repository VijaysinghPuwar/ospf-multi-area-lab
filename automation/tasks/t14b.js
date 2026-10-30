eval(SFM.getFileContents(BASE + "automation/caps.js"));
STEP_TAG = "14b_area3_normal"; STEP_NAME = "revert_nssa";
STEP = [["R4","conf",["router ospf 1","no area 3 nssa"]],["R7","conf",["router ospf 1","no area 3 nssa"]],["R4","exec",["show running-config | section router ospf 1","clear ip ospf process"]],["R7","exec",["show running-config | section router ospf 1","clear ip ospf process"]]];
runFromDisk("automation/step.js");
