eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "16_virtual_link"; CONSOLE = ["R5"]; CAP = [["R2","show ip ospf virtual-links"],["R5","show ip ospf virtual-links"],["R5","show ip ospf neighbor"],["R2","show ip ospf neighbor"],["R8","show ip route"],["R1","show ip route ospf"],["R1","show ip ospf database summary"],["R5","show ip ospf"],["R1","show ip ospf border-routers"]]; runFromDisk("automation/capture.js");
STEP_TAG = "17_summary_both"; STEP = [["R5","conf",["router ospf 1","area 1 range 10.1.0.0 255.255.0.0"]]]; runFromDisk("automation/step.js");
