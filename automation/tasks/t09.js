eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "09_cost_restore_lo3"; CONSOLE = []; CAP = [["R1","show ip ospf interface brief"],["R1","show ip route ospf"],["R5","show ip ospf interface Loopback3"],["R5","show ip ospf interface Loopback1"],["R5","show ip ospf interface Loopback0"],["R6","show ip ospf database"],["R6","show ip route"]]; runFromDisk("automation/capture.js");
STEP_TAG = "10_stub_mismatch"; STEP = [["R3","conf",["router ospf 1","area 2 stub"]]]; runFromDisk("automation/step.js");
