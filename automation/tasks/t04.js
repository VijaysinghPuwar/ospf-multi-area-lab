eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "03_dr_return"; CONSOLE = ["R4"]; CAP = [].concat(each("show ip ospf neighbor", ["R1","R2","R3","R4"]), [["R4","show ip ospf interface GigabitEthernet0/0"]]); runFromDisk("automation/capture.js");
STEP_TAG = "04_prio_set"; STEP = [["R1","conf",["interface GigabitEthernet0/0","ip ospf priority 100"]],["R2","conf",["interface GigabitEthernet0/0","ip ospf priority 50"]]]; runFromDisk("automation/step.js");
CAP_TAG = "04_prio_set"; CONSOLE = []; CAP = [].concat(each("show ip ospf neighbor", ["R1","R3"]), [["R1","show ip ospf interface GigabitEthernet0/0"]]); runFromDisk("automation/capture.js");
STEP_TAG = "05_prio_clear"; STEP = [["R1","exec",["clear ip ospf process"]],["R2","exec",["clear ip ospf process"]],["R3","exec",["clear ip ospf process"]],["R4","exec",["clear ip ospf process"]]]; runFromDisk("automation/step.js");
