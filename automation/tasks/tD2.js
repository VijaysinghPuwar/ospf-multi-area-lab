eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "30_drills_a"; CONSOLE = ["R1","R2","R3","R4","R5","R6","R8"];
CAP = [].concat(each("show ip ospf neighbor", ["R1","R2","R3","R4","R5","R6","R8"]),
  [["R3","show ip ospf interface GigabitEthernet0/1"],["R6","show ip ospf interface GigabitEthernet0/0"],["R8","show ip ospf interface GigabitEthernet0/0"],["R5","show ip ospf interface GigabitEthernet0/1"],
   ["R2","show interfaces GigabitEthernet0/2"],["R1","show interfaces GigabitEthernet0/2"],["R4","show ip ospf interface GigabitEthernet0/0"],["R1","show ip ospf interface GigabitEthernet0/0"],["R8","show ip route"]]);
runFromDisk("automation/capture.js");
STEP_TAG = "31_drills_a_restored"; STEP_NAME = "restore";
STEP = [["R6","conf",["interface GigabitEthernet0/0","no ip ospf hello-interval","no ip ospf dead-interval"]],
        ["R8","conf",["router ospf 1","no network 10.4.0.0 0.0.255.255 area 40","network 10.4.0.0 0.0.255.255 area 4"]],
        ["R2","conf",["interface GigabitEthernet0/2","no ip mtu","shutdown","no shutdown"]],
        ["R4","conf",["interface GigabitEthernet0/0","ip address 10.0.0.4 255.255.255.0"]]];
runFromDisk("automation/step.js");
