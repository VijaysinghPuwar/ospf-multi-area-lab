// Apply a scenario change. STEP_TAG: evidence folder. STEP: [[device, "conf"|"exec", [lines...]], ...]
eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var stamp = new Date().toISOString(), rec = ["# step " + STEP_TAG + " applied " + stamp], bad = 0;
for (var i = 0; i < STEP.length; i++) {
  var name = STEP[i][0], mode = STEP[i][1], lines = STEP[i][2], d = dev(name);
  ensurePriv(d);
  if (mode === "conf") run(d, "configure terminal");
  for (var j = 0; j < lines.length; j++) {
    var out = run(d, lines[j]);
    var pr = String(prompt(d));
    if (pr.indexOf("[no]") >= 0 || pr.indexOf("[confirm]") >= 0) { rawSend(d, pr.indexOf("[no]") >= 0 ? "yes" : ""); out += " <confirmed>"; }
    if (/% ?Invalid|% ?Incomplete|% ?Ambiguous|% ?Unrecognized|not supported|% ?Unknown|not enabled/i.test(out)) { bad++; rec.push("!! REJECTED"); }
    rec.push(name + (mode === "conf" ? "(config)" : "") + "# " + lines[j] + (out.replace(/\s+/g, "") ? "\n   " + out.replace(/\n/g, "\n   ").substring(0, 600) : ""));
  }
  if (mode === "conf") run(d, "end");
}
rec.push("rejected=" + bad);
writeFile("evidence/" + STEP_TAG + "/STEP_" + (typeof STEP_NAME !== "undefined" ? STEP_NAME : "apply") + ".txt", rec.join("\n") + "\n");
log(rec.join("\n"));
flushLog("automation/logs/step_" + STEP_TAG + ".log");
STEP_NAME = undefined;
