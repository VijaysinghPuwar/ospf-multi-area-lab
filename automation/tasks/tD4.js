eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "32_drills_b"; CONSOLE = ["R1","R2","R3","R4","R6","R7"];
CAP = [].concat(each("show ip ospf neighbor", ["R1","R2","R3","R4","R6","R7"]),
  [["R4","show ip protocols"],["R4","show ip ospf interface GigabitEthernet0/1"],["R6","show ip ospf"],["R1","show ip ospf interface GigabitEthernet0/2"],["R2","show ip ospf interface GigabitEthernet0/2"],["R1","show ip route ospf"],["R2","show ip route ospf"],["R7","show ip route"]]);
runFromDisk("automation/capture.js");
STEP_TAG = "33_drills_b_restored"; STEP_NAME = "restore";
STEP = [["R4","conf",["router ospf 1","no passive-interface GigabitEthernet0/1"]],
        ["R6","conf",["router ospf 1","router-id 6.6.6.6"]],["R6","exec",["clear ip ospf process"]],
        ["R1","conf",["interface GigabitEthernet0/2","ip ospf network point-to-point"]]];
runFromDisk("automation/step.js");
