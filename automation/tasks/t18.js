eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "18_auth_one_side"; CONSOLE = ["R2","R5"]; CAP = [["R2","show ip ospf neighbor"],["R5","show ip ospf neighbor"],["R2","show ip ospf interface GigabitEthernet0/1"],["R2","show ip ospf virtual-links"],["R8","show ip route"]]; runFromDisk("automation/capture.js");
STEP_TAG = "19_auth_both"; STEP = [["R5","conf",["interface GigabitEthernet0/0","ip ospf authentication message-digest","ip ospf message-digest-key 1 md5 OspfLab1"]]]; runFromDisk("automation/step.js");
