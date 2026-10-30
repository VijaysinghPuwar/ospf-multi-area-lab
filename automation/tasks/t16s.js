eval(SFM.getFileContents(BASE + "automation/caps.js"));
STEP_TAG = "16_virtual_link"; STEP = [["R2","conf",["router ospf 1","area 1 virtual-link 5.5.5.5"]],["R5","conf",["router ospf 1","area 1 virtual-link 2.2.2.2"]]]; runFromDisk("automation/step.js");
