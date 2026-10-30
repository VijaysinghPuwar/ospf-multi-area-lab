eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "31_drills_a_restored"; CAP = each("show ip ospf neighbor", ["R1","R2","R3","R4","R5","R6","R8"]); runFromDisk("automation/capture.js");
// Drill batch B: D5 passive interface (R4-R7), D6 duplicate router ID (R6 uses 3.3.3.3), D7 network type mismatch (R1 Gi0/2 broadcast vs R2 p2p)
STEP_TAG = "32_drills_b"; STEP_NAME = "inject";
STEP = [["R4","conf",["router ospf 1","passive-interface GigabitEthernet0/1"]],
        ["R6","conf",["router ospf 1","router-id 3.3.3.3"]],["R6","exec",["clear ip ospf process"]],
        ["R1","conf",["interface GigabitEthernet0/2","no ip ospf network point-to-point"]]];
runFromDisk("automation/step.js");
