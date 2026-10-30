eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "42_partner_check"; CAP = [["R5","show ip route 172.16.0.0"],["R5","show ip route ospf"],["R7","show ip route"],["PARTNER","show ip interface brief"],["PARTNER","show ip route"],["R4","show ip route 172.16.0.0"]]; runFromDisk("automation/capture.js");
getCL(dev("PC-A")).enterCommand("ping 172.16.0.1");
getCL(dev("R7")).enterCommand("ping 172.16.0.1");
