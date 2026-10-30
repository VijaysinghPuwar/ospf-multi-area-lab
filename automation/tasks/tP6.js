eval(SFM.getFileContents(BASE + "automation/caps.js"));
CAP_TAG = "42_partner_check"; CONSOLE = ["PC-A","R7"]; CAP = []; runFromDisk("automation/capture.js");
getCL(dev("PC-A")).enterCommand("tracert 172.16.0.1");
