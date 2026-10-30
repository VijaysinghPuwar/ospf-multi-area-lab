// Run show commands and save each output to evidence/<CAP_TAG>/<device>__<command>.txt
// CAP_TAG: folder name. CAP: [[device, command], ...]. CONSOLE: devices whose full console buffer is saved too.
eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var tag = CAP_TAG, list = CAP, cons = (typeof CONSOLE !== "undefined") ? CONSOLE : [];
var stamp = new Date().toISOString();
var done = {}, index = ["capture " + tag + " at " + stamp];
function slug(s) { return s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, ""); }
for (var i = 0; i < cons.length; i++) {
  var d = dev(cons[i]);
  writeFile("evidence/" + tag + "/" + cons[i] + "__console.txt", "# " + cons[i] + " console buffer at " + stamp + "\n" + snapshot(d));
}
for (var i = 0; i < list.length; i++) {
  var name = list[i][0], cmd = list[i][1], d = dev(name);
  if (!d) { index.push("MISSING " + name); continue; }
  if (!done[name]) { ensurePriv(d); run(d, "terminal length 0"); done[name] = 1; }
  var out = run(d, cmd);
  var pr = String(prompt(d));
  if (pr.indexOf("[no]") >= 0 || pr.indexOf("[confirm]") >= 0) { rawSend(d, pr.indexOf("[no]") >= 0 ? "yes" : ""); out += "\n" + snapshot(d).slice(-300); }
  var f = "evidence/" + tag + "/" + name + "__" + slug(cmd) + ".txt";
  writeFile(f, "# " + name + "# " + cmd + "   (captured " + stamp + ")\n" + out);
  index.push(f + "  (" + out.length + " chars)");
}
writeFile("evidence/" + tag + "/INDEX.txt", index.join("\n") + "\n");
log(index.join("\n"));
flushLog("automation/logs/capture_" + tag + ".log");
CONSOLE = [];
