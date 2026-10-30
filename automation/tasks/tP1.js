eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var rec = [];
function fire(name, cmd) { var d = dev(name); var cl = getCL(d); if (!cl) { rec.push(name + ": no terminal"); return; } if (name.indexOf("PC") < 0) ensurePriv(d); cl.enterCommand(cmd); rec.push(name + " <- " + cmd); }
fire("PC-B", "ping 10.1.10.10");
fire("PC-A", "tracert 10.2.10.10");
fire("R6", "ping 10.4.1.1");
fire("R8", "ping 203.0.113.1");
fire("R6", "traceroute 10.4.1.1");
fire("R7", "ping 203.0.113.1");
fire("R5", "ping 172.16.0.1 source 10.1.10.1");
SFM.writePlainTextToFile(BASE + "evidence/40_end_to_end/FIRED.txt", rec.join("\n") + "\n");
