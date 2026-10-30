eval(SFM.getFileContents(BASE + "automation/lib.js"));
log("hello from OSPF lab runner");
log("devices=" + NET.getDeviceCount() + " links=" + NET.getLinkCount());
for (var i = 0; i < NET.getDeviceCount(); i++) { var d = NET.getDeviceAt(i); log(" - " + d.getName() + " model=" + d.getModel() + " type=" + d.getType()); }
flushLog("automation/logs/hello.log");
