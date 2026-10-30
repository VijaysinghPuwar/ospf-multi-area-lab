eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "02_dr_fail"; CONSOLE = ["R1","R2","R3"]; CAP = [].concat(each("show ip ospf neighbor", ["R1","R2","R3"]), [["R1","show ip ospf interface GigabitEthernet0/0"],["R1","show ip ospf database network"]]); runFromDisk("automation/capture.js");
STEP_TAG = "03_dr_return"; STEP = [["R4","conf",["interface GigabitEthernet0/0","no shutdown"]]]; runFromDisk("automation/step.js");
