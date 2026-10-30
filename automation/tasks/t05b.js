eval(SFM.getFileContents(BASE + "automation/caps.js"));
STEP_TAG = "05b_prio_zero"; STEP = [["R3","conf",["interface GigabitEthernet0/0","ip ospf priority 0"]],["R4","conf",["interface GigabitEthernet0/0","ip ospf priority 0"]]]; runFromDisk("automation/step.js");
