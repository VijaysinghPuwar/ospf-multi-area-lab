eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var P = [["PC-A","ping 172.16.0.1"],["PC-B","ping 203.0.113.1"],["PC-B","ping 10.4.1.1"],["PC-A","ping 10.2.10.10"]];
for (var i = 0; i < P.length; i++) getCL(dev(P[i][0])).enterCommand(P[i][1]);
SFM.writePlainTextToFile(BASE + "evidence/50_final/PINGS_FIRED.txt", JSON.stringify(P) + "\n");
