eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "17_summary_both"; CONSOLE = []; CAP = [["R1","show ip route ospf"],["R1","show ip ospf database summary"],["R5","show ip route 10.1.0.0 255.255.0.0"],["R8","show ip route"]]; runFromDisk("automation/capture.js");
STEP_TAG = "18_auth_one_side"; STEP = [["R2","conf",["interface GigabitEthernet0/1","ip ospf authentication message-digest","ip ospf message-digest-key 1 md5 OspfLab1"]]]; runFromDisk("automation/step.js");
