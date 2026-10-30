eval(SFM.getFileContents(BASE + "automation/caps.js"));
// DR failure: shut the DR's LAN port
STEP_TAG = "02_dr_fail"; STEP = [["R4","conf",["interface GigabitEthernet0/0","shutdown"]]]; runFromDisk("automation/step.js");
