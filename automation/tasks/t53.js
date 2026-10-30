eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var R = (typeof PING_ROUND !== "undefined") ? PING_ROUND : [];
for (var i = 0; i < R.length; i++) getCL(dev(R[i][0])).enterCommand(R[i][1]);
