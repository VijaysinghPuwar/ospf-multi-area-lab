eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "15b_external_check"; CAP = [["R1","show ip ospf database external"],["R1","show ip ospf database asbr-summary"],["R1","show ip ospf border-routers"],["R7","show ip ospf database"],["R7","show ip ospf"],["R4","show ip ospf border-routers"],["R1","show ip route ospf"]]; runFromDisk("automation/capture.js");
