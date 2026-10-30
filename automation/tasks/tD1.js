eval(SFM.getFileContents(BASE + "automation/caps.js"));
// Drill batch A: D1 hello mismatch (R3-R6), D2 area mismatch (R5-R8), D3 MTU mismatch (R1-R2 direct), D4 subnet mask mismatch (R4 on LAN)
STEP_TAG = "30_drills_a"; STEP_NAME = "inject";
STEP = [["R6","conf",["interface GigabitEthernet0/0","ip ospf hello-interval 5"]],
        ["R8","conf",["router ospf 1","no network 10.4.0.0 0.0.255.255 area 4","network 10.4.0.0 0.0.255.255 area 40"]],
        ["R2","conf",["interface GigabitEthernet0/2","ip mtu 1400","shutdown","no shutdown"]],
        ["R4","conf",["interface GigabitEthernet0/0","ip address 10.0.0.4 255.255.255.128"]]];
runFromDisk("automation/step.js");
